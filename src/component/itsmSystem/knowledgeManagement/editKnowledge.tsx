import React, { useEffect, useState } from 'react';
import { Form, Button, Input, message, Upload, Icon } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
const { TextArea } = Input;

// 引入富文本编辑器
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListOperateNoForm, ShowListTitle} from "@/baseUI/BaseShowList";

import {BraftEditorWrapper} from "./ui";

// 引入上传方法
import UploadFileServices from '@/services/uploadFileServices';

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    editType: state.KnowledgeManagement.editType,
    editId: state.KnowledgeManagement.editId,
    editForm: state.KnowledgeManagement.editForm,
    categoryId: state.KnowledgeManagement.categoryId,
  };
};

import {ITSMSystemServices} from "@/services/itsmSystemServices";

// 定义请求失败提示
const warning = (msg: string) => {
  message.warning(msg);
};

// 定义请求成功提示
const success = (msg: string) => {
  message.success(msg);
};

const EditKnowledge: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const _uploadFileServices = new UploadFileServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {editType, editId, editForm, categoryId} = useMappedState(mapState);
  
  // 保存相关文件upload初始值
  const [initialFile, setInitialFile] = useState<any[]>([]);
  
  // 保存富文本编辑器值
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

  useEffect(() => {
    if (editType == 'edit') {
      _ITSMSystemServices.getKnowMsg(editId, (res: any) => {
        dispatch({
          type: "get knowledgeManagement editForm",
          editForm: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });
    }
  }, [editType]);

  useEffect(() => {
    if (editForm.file) {
      const newFile = editForm.file.split('/')[4];
      
      // 定义upload组件初始值
      setInitialFile(
        [{
          'uid': editForm.id,
          'name': newFile && newFile.substring(13),
          'url': editForm.file,
          'response': editForm.file,
          'status': 'done'
        }]
      );
    }
    if(!editForm.file) {

      // 置空
      setInitialFile([]);
    }

    if (editForm.info) {

      // 异步设置富文本编辑器内容
      setTimeout(() => {
        setEditorState(BraftEditor.createEditorState(editForm.info));
      }, 0);
    }
  }, [editForm]);

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  // 表单获取上传文件时
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }

    // 如果又上传了文件，顶掉前面的文件，限制上传一个
    e.fileList = e.fileList.slice(-1);
    return e && e.fileList;
  };

  // 提交表单
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      if (!err) {

        // 知识详情不能为空
        if (editorState.isEmpty()) return warning('知识详情不能为空');

        const data = {
          name: vals.name,
          categoryId: categoryId,
          desc: vals.desc,
          file: vals.file && vals.file[0] ? vals.file[0].response.data.filePath : '',
          info: editorState.toHTML(),
        };
        if (editType == 'add') {
          _ITSMSystemServices.addKnowledge(data, (res: any) => {
            success("新建知识成功");

            // 跳转回上一页
            props.history.push('/itsm/knowledge/list');
          }, (res: any) => {
            warning(res.message);
          });
        }

        if (editType == 'edit') {
          _ITSMSystemServices.editKnowledge(editId, data, (res: any) => {
            success("更新知识成功");

            // 跳转回上一页
            props.history.push('/itsm/knowledge/list');
          }, (res: any) => {
            warning(res.message);
          });
        }
      }
    });
  };

  // 配置富文本框功能
  const controls: any = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator'];
  
  // 自定义上传事件
  const uploadChange = (e: any) => {

    // 使用formdata获取图片地址
    const formdata = new FormData();
    formdata.append('key', `itsm${new Date().getTime()}`);
    formdata.append('image', e.file);
    _uploadFileServices.uploadImage({
        data: formdata
    }, (res: any) => {
        e.onSuccess(res.data.url);

        // 将返回的图片地址插入富文本编辑器中
        setEditorState(ContentUtils.insertMedias(editorState, [{
          type: 'IMAGE',
          url: res.data.url
        }]));
    }, (err: any) => {
        e.onError(err);
    });
  };

  // 使用antd的upload组件替代富文本编辑器的上传组件
  const extendControls: any[] = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={uploadChange}
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            <Icon type="picture" theme="filled" />
          </button>
        </Upload>
      )
    }
  ];

  // 同步富文本编辑器的值
  const changeEditorState = (vals: any) => {
    setEditorState(BraftEditor.createEditorState(vals));
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>{editType == 'add' ? "新增知识" : "更新知识"}</ShowListTitle>
        <ShowListOperateNoForm>
          <Button type='primary' style={{margin: "0px 8px 0 8px", backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={onSubmit}>确定</Button>
          <Button type='primary' style={{margin: "0px 8px 0 8px"}} href="#/itsm/knowledge/list/" >返回</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      <Form style={{marginTop: 20}} {...formItemLayout}>
        <Form.Item label="知识名称">
          {getFieldDecorator(`name`, {
            initialValue: editForm && editForm.name,
            rules: [
          { 
            required: true,
            message: '请输入知识名称' 
          },
          { 
            max: 50,
            message: '最多输入50个字符' 
          }],
          })(<Input placeholder="请输入知识名称" />)}
        </Form.Item>
        <Form.Item label="知识简介">
          {getFieldDecorator(`desc`, {
            initialValue: editForm && editForm.desc || '',
          })(
          <TextArea rows={4} placeholder="请输入知识简介"/>)}
        </Form.Item>
        <Form.Item label="相关文件" extra="支持扩展名：.rar .zip .excel.docx .ppt.pdf .jpg...">
            {getFieldDecorator('file', {
              initialValue: initialFile,
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            })(
              <Upload name="image" customRequest={(e: any) => {
                  const file = new FormData();
                  file.set('file', e.file);
                  _ITSMSystemServices.uploadKnowlFile(file, (res: any) => {
                    e.onSuccess(res);
                  }, (res: any) => {
                    e.onError(res);
                  });
              }} listType="picture">
                  <Button>
                    <Icon type="upload"/> 上传文件
                  </Button>
              </Upload>
            )}
        </Form.Item>
        <Form.Item label="知识详情">
          <BraftEditorWrapper>
            <BraftEditor
              value={editorState}
              onChange={changeEditorState}
              style={{border: '1px solid rgba(218, 225, 228, 1)'}}
              className="my-editor"
              controls={controls}
              placeholder="请输入知识详情"
              extendControls={extendControls}
            />
          </BraftEditorWrapper>
        </Form.Item>
      </Form>
    </ShowListWrapper>
  );
};

// 使表单组件具有props.form
const EditKnowledgeForm = Form.create({ name: 'EditKnowledge' })(EditKnowledge);

export {
  EditKnowledgeForm
};