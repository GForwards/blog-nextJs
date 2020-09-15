import  { useState, useEffect } from 'react';
import Router from 'next/router';
// import Link from 'next/link';
import { getTypes } from '@/api/type';
import '@/styles/header.scss';

import { Row, Col, Menu } from 'antd';
import { BankOutlined, BookOutlined, EuroOutlined } from '@ant-design/icons';
const Header = () => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let data = await getTypes();
      setNavArray(data);
    };
    fetchData();
  });

  const handleClick = (e) => {
    if (e.key === 0) {
      Router.push('/');
    } else {
      Router.push(`/list?id=${e.key}`);
    }
  }; 

  const dealIcon = (type) => {
    switch (type) {
      case 'learn':
        return <BankOutlined />;
      case 'video':
        return <BookOutlined />;
      case 'life':
        return <EuroOutlined />;
    }
  };
  return (
    <div className='header'>
      <Row justify='center'>
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className='header-logo'>简单的博客</span>
          <span className='header-txt'>刚开始做博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode='horizontal' onClick={handleClick}>
            <Menu.Item key='0'>
              <BankOutlined />
              首页
            </Menu.Item>

            {
              navArray.map(item => {
                return (
                  <Menu.Item key={item.orderNum}>
                    {dealIcon(item.icon)}
                    {item.typeName}
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;