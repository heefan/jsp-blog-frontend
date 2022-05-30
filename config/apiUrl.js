const ipUrl = 'http://127.0.0.1:7001/'

/*!
 * @brief: bolg server calls
 */
let servicePath = {
    getArticleList: ipUrl + 'article/list',
    getCategoryList: ipUrl + 'category/list'
    // getArticleById: ipUrl + 'article/:id',
    // getListById: ipUrl + 'article/:id',
}

export default servicePath;
