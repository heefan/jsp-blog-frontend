const ipUrl = 'http://127.0.0.1:7001/default/'

/*!
 * @brief: bolg server calls
 */
let servicePath = {
    getArticleList: ipUrl + 'getArticleList',
    getArticleById: ipUrl + 'getArticleById/',
    getCategory: ipUrl + 'getCategory',
    getListById: ipUrl + 'getListById/',
}


export default servicePath;