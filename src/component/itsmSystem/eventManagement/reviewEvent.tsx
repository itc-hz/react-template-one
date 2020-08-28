import React, { useEffect, useState, Fragment } from 'react';
import { Drawer, Form, Button, Input, message, Select, Upload, Icon, DatePicker } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
const { Option } = Select;
const { TextArea } = Input;

import moment from "moment";

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    reviewShow: state.EventManagement.reviewShow,
    reviewId: state.EventManagement.reviewId,
    reviewForm: state.EventManagement.reviewForm,
    workOrderCategory: state.EventManagement.workOrderCategory,
    workOrderPerson: state.EventManagement.workOrderPerson,
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

const ReviewEvent: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {reviewShow, reviewId, reviewForm, workOrderPerson, workOrderCategory} = useMappedState(mapState);

  useEffect(() => {
    if (reviewShow) {

      // 获取当前事件详细信息
      _ITSMSystemServices.getEventMsg(reviewId, (res: any) => {
        dispatch({
          type: "get eventManagement reviewForm",
          reviewForm: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });

      // 获取工单分类
      _ITSMSystemServices.getWorkOrderCategory((res: any) => {
        dispatch({
          type: "get eventManagement workOrderCategory",
          workOrderCategory: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });

      // 获取事件指派工单人员数据
      _ITSMSystemServices.getWorkOrderHandleUser((res: any) => {
        dispatch({
          type: "get eventManagement workOrderPerson",
          workOrderPerson: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });
    }
  }, [reviewShow]);

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const onClose = () => {
    dispatch({
      type: "change eventManagement reviewShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 封装重新获取事件详情，发送给detailMsg，让事件详情页面刷新
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

  // 提交表单
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      if (!err) {
        const data = {
          remark: vals.remark || '',
          categoryId: vals.eventCategoryId,
          level: vals.level,
          name: vals.name,
          desc: vals.desc || '',
          sendTo: vals.sendTo,
          expectStartTime: moment(vals.expectStartTime).format("YYYY-MM-DD"),
          expectEndTime: moment(vals.expectEndTime).format("YYYY-MM-DD"),
        };
        _ITSMSystemServices.submitReviewEvent(reviewId, data, (res: any) => {
          success('指派成功');

          // 关闭组件，刷新页面
          onClose();
          dispatch({
            type: "get eventManagement list",
            count: 0
          });
          
          // 重新获取事件详情，发送给detailMsg，让事件详情页面刷新
          getEventMsg(reviewId);
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 渲染评审结果通过表单项
  const reviewFormItem = () => {
    return (
      <Fragment>
        <Form.Item label="工单名称">
          {getFieldDecorator(`name`, {
            initialValue: reviewForm && reviewForm.name,
            rules: [
          { 
            required: true,
            message: '请输入工单名称' 
          }],
          })(<Input style={{width: 250}} placeholder="请输入工单名称" />)}
        </Form.Item>
        <Form.Item label="工单分类">
          {getFieldDecorator(`eventCategoryId`, {
            rules: [
          { 
            required: true,
            message: '请选择工单分类' 
          }],
          })(
            <Select style={{ width: 250}} placeholder="请选择工单分类">
              {
                workOrderCategory.map((item: any) => {
                  return <Option key={item.id} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="工单描述">
          {getFieldDecorator(`desc`, {
          })(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入工单描述"/>)}
        </Form.Item>
        <Form.Item label="工单处理人">
          {getFieldDecorator(`sendTo`, {
            rules: [
          { 
            required: true,
            message: '请选择工单处理人' 
          }],
          })(
            <Select style={{ width: 250}} placeholder="请选择工单处理人">
              {
                workOrderPerson.map((item: any) => {
                  return <Option key={item.id} value={item.uid}>{item.displayname}</Option>;
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="紧急程度">
          {getFieldDecorator(`level`, {
            initialValue: reviewForm && reviewForm.level,
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
          {getFieldDecorator(`expectStartTime`, {
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
          {getFieldDecorator(`expectEndTime`, {
            rules: [
          { 
            required: true,
            message: '请选择期望完成时间' 
          }],
          })(
            <DatePicker placeholder="请选择期望完成时间"/>
          )}
        </Form.Item>
        <Form.Item label="工单备注">
          {getFieldDecorator(`remark`, {
          })(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入工单备注"/>)}
        </Form.Item>
      </Fragment>
    );
  };

  return (
    <Drawer
      title='指派工单'
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={reviewShow}
      width={500}
    >
    <Form {...formItemLayout}>
      {reviewFormItem()}
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
const ReviewEventForm = Form.create({ name: 'ReviewEvent' })(ReviewEvent);

export {
  ReviewEventForm
};