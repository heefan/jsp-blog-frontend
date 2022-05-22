import React, { useState } from 'react'
import { Row, Col, List, Spin, Breadcrumb } from 'antd'
import { CalendarOutlined,  RightCircleOutlined, FireFilled, VideoCameraOutlined} from '@ant-design/icons';
import Head from 'next/head'
import 'antd/dist/antd.css'
import '../static/style/pages/index.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer';
import Advert from '../components/Advert'
import axios from "axios";
import Link from 'next/link'
import servicePath from "../config/apiUrl";

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import './i18n';
import { useTranslation, Trans, Translation } from 'react-i18next'


const Home = (list) => {
    // localization
    const { t } = useTranslation();

    //
    const [ articleList ] = useState(list.data);
    const [ loading, setLoading ] = useState(false)

    // markdown
    const renderer = new marked.Renderer();

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    const goLoading = ()=>{
        setLoading(true)
    }

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={18} >
                    <List
                        // header={<div>New Post</div>}
                        itemLayout = "vertical"
                        dataSource = { articleList }

                        /*
                         * @ article: from database
                         */
                        renderItem = { article => (
                            <List.Item>
                                <Spin spinning={ loading } >
                                    <div className="list-title" onClick={goLoading}>
                                        <Link href={{pathname: '/detailed', query: {id: article.id}}}>
                                            <a>{article.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><CalendarOutlined/>{article.lastUpdated}</span>
                                        <span><VideoCameraOutlined/>{article.typeName}</span>
                                        <span><FireFilled />{article.viewCount} </span>
                                    </div>
                                    <div className="list-context"
                                         dangerouslySetInnerHTML={{__html: marked(article.brief)}}>
                                    </div>

                                    <div className="list-go">
                                        <RightCircleOutlined /> &nbsp;
                                        <span  onClick={goLoading} >
                                        <Link href={{pathname:'/detailed',query:{id: article.id}}} >
                                            <a>{t('go_to_details')}</a>
                                        </Link>
                                    </span>
                                    </div>
                                </Spin>
                            </List.Item>
                        )}
                    />
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    {/*<Advert />*/}
                </Col>
            </Row>

            <Footer/>
        </div>
    )
}

// Service Call
// getArticleList: read article table from backend database
Home.getInitialProps = async () => {
    const promise = new Promise((resolve)=> {
        axios(servicePath.getArticleList)
            .then((res) => {
                // console.log('response: ', res.data.data)
                resolve(res.data)
            })
    });
    return await promise;
}
export default Home;