import React, { useEffect, useState } from 'react';
import { Drawer, Button, Input, message, Form } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { TextArea } = Input;

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    reviewId: state.WorkOrderManagement.reviewId,
    reviewShow: state.WorkOrderManagement.reviewShow,
    reviewType: state.WorkOrderManagement.reviewType,
    count: state.WorkOrderManagement.count,
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

const ReviewWorkOrder: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {reviewId, reviewShow, reviewType} = useMappedState(mapState);
  
  const onClose = () => {
    dispatch({
      type: "change workOrderManagement reviewShow"
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

  // 封装重新获取工单详情，发送给detailMsg，让工单详情页面刷新
  const getWorkOrderMsg = (id: any) => {
    _ITSMSystemServices.getWorkOrderMsg(id, (res: any) => {
      dispatch({
        type: "get workOrderManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  };

  // 根据reciewType提交不同操作
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {

      // 开始工单
      if (reviewType == 1) {
        _ITSMSystemServices.startWorkOrder(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get workOrderManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取工单详情，发送给detailMsg，让工单详情页面刷新
          getWorkOrderMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }

      // 暂停工单
      if (reviewType == 2) {
        _ITSMSystemServices.stoptWorkOrder(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get workOrderManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取工单详情，发送给detailMsg，让工单详情页面刷新
          getWorkOrderMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }

      // 完成工单
      if (reviewType == 3) {
        _ITSMSystemServices.finishWorkOrder(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get workOrderManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取工单详情，发送给detailMsg，让工单详情页面刷新
          getWorkOrderMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }

      // 验收工单
      if (reviewType == 4) {
        _ITSMSystemServices.acceptWorkOrder(reviewId, {remark: vals.remark || ''}, (res: any) => {
          success(`${title() + '成功'}`);
          dispatch({
            type: "get workOrderManagement list",
            count: 0
          });
          onClose();
          
          // 重新获取工单详情，发送给detailMsg，让工单详情页面刷新
          getWorkOrderMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  return (
    <Drawer
      title={title() + '工单'}
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
const ReviewWorkOrderForm = Form.create({ name: 'ReviewWorkOrder' })(ReviewWorkOrder);

export {
  ReviewWorkOrderForm
};