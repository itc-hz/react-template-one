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
    category: state.ChangeManagement.category,
    handlePerson: state.ChangeManagement.handlePerson,
    editShow: state.ChangeManagement.editShow,
    editType: state.ChangeManagement.editType,
    editId: state.ChangeManagement.editId,
    editForm: state.ChangeManagement.editForm,
    count: state.ChangeManagement.count,
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

const EditChange: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const _uploadFileServices = new UploadFileServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {category, editShow, editType, handlePerson, count, editId, editForm} = useMappedState(mapState);
  
  // 保存upload初始值
  const [initialFile, setInitialFile] = useState<any[]>([]);

  useEffect(() => {
    
    // 获取变更处理人员
    _ITSMSystemServices.getChangehandleUser((res: any) => {
      dispatch({
        type: "get changeManagement handlePerson",
        handlePerson: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  }, [dispatch]);

  useEffect(() => {
    if (editType == 'edit') {
      _ITSMSystemServices.getChangeMsg(editId, (res: any) => {
        dispatch({
          type: "get changeManagement editForm",
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
      type: "change changeManagement editShow"
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

  // 封装重新获取变更详情，发送给detailMsg，让变更详情页面刷新
  const getChangeMsg = (id: any) => {
    _ITSMSystemServices.getChangeMsg(id, (res: any) => {
      dispatch({
        type: "get changeManagement detailMsg",
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
          expectStartTime: moment(vals.expect_start_time).format("YYYY-MM-DD"),
          expectEndTime: moment(vals.expect_end_time).format("YYYY-MM-DD"),
          source: vals.source,
          desc: vals.desc,
          file: vals.file && vals.file[0] ? vals.file[0].response : ''
        };
        if (editType == 'add') {
          _ITSMSystemServices.addChange(data, (res: any) => {
            success("新建变更成功");
            dispatch({
              type: "get changeManagement list",
              count: count + 1
            });
            onClose();
          }, (res: any) => {
            warning(res.message);
          });
        }

        if (editType == 'edit') {
          _ITSMSystemServices.editChange(editId, data, (res: any) => {
            success("编辑变更成功");
            dispatch({
              type: "get changeManagement list",
              count: 0
            });
            onClose();

            // 重新获取变更详情，发送给detailMsg，让变更详情页面刷新
            getChangeMsg(editId);
          }, (res: any) => {
            warning(res.message);
          });
        }
      }
    });
  };

  return (
    <Drawer
      title={editType == "edit" ? "编辑变更" : "新增变更"}
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={editShow}
      width={500}
    >
    <Form {...formItemLayout}>
      <Form.Item label="变更名称">
        {getFieldDecorator(`name`, {
          initialValue: editForm && editForm.name,
          rules: [
        { 
          required: true,
          message: '请输入变更名称' 
        },
        { 
          max: 50,
          message: '最多输入50个字符' 
        }],
        })(<Input style={{width: 250}} placeholder="请输入变更名称" />)}
      </Form.Item>
      <Form.Item label="变更分类">
        {getFieldDecorator(`categoryId`, {
          initialValue: editForm && editForm.category_id,
          rules: [
        { 
          required: true,
          message: '请选择变更分类' 
        }],
        })(
          <Select style={{ width: 250}} placeholder="请选择变更分类">
            {
              category.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>;
              })
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="变更来源">
        {getFieldDecorator(`source`, {
          initialValue: editForm && editForm.source || '',
        })(
        <Input style={{width: 250}} placeholder="请输入变更来源" />)}
      </Form.Item>
      <Form.Item label="变更描述">
        {getFieldDecorator(`desc`, {
          initialValue: editForm && editForm.desc || '',
        })(
        <TextArea style={{width: 250}} rows={4} placeholder="请输入变更描述"/>)}
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
      <Form.Item label="变更处理人">
        {getFieldDecorator(`principal`, {
          initialValue: editForm && editForm.principal,
          rules: [
        { 
          required: true,
          message: '请选择变更处理人' 
        }],
        })(
          <Select style={{ width: 250}} placeholder="请选择变更处理人">
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
      <Form.Item label="期望开始时间">
        {getFieldDecorator(`expect_start_time`, {
          initialValue: editForm && editForm.expect_start_time && moment(editForm.expect_start_time, 'YYYY-MM-DD'),
          rules: [
        { 
          required: true,
          message: '请选择期望开始时间' 
        }],
        })(
          <DatePicker placeholder="请选择期望开始时间"/>
        )}
      </Form.Item>
      <Form.Item label="期望完成时间">
        {getFieldDecorator(`expect_end_time`, {
          initialValue: editForm && editForm.expect_end_time && moment(editForm.expect_end_time, 'YYYY-MM-DD'),
          rules: [
        { 
          required: true,
          message: '请选择期望完成时间' 
        }],
        })(
          <DatePicker placeholder="请选择期望完成时间"/>
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
const EditChangeForm = Form.create({ name: 'EditChange' })(EditChange);

export {
  EditChangeForm
};