import React, { useEffect, useState } from 'react';
import { Drawer, Button, Input, message, Form } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { TextArea } = Input;

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    closeId: state.ChangeManagement.closeId,
    closeShow: state.ChangeManagement.closeShow,
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

const CloseChange: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {closeId, closeShow} = useMappedState(mapState);

  const onClose = () => {
    dispatch({
      type: "change changeManagement closeShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
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

  // 提交关闭变更
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      _ITSMSystemServices.closeChange(closeId, {remark: vals.remark || ''}, (res: any) => {
        success("关闭成功");
        dispatch({
          type: "get changeManagement list",
          count: 0
        });
        onClose();
        
        // 重新获取变更详情，发送给detailMsg，让变更详情页面刷新
        getChangeMsg(closeId);
      }, (res: any) => {
        warning(res.message);
      });
    });
  };

  return (
    <Drawer
      title='关闭变更'
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={closeShow}
      width={500}
    >
      <Form {...formItemLayout}>
        <Form.Item label="关闭备注">
          {getFieldDecorator(`remark`)(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入关闭备注"/>)}
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
const CloseChangeForm = Form.create({ name: 'CloseChange' })(CloseChange);

export {
  CloseChangeForm
};