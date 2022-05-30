import React, {useState} from 'react'
import Head from 'next/head'
import {Row, Col, Breadcrumb, Affix} from 'antd'

import {CalendarOutlined, VideoCameraAddOutlined, FireFilled, VideoCameraOutlined} from '@ant-design/icons';
import Navigator from '../components/Navigator'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from "axios";

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from "../components/tocify.tsx";
import servicePath from "../config/apiUrl";

const Detailed = (props) => {
    const tocify = new Tocify();
    const renderer = new marked.Renderer();

    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

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

    // mysql::blog::article.content
    const src = props.content;
    let html = marked(src);

    return (
        <div>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Navigator/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">
                                React实战视频教程-技术胖Blog开发(更新08集)
                            </div>

                            <div className="list-icon center">
                                <span><CalendarOutlined/></span>
                                <span><VideoCameraOutlined/></span>
                                <span><FireFilled/> </span>
                            </div>

                            <div className="detailed-content"  dangerouslySetInnerHTML={{__html:html}}>

                            </div>
                        </div>
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}
//
// Detailed.getInitialProps = async(context)=>{
//     let date=new Date();
//     let month=date.getMonth();
//     let day=date.getDate();
//
//     let  hour=date.getHours();
//     let minute=date.getMinutes();
//     let second=date.getSeconds();
//     let time=month+'/'+day+'/'+hour+':'+minute+':'+second
//
//     console.log('----->'+time+':Visit the details page,parameter='+context.query.id)
//     //把ID强制转换成数字
//     let id =parseInt(context.query.id)
//
//     const promise = new Promise((resolve)=>{
//         if(id){
//             axios(servicePath.getArticleById + id).then(
//                 (res)=>{
//                     // console.log(title)
//                     if(res.data.data=='id错误'){
//                         console.log('ERROR.......')
//                         resolve({content:'id ERROR'})
//                     }else{
//                         resolve(res.data.data[0])
//                     }
//
//                 }
//             )
//         }else{
//             console.log('error......')
//             resolve({content:'Id Error'})
//
//         }
//     })
//     return await promise
// }


export default Detailed
