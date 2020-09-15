import { Avatar, Divider } from 'antd'
import {QqOutlined, WechatOutlined, GithubOutlined} from '@ant-design/icons'
import '@/styles/components/author.scss'
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="https://bkimg.cdn.bcebos.com/pic/71cf3bc79f3df8dce92732c8cf11728b47102854?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5" />
      </div>
      <div className="author-introduction">
      光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
        <Divider>社交账号</Divider>        
        <Avatar size={28} icon={<QqOutlined />} className="account" />
        <Avatar size={28} icon={<WechatOutlined />} className="account" />
        <Avatar size={28} icon={<GithubOutlined />} className="account" />
      </div>
    </div>
  );
}

export default Author;