const { errors: { serverError } } = require('../../constants/index')
const banOrUnbanUser = require('../services/admin/user/banOrUnbanUser')
const deleteBannedUser = require('../services/admin/user/deleteBannedUser')
const deleteUserReport = require('../services/admin/user/deleteUserReport')
const getReportedUsers = require('../services/admin/user/getReportedUsers')
const getBannedUsers = require(`../services/admin/user/getBannedUsers`)

const banOrUnbanPost = require(`../services/admin/post/banOrUnbanPost`)
const deleteBannedPosts = require(`../services/admin/post/deleteBannedPost`)
const deletePostReport = require(`../services/admin/post/deletePostReport`)
const getReportedPosts = require(`../services/admin/post/getReportedPosts`)
const getBannedPosts = require(`../services/admin/post/getBannedPosts`)

const banOrUnbanStorie = require(`../services/admin/storie/banOrUnbanStorie`)
const deleteBannedStorie = require(`../services/admin/storie/deleteBannedStorie`)
const deleteStorieReport = require(`../services/admin/storie/deleteStorieReport`)
const getReportedStories= require(`../services/admin/storie/getReportedStories`)
const getBannedStories = require(`../services/admin/storie/getBannedStories`)

// ========== USERS ==========
const banOrUnbanUserController = async(req, res)=>{
    try {
        const { code, message, user } = banOrUnbanUser({
            ...req.params,
            message: req.body.message || '',
            loggedUser: req.user
        })

        return res.status(code).json({ message, user })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const deleteBannedUserController = async(req, res)=>{
    try{
        const { code, message, ban_info, user } = await deleteBannedUser({
            ...req.params,
            message: req.body.message || ``,
            loggedUser: req.user
        })
        
        return res.status(code).json({ message, ban_info, user })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const deleteUserReportController = async(req, res)=>{
    try{
        const { code, message, user } = await deleteUserReport({...req.params})

        return res.status(code).json({ message, user })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const getReportedUsersController = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const maxPageSize = req.query.maxPageSize ? ( Number(req.query.maxPageSize) <= 100 ? Number(req.query.maxPageSize) : 100) : 1

    try{
        const { code, response } = await getReportedUsers({
            page,
            maxPageSize
        })

        return res.status(code).json(response)
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const getBannedUsersController = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const maxPageSize = req.query.pageSize ? ( Number(req.query.pageSize) <= 100 ? Number(req.query.pageSize) : 100) : 1

    try{

        const { code, response } = await getBannedUsers({
            page,
            maxPageSize,
            loggedUser: req.user
        })

        return res.status(code).json(response)
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

// =========== POSTS ==========
const banOrUnbanPostController = async(req, res)=>{
    try {
        const { code, message, post } = await banOrUnbanPost({
            ...req.params,
            reason: req.body.reason || '',
            loggedUser: req.user
        })

        return res.status(code).json({
            message,
            post
        })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const deleteBannedPostController = async(req, res)=>{
    try{
        const { code, message, post } = deleteBannedPosts({
            ...req.params,
            message: req.body.message || '',
            loggedUser: req.user
        })

        return res.status(code).json({ message, post })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const deletePostReportController = async(req, res)=>{
    try{
        const { code, message } = await deletePostReport({...req.params})

        return res.status(code).json({ message })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const getReportedPostsController = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const maxPageSize = req.query.maxPageSize ? ( Number(req.query.maxPageSize) <= 100 ? Number(req.query.maxPageSize) : 100) : 1

    try{
        const { response, code } = await getReportedPosts({
            page,
            maxPageSize
        })

        return res.status(code).json(response)
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const getBannedPostsController = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const maxPageSize = req.query.maxPageSize ? ( Number(req.query.maxPageSize) <= 100 ? Number(req.query.maxPageSize) : 100) : 1

    try{
        const { response, code } = await getBannedPosts({
            loggedUser: req.user,
            page,
            maxPageSize
        })

        return res.status(code).json(response)
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

// =========== STORIES ==========
const banOrUnbanStorieController = async(req, res)=>{
    try {
        const { code, message } = await banOrUnbanStorie({
            ...req.params,
            reason: req.body.reason || '',
            loggedUser: req.user
        })

        return res.status(code).json({ message })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const deleteBannedStorieController = async(req, res)=>{
    try{
        const { code, message, post } = deleteBannedStorie({
            ...req.params,
            message: req.body.message || '',
            loggedUser: req.user
        })

        return res.status(code).json({ message, post })
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const deleteStorieReportController = async(req, res)=>{
    try{
        const { code, message } = await deleteStorieReport({...req.params})

        return res.status(code).json({ message })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const getReportedStoriesController = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const maxPageSize = req.query.maxPageSize ? ( Number(req.query.maxPageSize) <= 100 ? Number(req.query.maxPageSize) : 100) : 1

    try{
        const { response, code } = await getReportedStories({
            page,
            maxPageSize
        })

        return res.status(code).json(response)
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

const getBannedStoriesController = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const maxPageSize = req.query.maxPageSize ? ( Number(req.query.maxPageSize) <= 100 ? Number(req.query.maxPageSize) : 100) : 1

    try{
        const { response, code } = await getBannedStories({
            loggedUser: req.user,
            page,
            maxPageSize
        })

        return res.status(code).json(response)
    } catch (error) {
        return res.status(500).json({ message: serverError(error.toString()) })
    }
}

module.exports = {
    getReportedUsers: getReportedUsersController,
    getBannedUsers: getBannedUsersController,
    banOrUnbanUser: banOrUnbanUserController,
    deleteBannedUser: deleteBannedUserController,
    deleteUserReport: deleteUserReportController,

    getReportedPosts: getReportedPostsController,
    getBannedPosts: getBannedPostsController,
    banOrUnbanPost: banOrUnbanPostController,
    deleteBannedPost: deleteBannedPostController,
    deletePostReport: deletePostReportController,

    banOrUnbanStorie: banOrUnbanStorieController,
    deleteBannedStorie: deleteBannedStorieController,
    deleteStorieReport: deleteStorieReportController,
    getReportedStories: getReportedStoriesController,
    getBannedStories: getBannedStoriesController
}