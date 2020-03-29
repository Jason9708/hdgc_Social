// 😀 存放 Api 接口文件

/**
 * about User
 * @userRegister 注册接口
 *      registerInfo 注册表单数据
 * @userLogin 登录接口
 *      loginInfo 登录表单数据
 * @getUserInfo
 *      通过token匹配用户信息
 * @updateUserInfo
 *      userInfo 修改用户数据
 */
import Axios from './http.js'

export function userRegister(registerInfo) {
    return Axios({
        url: '/hdgc/users/register',
        data: registerInfo,
        method: 'post',
    })
}
export function userLogin(loginInfo) {
    return Axios({
        url: '/hdgc/users/login',
        data: loginInfo,
        method: 'post',
    })
}
export function getUserInfo() {
    return Axios({
        url: '/hdgc/users/',
        method: 'get'
    })
}
export function updateUserInfo(userInfo) {
    return Axios({
        url: '/hdgc/users/',
        data: userInfo,
        method: 'post',
    })
}

export function getPersonInfo(userId) {
    return Axios({
        url: `/hdgc/users/${userId}`,
        method: 'get'
    })
}


/**
 * about Article
 * @writeArticle 写文章接口
 *      articleInfo 文章表单数据
 * @editorUpload 写文章上传图片接口
 * @getAllArticleList 获取全部文章列表接口
 * @getArticleListById 获取某人文章列表接口
 *       通过创建人id
 * @getArticleListByIdAndType 获取某人某类型文章列表接口
 *       通过创建人id + 文章分类type
 * @getArticleDetail 获取文章详情接口
 *      通过文章id
 * @deletArticle
 *      通过文章id
 * @updateArticle
 *      修改文章
 */
export function writeArticle(articleInfo) {
    return Axios({
        url: '/hdgc/article',
        data: articleInfo,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

export function editorUpload(formdata) {
    return Axios({
        url: '/hdgc/article/markdownPic',
        data: formdata,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

export function getAllArticleList() {
    return Axios({
        url: `/hdgc/article/`,
        method: 'get'
    })
}

export function getHotArticleList() {
    return Axios({
        url: `/hdgc/article/getHotArticle`,
        method: 'get'
    })
}

export function getArticleListById(id) {
    return Axios({
        url: `/hdgc/article/${id}`,
        method: 'get'
    })
}

export function getArticleListByIdAndType(id, type) {
    return Axios({
        url: `/hdgc/article/getArticleListByIdAndType/${id}/${type}`,
        method: 'get'
    })
}

export function getArticleDetail(id) {
    return Axios({
        url: `/hdgc/article/articleInfo/${id}`,
        method: 'get'
    })
}

export function deletArticleById(id) {
    return Axios({
        url: `/hdgc/article/${id}`,
        method: 'delete'
    })
}


/**
 * about follow
 * @getUserFollowInfo 获取某用户关注信息
 *      id 用户id
 * @followPerson 关注某人
 *      data：noticerId-关注人的Id | followId-被关注人的Id
 * @unfollowPerson 取消关注某人
 *      data：id-操作人id | followId-被取消关注人的Id 
 * @getFollow 获取某人关注列表
 *      id 用户id
 */

export function getUserFollowInfo(id) {
    return Axios({
        url: `/hdgc/follow/${id}`,
        method: 'get'
    })
}

export function followPerson(data) {
    return Axios({
        url: '/hdgc/follow/follow',
        data: data,
        method: 'post'
    })
}

export function unfollowPerson(data) {
    return Axios({
        url: '/hdgc/follow/unfollow',
        data: data,
        method: 'post'
    })
}

export function getFollow(id) {
    return Axios({
        url: `/hdgc/follow/follow/${id}`,
        method: 'get'
    })
}

export function getNoticer(id) {
    return Axios({
        url: `/hdgc/follow/noticer/${id}`,
        method: 'get'
    })
}


/**
 * about comment
 * @getCommentList 获取某文章评论列表
 *      id 文章id
 * @sendMainComment 为某文章发布主评论
 * @sendSonComment 为某主评论添加子评论
 */

export function getCommentList(id) {
    return Axios({
        url: `/hdgc/comment/${id}`,
        method: 'get'
    })
}

export function sendMainComment(data) {
    return Axios({
        url: '/hdgc/comment/',
        data: data,
        method: 'post'
    })
}

export function sendSonComment(id, data) {
    return Axios({
        url: `/hdgc/comment/comment/${id}`,
        data: data,
        method: 'post'
    })
}


/**
 * about like
 * @postLike 为某文章添加点赞
 *      id 文章id
 * @deleteLike 为某文章取消点赞
 *      id 文章id
 * @getUserLike 获取用户点赞文章
 */

export function postLike(data) {
    return Axios({
        url: '/hdgc/like/',
        data: data,
        method: 'post'
    })
}

export function deleteLike(data) {
    return Axios({
        url: 'hdgc/like/unlike',
        data: data,
        method: 'post'
    })
}

export function getUserLike(id) {
    return Axios({
        url: `hdgc/like/userlike/${id}`,
        method: 'get'
    })
}

/**
 * about search
 * @searchData
 *      关键字搜索用户 / 文章
 */
export function searchData(data) {
    return Axios({
        url: '/hdgc/search/',
        data: data,
        method: 'post'
    })
}

/**
 * about dynamic
 * @postDynamic 用户发布动态
 * @getDynamic 获取所有动态
 * @deleteDynamic 删除动态
 */
export function postDynamic(data) {
    return Axios({
        url: '/hdgc/dynamic',
        data: data,
        method: 'post'
    })
}

export function getDynamic() {
    return Axios({
        url: '/hdgc/dynamic',
        method: 'get'
    })
}

export function deleteDynamic(id) {
    return Axios({
        url: `/hdgc/dynamic/${id}`,
        method: 'delete'
    })
}

/**
 * about dynamicComment
 * @getDynamicComment 根据id获取动态评论列表
 * @sendDynamicMainComment 为某动态添加主评论
 * @sendDynamicSonComment 为某动态添加子自评论
 */
export function getDynamicComment(id) {
    return Axios({
        url: `/hdgc/dynamicComment/${id}`,
        method: 'get'
    })
}

export function sendDynamicMainComment(data) {
    return Axios({
        url: '/hdgc/dynamicComment/',
        data: data,
        method: 'post'
    })
}

export function sendDynamicSonComment(id, data) {
    return Axios({
        url: `/hdgc/dynamicComment/comment/${id}`,
        data: data,
        method: 'post'
    })
}

/**
 * about dynamicLike
 * @postDynamicLike 为某动态添加点赞
 *      id 动态id
 * @deleteDyanamicLike 为某动态取消点赞
 *      id 动态id
 * @getUserDynamicLike 获取用户点赞动态
 */
export function postDynamicLike(data) {
    return Axios({
        url: '/hdgc/dynamicLike/',
        data: data,
        method: 'post'
    })
}

export function deleteDyanamicLike(data) {
    return Axios({
        url: 'hdgc/dynamicLike/unlike',
        data: data,
        method: 'post'
    })
}

export function getUserDynamicLike(id) {
    return Axios({
        url: `hdgc/dynamicLike/userlike/${id}`,
        method: 'get'
    })
}

/**
 * about notice
 * @getUserNotice 获取当前用户通知列表
 */
export function getUserNotice() {
    return Axios({
        url: `hdgc/notice`,
        method: 'get'
    })
}