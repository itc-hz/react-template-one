import React, { useEffect, useState } from 'react';
import { Drawer, Button, Input, message, Form } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { TextArea } = Input;

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    reviewId: state.ChangeManagement.reviewId,
    reviewShow: state.ChangeManagement.reviewShow,
    reviewType: state.ChangeManagement.reviewType,
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

const ReviewChange: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {reviewId, reviewShow, reviewType} = useMappedState(mapState);
  
  const onClose = () => {
    dispatch({
      type: "change changeManagement reviewShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // 动态渲染表单名
  const title = () => {
    if (reviewType == 1) {
      return '开始';
    }
    if (reviewType == 2) {
      return '暂停';
    }
    if (reviewType == 3) {
      return '完成';
    }
    return '验收';
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

  // 根据reciewType提交不同操作
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {

      // 开始变更
      if (reviewType == 1) {
        _ITSMSystemServices.startChange(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get changeManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取变更详情，发送给detailMsg，让变更详情页面刷新
          getChangeMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }

      // 完成变更
      if (reviewType == 3) {
        _ITSMSystemServices.finishChange(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get changeManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取变更详情，发送给detailMsg，让变更详情页面刷新
          getChangeMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }

      // 验收变更
      if (reviewType == 4) {
        _ITSMSystemServices.acceptChange(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get changeManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取变更详情，发送给detailMsg，让变更详情页面刷新
          getChangeMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  return (
    <Drawer
      title={title() + '变更'}
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={reviewShow}
      width={500}
    >
      <Form {...formItemLayout}>
        <Form.Item label={title() + '备注'}>
          {getFieldDecorator(`remark`)(
          <TextArea style={{width: 250}} rows={4} placeholder={'请输入' + title() + '备注'}/>)}
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
const ReviewChangeForm = Form.create({ name: 'ReviewChange' })(ReviewChange);

export {
  ReviewChangeForm
};