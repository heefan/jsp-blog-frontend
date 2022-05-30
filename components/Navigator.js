import React, {useState, useEffect} from 'react';
import '../static/style/components/header.css';
import {Row, Col, Menu} from 'antd';
import { ToolOutlined, FieldBinaryOutlined, HomeOutlined, MehOutlined, CalculatorOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import '../pages/i18n'
import { useTranslation, Trans, Translation } from 'react-i18next'

const Navigator = ()=> {
    const { t } = useTranslation();
    const [navArray , setNavArray] = useState([])

    const request = async () => {
        try {
            const response = await axios.get(servicePath.getCategoryList);
            setNavArray(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const handleClick = (e) => {
        if(e.key == 0) {
            // Router.push('/');
        } else {
            // Router.push('/list?id=' + e.key);
        }
     }

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
                        <Menu.Item key='0' onClick={ handleClick }>
                            <HomeOutlined/>
                            {t('nav_homepage')}
                        </Menu.Item>
                        <Menu.Item key='1' onClick={handleClick}>
                            <FieldBinaryOutlined />
                            {/*I don't know how to confirm the string (item.icon) to <...>*/}
                            {t('nav_computer_science')}
                        </Menu.Item>
                        <Menu.Item key='2' onClick={handleClick}>
                            <CalculatorOutlined />
                            {t('nav_projects')}
                        </Menu.Item>
                        <Menu.Item key='3' onClick={handleClick}>
                            <ToolOutlined />
                            {t('nav_toolbox')}
                        </Menu.Item>
                        <Menu.Item key='4' onClick={handleClick}>
                            <MehOutlined />
                            {t('nav_happy_life')}
                        </Menu.Item>
                        {/*{*/}
                        {/*    navArray.map((item) => {*/}
                        {/*        return (*/}
                        {/*            <Menu.Item key={item.id}  onClick={handleClick} >*/}
                        {/*                <dynamicicon type={item.icon} aria-label={item.icon}*/}
                        {/*                {item.typeName}*/}
                        {/*            </Menu.Item>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </Menu>
                </Col>
            </Row>
            </div>
        </div>
    );
}
export default Navigator;
