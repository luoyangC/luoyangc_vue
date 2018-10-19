import axios from 'axios'


let local_host = 'http://47.98.207.4:8000/api'
// let local_host = 'http://127.0.0.1:8000/api'

// 获取文章列表
export const getArticle = (params) => { return axios.get(`${local_host}/article/`, {params:params}) }

// 获取分类列表
export const getCategory = () => { return axios.get(`${local_host}/category/`) }

// 获取文章归档
export const getArchives = () => { return axios.get(`${local_host}/archive/`) }

// 获取文章详情
export const getArticleContent = (articleId) => { return axios.get(`${local_host}/article/${articleId}`+'/') }

// 获取评论数据
export const getCommentList = (params) => { return axios.get(`${local_host}/comment/`, {params:params}) }

// 获取验证码
export const getEmailCode = (data) => { return axios.post(`${local_host}/code/`, data) }

// 注册
export const register = (data) => { return axios.post(`${local_host}/user/`, data) }

// 用户登录
export const login = (data) => { return axios.post(`${local_host}/login/`, data) }

// 添加评论
export const addComment = (data) => { return axios.post(`${local_host}/comment/`, data)}

// 删除评论
export const deleteComment = (commentId) => { return axios.delete(`${local_host}/comment/${commentId}`+'/') }

// 添加回复
export const addReply = (data) => { return axios.post(`${local_host}/reply/`, data) }

// 删除回复
export const deleteReply = (replyId) => { return axios.delete(`${local_host}/reply/${replyId}`+'/') }

// 添加收藏
export const addFavArticle = (data) => { return axios.post(`${local_host}/fav/`, data) }

// 取消收藏
export const deleteFavArticle = (ArticleId) => { return axios.delete(`${local_host}/fav/${ArticleId}`+'/') }

// 点赞
export const addLike = (data) => { return axios.post(`${local_host}/like/`, data) }

// 取消点赞
export const deleteLike = (LikeId) => { return axios.delete(`${local_host}/like/${LikeId}`+'/') }

// 获取留言
export const getMessage = () => { return axios.get(`${local_host}/message/`) }

// 添加留言
export const addMessage = (data) => { return axios.post(`${local_host}/message/`, data) }

// 获取动态
export const getDynamics = () => { return axios.get(`${local_host}/dynamics/`) }

// 获取当前用户信息
export const getUserInfo = () => { return axios.get(`${local_host}/user/`) }

// 更新当前用户信息
export const updateUserInfo = (userId, data) => { return axios.patch(`${local_host}/user/${userId}` + '/', data) }

// 获取指定用户信息
export const getUserInfoById = (userId) => { return axios.get(`${local_host}/user/${userId}` + '/') }

// 上传文件
export const uploadFile = (data) => { return axios.post(`${local_host}/upload/`, data, {headers:{ 'Content-Type': 'multipart/form-data' }}) }

// 添加分类
export const addCategory = (data) => { return axios.post(`${local_host}/category/`, data) }

// 添加文章
export const addArticle = (data) => { return axios.post(`${local_host}/article/`, data) }

// 编辑文章
export const editorArticle = (articleId, data) => { return axios.patch(`${local_host}/article/${articleId}/`, data) }

// 获取所有标签
export const getTags = () => { return axios.get(`${local_host}/tag/`) }

// 获取文章简介列表
export const getArticleProfile = () => { return axios.get(`${local_host}/profile/`) }
