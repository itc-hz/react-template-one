import React, { useEffect, useState } from 'react';
import { Drawer, Button, Input, message, Form } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { TextArea } = Input;

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    closeId: state.EventManagement.closeId,
    closeShow: state.EventManagement.closeShow,
    count: state.EventManagement.count,
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

const CloseEvent: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {closeId, closeShow} = useMappedState(mapState);

  const onClose = () => {
    dispatch({
      type: "change eventManagement closeShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // 封装重新获取问题详情，发送给detailMsg，让问题详情页面刷新
  const getEventMsg = (id: any) => {
    _ITSMSystemServices.getEventMsg(id, (res: any) => {
      dispatch({
        type: "get eventManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  };

  // 提交关闭问题
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      _ITSMSystemServices.closeEvent(closeId, {reason: vals.reason, remark: vals.remark || ''}, (res: any) => {
        success("关闭成功");
        dispatch({
          type: "get eventManagement list",
          count: 0
        });
        onClose();
        
        // 重新获取事件详情，发送给detailMsg，让问题详情页面刷新
        getEventMsg(closeId);
      }, (res: any) => {
        warning(res.message);
      });
    });
  };

  return (
    <Drawer
      title='关闭事件'
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={closeShow}
      width={500}
    >
      <Form {...formItemLayout}>
        <Form.Item label="关闭原因">
          {getFieldDecorator(`reason`, {
            rules: [
          { 
            required: true,
            message: '请输入关闭原因' 
          }],
          })(
            <Input style={{width: 250}} placeholder="请输入关闭原因" />
          )}
        </Form.Item>
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
const CloseEventForm = Form.create({ name: 'CloseEvent' })(CloseEvent);

export {
  CloseEventForm
};