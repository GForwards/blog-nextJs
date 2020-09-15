import Head from 'next/head';
import Link from 'next/link';
import  { useState } from 'react';
import Header from '@/components/Header';
import Author from '@/components/Author';
import Advert from '@/components/Advert';
import Footer from '@/components/Footer';
import { Row, Col, List } from 'antd';
import { ClockCircleOutlined, VideoCameraAddOutlined, FieldNumberOutlined } from '@ant-design/icons';
import { getArticleList } from '@/api/article';
const Home = ({ list }) => {
  const [myList] = useState(list);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head> 
      <Header />
      <Row className='comm-main' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            itemLayout='vertical'
            size='large'
            dataSource={myList}
            renderItem={item => (
              <List.Item
                key={item.title}
              >
                <div className='list-title'>
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a> {item.title}</a>
                  </Link>
                </div>
                <div className='list-icon'>
                  <span>
                    <ClockCircleOutlined />
                    {item.addTime}
                  </span>
                  <span>
                    <VideoCameraAddOutlined />
                    {item.typeName}
                  </span>
                  <span>
                    <FieldNumberOutlined />
                    {item.viewCount}人
                  </span>
                </div>
                <div className='list-context'>{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={5}>
          <Author />
          <Advert />
        </Col>
      </Row>

      < Footer />
    </>
  );
};

Home.getInitialProps = async () => {
  const data = await getArticleList();
  return {
    list: data
  };
};

export default Home;