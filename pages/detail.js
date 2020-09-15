// import React, { useState } from 'react';
import Head from 'next/head'; 
import { Row, Col, Breadcrumb, Affix } from 'antd';
import { ClockCircleOutlined, VideoCameraAddOutlined, FieldNumberOutlined } from '@ant-design/icons';

import Header from '@/components/Header';
import Author from '@/components/Author';
import Advert from '@/components/Advert';
import Footer from '@/components/Footer';
import '@/styles/pages/detail.scss';
import 'markdown-navbar/dist/navbar.css';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '@/components/tocify.tsx';
import {getArticleDetail} from '@/api/article';
// eslint-disable-next-line react/prop-types
const Detail = ({ detail }) => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = (text, level) => {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer,
    highlight (code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  // eslint-disable-next-line react/prop-types
  let htmlDom = marked(detail.content);

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className='detailed-title'>
                React实战视频教程-技术胖Blog开发(更新08集)
              </div>

              <div className='list-icon center'>
                <span>
                  <ClockCircleOutlined />
                  2020-09-10
                </span>
                <span>
                  <VideoCameraAddOutlined />
                  视频教程
                </span>
                <span>
                  <FieldNumberOutlined />
                  5840人
                </span>
              </div>

              <div className='detailed-content' dangerouslySetInnerHTML={{__html: htmlDom}}>
              </div>

            </div>

          </div>
        </Col>

        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix>
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              <div className='toc'>{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  );
};

Detail.getInitialProps = async (ctx) => {
  let { query } = ctx;
  console.log(query);
  const data = await getArticleDetail(query.id);
  return {
    detail: data
  };
};
export default Detail;