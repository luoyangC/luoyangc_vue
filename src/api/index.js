import axios from 'axios'


// let host = 'http://47.98.207.4:8080'
let local_host = 'http://127.0.0.1:8000/api'

// 获取最新文章
export const getNewArticle = () => { return axios.get(`${local_host}/article/`) }

// 获取分类列表
export const getAllCategory = () => { return axios.get(`${local_host}/category/`) }

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
