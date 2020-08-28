import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, message, Select, Upload, Icon, DatePicker } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
const { Option } = Select;
const { TextArea } = Input;

import moment from "moment";

// 引入上传方法
import UploadFileServices from '@/services/uploadFileServices';

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    category: state.QuestionManagement.category,
    editShow: state.QuestionManagement.editShow,
    editType: state.QuestionManagement.editType,
    editId: state.QuestionManagement.editId,
    editForm: state.QuestionManagement.editForm,
    count: state.QuestionManagement.count,
    handlePerson: state.QuestionManagement.handlePerson,
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

const EditQuestion: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const _uploadFileServices = new UploadFileServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {category, editShow, editType, handlePerson, count, editId, editForm} = useMappedState(mapState);
  
  // 保存upload初始值
  const [initialFile, setInitialFile] = useState<any[]>([]);

  useEffect(() => {
    
    // 获取问题处理人员
    _ITSMSystemServices.getQuestionHandleUser((res: any) => {
      dispatch({
        type: "get questionManagement handlePerson",
        handlePerson: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  }, [dispatch]);

  useEffect(() => {
    if (editType == 'edit') {
      _ITSMSystemServices.getQuestionMsg(editId, (res: any) => {
        dispatch({
          type: "get questionManagement editForm",
          editForm: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });
    }
  }, [editType]);

  useEffect(() => {
    if (editForm.file) {
      const fileName = editForm.file.split('/');

      // 定义upload组件初始值
      setInitialFile(
        [{
          'uid': editForm.id,
          'name': fileName[2].substring(13),
          'url': `/meetingcloud/remote.php/webdav/${editForm.file}`,
          'response': editForm.file,
          'status': 'done'
        }]
      );
    }
    if(!editForm.file) {

      // 置空
      setInitialFile([]);
    }
  }, [editForm]);

  const onClose = () => {
    dispatch({
      type: "change questionManagement editShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
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

  // 封装重新获取问题详情，发送给detailMsg，让问题详情页面刷新
  const getQuestionMsg = (id: any) => {
    _ITSMSystemServices.getQuestionMsg(id, (res: any) => {
      dispatch({
        type: "get questionManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  };

  // 提交表单
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      if (!err) {
        const data = {
          name: vals.name,
          categoryId: vals.categoryId,
          principal: vals.principal,
          level: vals.level,
          expectTime: moment(vals.expectTime).format("YYYY-MM-DD"),
          source: vals.source,
          desc: vals.desc,
          file: vals.file && vals.file[0] ? vals.file[0].response : ''
        };
        if (editType == 'add') {
          _ITSMSystemServices.addQuestion(data, (res: any) => {
            success("新建问题成功");
            dispatch({
              type: "get questionManagement list",
              count: count + 1
            });
            onClose();
          }, (res: any) => {
            warning(res.message);
          });
        }

        if (editType == 'edit') {
          _ITSMSystemServices.editQuestion(editId, data, (res: any) => {
            success("编辑问题成功");
            dispatch({
              type: "get questionManagement list",
              count: 0
            });
            onClose();

            // 重新获取问题详情，发送给detailMsg，让问题详情页面刷新
            getQuestionMsg(editId);
          }, (res: any) => {
            warning(res.message);
          });
        }
      }
    });
  };

  return (
    <Drawer
      title={editType == "edit" ? "编辑问题" : "新建问题"}
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={editShow}
      width={500}
    >
    <Form {...formItemLayout}>
      <Form.Item label="问题名称">
        {getFieldDecorator(`name`, {
          initialValue: editForm && editForm.name,
          rules: [
        { 
          required: true,
          message: '请输入问题名称' 
        },
        { 
          max: 50,
          message: '最多输入50个字符' 
        }],
        })(<Input style={{width: 250}} placeholder="请输入问题名称" />)}
      </Form.Item>
      <Form.Item label="问题分类">
        {getFieldDecorator(`categoryId`, {
          initialValue: editForm && editForm.category_id,
          rules: [
        { 
          required: true,
          message: '请选择问题分类' 
        }],
        })(
          <Select style={{ width: 250}} placeholder="请选择问题分类">
            {
              category.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>;
              })
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="问题来源">
        {getFieldDecorator(`source`, {
          initialValue: editForm && editForm.source || '',
        })(
        <Input style={{width: 250}} placeholder="请输入问题来源" />)}
      </Form.Item>
      <Form.Item label="问题描述">
        {getFieldDecorator(`desc`, {
          initialValue: editForm && editForm.desc || '',
        })(
        <TextArea style={{width: 250}} rows={4} placeholder="请输入问题描述"/>)}
      </Form.Item>
      <Form.Item label="相关文件" extra="支持扩展名：.rar .zip .excel.docx .ppt.pdf .jpg...">
          {getFieldDecorator('file', {
            initialValue: initialFile,
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload name="image" customRequest={(e: any) => {
                _uploadFileServices.uploadFile({
                    fileName: e.file.name,
                    type: e.file.type,
                    data: e.file
                }, (res: any) => {
                    e.onSuccess(res);
                }, (err: any) => {
                    e.onError(err);
                }, e.onProgress);
            }} listType="picture">
                <Button>
                  <Icon type="upload"/> 上传文件
                </Button>
            </Upload>
          )}
      </Form.Item>
      <Form.Item label="问题评审人">
        {getFieldDecorator(`principal`, {
          initialValue: editForm && editForm.principal,
          rules: [
        { 
          required: true,
          message: '请选择问题评审人' 
        }],
        })(
          <Select style={{ width: 250}} placeholder="请选择问题评审人">
            {
              handlePerson.map((item: any) => {
                return <Option key={item.uid} value={item.uid}>{item.displayname}</Option>;
              })
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="紧急程度">
        {getFieldDecorator(`level`, {
          initialValue: editForm && editForm.level,
          rules: [
        { 
          required: true,
          message: '请选择紧急程度' 
        }],
        })(
          <Select style={{ width: 250}} placeholder="请选择紧急程度">
            <Option value={1}>紧急</Option>
            <Option value={2}>高</Option>
            <Option value={3}>中等</Option>
            <Option value={4}>低</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="期望评审日期">
        {getFieldDecorator(`expectTime`, {
          initialValue: editForm && editForm.expect_time && moment(editForm.expect_time, 'YYYY-MM-DD'),
          rules: [
        { 
          required: true,
          message: '请选择期望评审日期' 
        }],
        })(
          <DatePicker placeholder="请选择期望评审日期"/>
        )}
      </Form.Item>
    </Form>
    <div
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'center',
      }}
    >
      <Button onClick={onSubmit} type="primary" style={{ marginRight: 12 }} >
        确定
      </Button>
      <Button onClick={onClose} type="primary" style={{backgroundColor: "rgba(113,126,132,1)", borderColor: "rgba(113,126,132,1)"}} >
        取消
      </Button>
    </div>
  </Drawer>
  );
};

// 使表单组件具有props.form
const EditQuestionForm = Form.create({ name: 'EditQuestion' })(EditQuestion);

export {
  EditQuestionForm
};