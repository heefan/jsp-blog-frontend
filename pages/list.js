
import React,{useState, useEffect} from 'react';
import Head from 'next/head';
import {Row, Col , List ,Breadcrumb  } from 'antd';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import {
    CalendarOutlined,
    VideoCameraAddOutlined,
    FireFilled,
    VideoCameraOutlined,
    RightCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import servicePath from "../config/apiUrl";
import Link from 'next/link';
import marked from "marked";
import hljs from "highlight.js";
import {useTranslation} from "react-i18next";


const ArticleList = (list) =>{
    const [ ArticleList , setArticleList ] = useState(list.data);
    const { t } = useTranslation();

    useEffect(()=> {
        setArticleList(list.data);
    })

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    })
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={18} >
                    <div>
                        {/*<div className="bread-div">*/}
                        {/*    <Breadcrumb>*/}
                        {/*        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>*/}
                        {/*        <Breadcrumb.Item>视频列表</Breadcrumb.Item>*/}
                        {/*    </Breadcrumb>*/}
                        {/*</div>*/}

                        <List itemLayout="vertical"  dataSource={ArticleList}  renderItem={ article => (
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{pathname: '/detailed', query: {id: article.id}}}>
                                        <a>{article.title}</a>
                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span><CalendarOutlined/>{article.lastUpdated}</span>
                                    <span><VideoCameraOutlined/>{article.typeName}</span>
                                    <span><FireFilled />{article.viewCount} </span>
                                </div>
                                <div className="list-context" dangerouslySetInnerHTML={{__html: marked(article.brief)}}></div>

                                <div className="list-go">
                                    <RightCircleOutlined /> &nbsp;
                                    {/*<span  onClick={goLoading}  onClick={goLoading}>*/}
                                    <span>
                                        <Link href={{pathname:'/detailed',query:{id: article.id}}} >
                                            <a>{t('go_to_details')}</a>
                                        </Link>
                                    </span>
                                </div>
                            </List.Item>
                        )}
                        />

                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    {/*<Advert />*/}
                </Col>
            </Row>
            <Footer/>

        </div>
    )
}


ArticleList.getInitialProps = async (context) => {
    let id = context.query.id;
    const promise = new Promise((resolve)=> {
        axios(servicePath.getListById + id)
            .then((res) => {
                resolve(res.data)
            })
    });
    return await promise;
}


export default ArticleList
