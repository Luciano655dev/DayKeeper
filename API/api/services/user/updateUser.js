const User = require('../../models/User')
const { notFound } = require('../../../constants')
const bcrypt = require("bcrypt")
const { sendVerificationEmail } = require('../../utils/emailHandler')

const updateUser = async(params) => {
    const {
        name,
        email,
        password,
        bio,
        private,
        file,
        loggedUserId
    } = params
  
    try{
      const user = await User.findById(loggedUserId)
      if(!user) return { code: 404, message: notFound('User') }
  
      // Check Email
      if(email && (user.email != email))
        sendVerificationEmail(name, email)
  
      // check and create password
      if(password){
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        password = passwordHash
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        loggedUserId,
        {
          $set: {
            name: name || user.name,
            email: email || user.email,
            password: password || user.password,
            bio: bio || user.bio || '',
            profile_picture: (
              file ?
              {
                name: file.originalname,
                key: file.key,
                url: file.location
              } : user.profile_picture
            ),
            follow_requests: ( private ? user?.follow_requests || [] : undefined ),
            verified_email: ( typeof email == 'undefined' ? user.verified_email : (user.email == email) ),
          },
        },
        { new: true }
      )
      if(!user) return { code: 404, message: notFound('User') }
  
      await updatedUser.save()
      return { code: 200, message: 'User updated successfully', user: updatedUser }
    } catch (error){
      throw new Error(error.message)
    }
}

module.exports = updateUser