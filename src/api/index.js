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
export const getCommentList = (params) => { return axios.get(`${local_host}/comment/`, { params: params }) }
