const User = require('../../models/User')
const getDataWithPages = require('../getDataWithPages')
const { searchPostPipeline, searchUserPipeline } = require('../../repositories')

const {
    errors: { notFound },
    success: { fetched }
} = require('../../../constants/index')

const search = async (props) => {
    const page = Number(props.page) || 1
    const maxPageSize = props.maxPageSize ? ( Number(props.maxPageSize) <= 100 ? Number(props.maxPageSize): 100)
    : 3

    const searchQuery = props.q || ''
    const order = props.order || 'relevant'
    const following = props.following
    const type = props.type || 'Post'

    const loggedUser = props.user

    try {
        loggedUser.following = await User.distinct('_id', { followers: loggedUser._id })

        const response = await getDataWithPages({
            type,
            pipeline: type == 'Post' ?
                searchPostPipeline(searchQuery, loggedUser) :
                searchUserPipeline(searchQuery, loggedUser),
            order,
            following,
            page,
            maxPageSize
        }, loggedUser)

        return fetched(`data`, { response })
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = search