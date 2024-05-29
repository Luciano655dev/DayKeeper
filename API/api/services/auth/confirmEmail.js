const User = require('../../models/User')
const {
    errors: { notFound, unauthorized, fieldNotFilledIn, invalidValue },
    success: { custom }
} = require("../../../constants")

const confirmEmail = async(props)=>{
    const { email, verificationCode } = props

    if(!verificationCode || !email)
        return fieldNotFilledIn('token')

    try{
        const user = await User.findOne({ email })

        if (!user)
            return notFound(`user`)
    
        if (user.verification_code !== verificationCode)
            return invalidValue(`Verification code`)

        if(user.verification_time < Date.now())
            return unauthorized(`confirm email`, `time expired`)

        user.verified_email = true
        user.verification_code = undefined
        user.verification_time = undefined
        await user.save()

        return custom(`${user.name}'s email confirmed successfully`)
    }catch(error){
        throw new Error(error.mesage)
    }
}

module.exports = confirmEmail