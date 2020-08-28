import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, message, Select, Upload, Icon } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { Option } = Select;
const { TextArea } = Input;

// 引入上传方法
import UploadFileServices from '@/services/uploadFileServices';

// 引入判断是否是图片方法
import { isImage } from "@/util/antdUploadGetBase64";

// 引入非图片上传警告弹窗
import { warningModal } from "@/util/golbalModalMessage";

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    categoryEditShow: state.KnowledgeManagement.categoryEditShow,
    categoryEditType: state.KnowledgeManagement.categoryEditType,
    categoryEditId: state.KnowledgeManagement.categoryEditId,
    categoryEditForm: state.KnowledgeManagement.categoryEditForm,
    categoryCount: state.KnowledgeManagement.categoryCount,
    categoryPerson: state.KnowledgeManagement.categoryPerson,
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

const EditKnowCategory: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const _uploadFileServices = new UploadFileServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {categoryEditShow, categoryEditType, categoryCount, categoryEditId, categoryEditForm, categoryPerson} = useMappedState(mapState);
  
  // 保存用户上传的图片列表
  const [fileList, setFileList] = useState<any>([]);
  
  useEffect(() => {
    if (categoryEditType == 'edit') {
      _ITSMSystemServices.getKnowCategoryMsg(categoryEditId, (res: any) => {
        dispatch({
          type: "get knowledgeManagement categoryEditForm",
          categoryEditForm: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });
    }
  }, [categoryEditType]);

  useEffect(() => {
    if (categoryEditForm.icon) {
      setFileList(
        [
          {
            uid: 1,
            name: `image${categoryEditForm.icon}.png`,
            status: 'done',
            url: categoryEditForm.icon,
            response: categoryEditForm.icon,
            type: "image/png",
          }
        ]
      );
    }

    if (!categoryEditForm.icon) {
      setFileList([]);
    }
  }, [categoryEditForm]);

  const onClose = () => {
    dispatch({
      type: "change knowledgeManagement categoryEditShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

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
    }, (err: any) => {
        e.onError(err);
    });
  };

  // 上传图片后回调函数，判断是否是图片，同步保存进fileList
  const logonormFile = (e: any): any => {
    if (!isImage(e.file.type)) {
        warningModal(`文件格式${e.file.type}不是支持的类型`, '只能上传图片文件');
        e && setFileList(e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid));
        return e && e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid);
    }
    if (Array.isArray(e)) {
        return e;
    }
    e && setFileList(e.fileList);
    return e && e.fileList;
  };

  // 渲染上传图标以及样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  // 提交表单
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      console.log(vals);
      
      if (!err) {
        const data = {
          name: vals.name,
          auditor: vals.auditor,
          desc: vals.desc,
          icon: vals.icon && vals.icon[0] ? vals.icon[0].response : ''
        };
        if (categoryEditType == 'add') {
          _ITSMSystemServices.addKnowCategory(data, (res: any) => {
            success("新建分类成功");
            dispatch({
              type: "get knowledgeManagement categoryList",
              categoryCount: categoryCount + 1
            });
            onClose();
          }, (res: any) => {
            warning(res.message);
          });
        }

        if (categoryEditType == 'edit') {
          _ITSMSystemServices.editKnowCategory(categoryEditId, data, (res: any) => {
            success("编辑分类成功");
            dispatch({
              type: "get knowledgeManagement categoryList",
              categoryCount: 0
            });
            onClose();
          }, (res: any) => {
            warning(res.message);
          });
        }
      }
    });
  };

  return (
    <Drawer
      title={categoryEditType == "edit" ? "编辑分类" : "新建分类"}
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={categoryEditShow}
      width={500}
    >
    <Form {...formItemLayout}>
      <Form.Item label="分类名称">
        {getFieldDecorator(`name`, {
          initialValue: categoryEditForm && categoryEditForm.name,
          rules: [
        { 
          required: true,
          message: '请输入分类名称' 
        }],
        })(<Input style={{width: 250}} placeholder="请输入分类名称" />)}
      </Form.Item>
      <Form.Item label="上传图标" extra="支持扩展名：.jpg .png...">
          {getFieldDecorator('icon', {
            initialValue: fileList,
            valuePropName: 'fileList',
            getValueFromEvent: logonormFile,
          })(
            <Upload
              showUploadList={{showPreviewIcon: false, showDownloadIcon: false}}
              listType="picture-card"
              customRequest={uploadChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          )}
      </Form.Item>
      <Form.Item label="评审人">
        {getFieldDecorator(`auditor`, {
          initialValue: categoryEditForm && categoryEditForm.auditor,
        })(
          <Select style={{ width: 250}} placeholder="请选择评审人">
            {
              categoryPerson.map((item: any) => {
                return <Option key={item.uid} value={item.uid}>{item.displayname}</Option>;
              })
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="分类描述">
        {getFieldDecorator(`desc`, {
          initialValue: categoryEditForm && categoryEditForm.desc || '',
        })(
        <TextArea style={{width: 250}} rows={4} placeholder="请输入分类描述"/>)}
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
const EditKnowCategoryForm = Form.create({ name: 'EditKnowCategory' })(EditKnowCategory);

export {
  EditKnowCategoryForm
};