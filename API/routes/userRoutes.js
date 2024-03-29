const express = require('express')
const router = express.Router()
const {
    getUserByName,
    getUserPosts,
    updateUser,
    reseteProfilePicture,
    deleteUser,
    followUser,
    getFollowing,
    getFollowers,
    respondFollowRequest,
    removeFollower,
    blockUser,
    reportUser
} = require('../controllers/userController')

// Middlewares
const multer = require('multer')
const multerConfig = require('../config/multer')
const handleMulterError = require('../middlewares/handleMulterError')
const userEditValidation = require('../middlewares/validations/userEditValidation')
const checkTokenMW = require('../middlewares/checkTokenMW')
const checkBannedUserMW = require('../middlewares/checkBannedUserMW')

// Routes
router.get("/:name", checkTokenMW, checkBannedUserMW, getUserByName)
router.put("/update_user", checkTokenMW, multer(multerConfig).single('file'), handleMulterError, userEditValidation, updateUser)
router.put("/reset_profile_picture", checkTokenMW, reseteProfilePicture)
router.delete("/delete_user", checkTokenMW, deleteUser)

// Follows
router.get("/:name/followers", checkTokenMW, checkBannedUserMW, getFollowers)
router.get("/:name/following", checkTokenMW, checkBannedUserMW, getFollowing)
router.post("/:name/follow", checkTokenMW, checkBannedUserMW, followUser)
router.post("/:name/respond_follow", checkTokenMW, checkBannedUserMW, respondFollowRequest)
router.delete("/:name/remove_follow", checkTokenMW, checkBannedUserMW, removeFollower)

// Interactions
router.post("/:name/block", checkTokenMW, checkBannedUserMW, blockUser)
router.post("/:name/report", checkTokenMW, checkBannedUserMW, reportUser)

// posts
router.get("/:name/posts", checkTokenMW, checkBannedUserMW, getUserPosts)

module.exports = router