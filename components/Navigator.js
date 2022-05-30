import React, {useState, useEffect} from 'react';
import '../static/style/components/header.css';
import {Row, Col, Menu} from 'antd';
import { ToolOutlined, FieldBinaryOutlined, HomeOutlined, MehOutlined, CalculatorOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import '../pages/i18n'
import { useTranslation, Trans, Translation } from 'react-i18next'
import Router from "next/router";

const Navigator = ()=> {
    const { t } = useTranslation();
    const [navArray , setNavArray] = useState([])

    useEffect( () => {
        const sendRequest = async () => {
            try {
                const response = await axios.get(servicePath.getCategoryList);
                setNavArray(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        sendRequest();
    },[]);

    const handleClick = (e) => {
        if(e.key == 0) {
            Router.push('/');
        } else {
            Router.push('/list?id=' + e.key);
        }
     }

    // }
    return (
        <div className='header'>
            <div className='header-center'>
                <Row type='flex'>
                    <Col xs={24} sm={24} md={11}>
                        <spam className='header-logo'>HARDCORE</spam>
                        <spam className='header-txt'>{t('slogan')}</spam>
                </Col>
                <Col xs={0} sm={0} md={13}>
                    <Menu mode='horizontal'>
                        { navArray.map((item) => {
                            console.log(item)
                            return (
                                <Menu.Item key={item.id}  onClick={handleClick} >
                                    <HomeOutlined/>
                                    { item.name }
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Col>
            </Row>
            </div>
        </div>
    );
}
export default Navigator;
