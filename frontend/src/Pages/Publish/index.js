import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill-new'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/apis/article'
//   import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {

    const { channelList } = useChannel()

    // submit form
    const onFinish = (formValue) => {
        console.log(formValue)
        // // 校验封面类型imageType是否和实际的图片列表imageList数量是相等的
        // if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
        const { title, content, channel_id } = formValue
        // 1. process the form data in the format of the interface document
        const reqData = {
            title,
            content,
            cover: {
                // type: imageType, // cover mode: 0 - none; 1 - single; 2 - trible
                type: 0,
                images: []
                // // 这里的url处理逻辑只是在新增时候的逻辑
                // // 编辑的时候需要做处理
                // images: imageList.map(item => {
                //     if (item.response) {
                //         return item.response.data.url
                //     } else {
                //         return item.url
                //     }
                // }) // 图片列表
            },
            channel_id
        }
        // // 2. 调用接口提交
        // // 处理调用不同的接口 新增 - 新增接口  编辑状态 - 更新接口  id
        // if (articleId) {
        //     // 更新接口
        //     updateArticleAPI({ ...reqData, id: articleId })
        // } else {
        createArticleAPI(reqData)
        // }
    }

    // // 上传回调
    // const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log('loading...', value)
        //   setImageList(value.fileList)
    }

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log('changed cover', e.target.value)
        //   setImageType(e.target.value)
    }

    // // 回填数据
    // const [searchParams] = useSearchParams()
    // const articleId = searchParams.get('id')
    // // 获取实例
    // const [form] = Form.useForm()
    // useEffect(() => {
    //   // 1. 通过id获取数据
    //   async function getArticleDetail () {
    //     const res = await getArticleById(articleId)
    //     const data = res.data
    //     const { cover } = data
    //     form.setFieldsValue({
    //       ...data,
    //       type: cover.type
    //     })
    //     // 为什么现在的写法无法回填封面？
    //     // 数据结构的问题  set方法 -> { type: 3 }   { cover: { type: 3}}

    //     // 回填图片列表
    //     setImageType(cover.type)
    //     // 显示图片({url:url})
    //     setImageList(cover.images.map(url => {
    //       return { url }
    //     }))
    //   }
    //   // 只有有id的时候才能调用此函数回填
    //   if (articleId) {
    //     getArticleDetail()
    //   }
    //   // 2. 调用实例方法 完成回填
    // }, [articleId, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        //   { title: `${articleId ? '编辑' : '发布'}文章` },
                        { title: `article` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                // form={form}
                >
                    <Form.Item
                        label="title"
                        name="title"
                        rules={[{ required: true, message: 'please input article title' }]}
                    >
                        <Input placeholder="please input article title" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="channel"
                        name="channel_id"
                        rules={[{ required: true, message: 'choose a channel' }]}
                    >
                        <Select placeholder="please choose a channel" style={{ width: 400 }}>
                            {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
                            {/* the value property will be the submission automatically since user select */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="cover">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>single pic</Radio>
                                <Radio value={3}>trible pics</Radio>
                                <Radio value={0}>none pic</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 
                listType: 决定选择文件框的外观样式
                showUploadList: 控制显示上传列表
              */}
                        {/* {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={imageType}
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>} */}
                    </Form.Item>
                    <Form.Item
                        label="content"
                        name="content"
                        rules={[{ required: true, message: 'please input article content' }]}
                    >
                        {/* editor */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="please input article content"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                publish article
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish