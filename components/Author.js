import {Avatar, Divider} from 'antd'
import {GithubOutlined, WechatOutlined} from "@ant-design/icons";
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className='author-div comm-box' >
            <div><Avatar size={100}
                         src="https://avatars.githubusercontent.com/u/892641?s=400&u=07bf5905497234c657b1e0fb1da884bbac11fcc7&v=4"
                         />
            </div>
            <div className="author-introduction">
                JUST CODE IT!
           </div>
        </div>
    )
}

export default Author;