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
    category: state.QuestionManagement.category,
    reviewShow: state.QuestionManagement.reviewShow,
    reviewId: state.QuestionManagement.reviewId,
    reviewForm: state.QuestionManagement.reviewForm,
    eventCategory: state.QuestionManagement.eventCategory,
    eventPerson: state.QuestionManagement.eventPerson,
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

const ReviewQuestion: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {category, reviewShow, reviewId, reviewForm, eventPerson, eventCategory} = useMappedState(mapState);

  const [reviewType, setReviewType] = useState<number>(0);
  
  const onClose = () => {
    dispatch({
      type: "change questionManagement reviewShow"
    });

    // 重置表单
    props.form.resetFields();

    // 重置reviewType
    setReviewType(0);
  };

  useEffect(() => {
    if (reviewShow) {

      // 获取当前问题详细信息
      _ITSMSystemServices.getQuestionMsg(reviewId, (res: any) => {
        dispatch({
          type: "get questionManagement reviewForm",
          reviewForm: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });

      // 获取事件分类
      _ITSMSystemServices.getEventCategory((res: any) => {
        dispatch({
          type: "get questionManagement eventCategory",
          eventCategory: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });

      // 获取问题评审通过抄送事件人员数据
      _ITSMSystemServices.getEventHandleUser((res: any) => {
        dispatch({
          type: "get questionManagement eventPerson",
          eventPerson: res.data,
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

        // 拒绝
        if (reviewType == 2) {
          _ITSMSystemServices.reviewQuestionRefuse(reviewId, {remark: vals.remark || ''}, (res: any) => {
            success('拒绝成功');

            // 关闭组件，刷新页面
            onClose();
            dispatch({
              type: "get questionManagement list",
              count: 0
            });
            
            // 重新获取问题详情，发送给detailMsg，让问题详情页面刷新
            getQuestionMsg(reviewId);
          }, (res: any) => {
            warning(res.message);
          });
        }

        // 通过
        if (reviewType == 1) {
          const data = {
            remark: vals.remark || '',
            categoryId: vals.eventCategoryId,
            level: vals.level,
            name: vals.name,
            desc: vals.desc || '',
            sendTo: vals.sendTo,
            expectTime: moment(vals.expectTime).format("YYYY-MM-DD"),
          };
          _ITSMSystemServices.reviewQuestionAdopt(reviewId, data, (res: any) => {
            success('通过成功');

            // 关闭组件，刷新页面
            onClose();
            dispatch({
              type: "get questionManagement list",
              count: 0
            });
            
            // 重新获取问题详情，发送给detailMsg，让问题详情页面刷新
            getQuestionMsg(reviewId);
          }, (res: any) => {
            warning(res.message);
          });
        }

        // 暂缓
        if (reviewType == 3) {
          const data = {
            remark: vals.remark || '',
            categoryId: vals.categoryId,
            level: vals.level,
            name: vals.name,
            desc: vals.desc || '',
          };
          _ITSMSystemServices.reviewQuestionPostpone(reviewId, data, (res: any) => {
            success('暂放成功');

            // 关闭组件，刷新页面
            onClose();
            dispatch({
              type: "get questionManagement list",
              count: 0
            });
            
            // 重新获取问题详情，发送给detailMsg，让问题详情页面刷新
            getQuestionMsg(reviewId);
          }, (res: any) => {
            warning(res.message);
          });
        }
      }
    });
  };

  // 选择评审结果，同步保存
  const reviewResultChange = (vals: any) => {
    setReviewType(vals);
  };

  // 渲染评审结果拒绝表单项
  const reviewRefuse = () => {
    return (
      <Form.Item label="评审备注">
        {getFieldDecorator(`remark`, {
        })(
        <TextArea style={{width: 250}} rows={4} placeholder="请输入评审备注"/>)}
      </Form.Item>
    );
  };

  // 渲染评审结果通过表单项
  const reviewAdopt = () => {
    return (
      <Fragment>
        <Form.Item label="事件名称">
          {getFieldDecorator(`name`, {
            initialValue: reviewForm && reviewForm.name,
            rules: [
          { 
            required: true,
            message: '请输入事件名称' 
          }],
          })(<Input style={{width: 250}} placeholder="请输入事件名称" />)}
        </Form.Item>
        <Form.Item label="事件分类">
          {getFieldDecorator(`eventCategoryId`, {
            rules: [
          { 
            required: true,
            message: '请选择事件分类' 
          }],
          })(
            <Select style={{ width: 250}} placeholder="请选择事件分类">
              {
                eventCategory.map((item: any) => {
                  return <Option key={item.id} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="事件描述">
          {getFieldDecorator(`desc`, {
          })(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入事件描述"/>)}
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
        <Form.Item label="事件负责人">
          {getFieldDecorator(`sendTo`, {
            rules: [
          { 
            required: true,
            message: '请选择事件负责人' 
          }],
          })(
            <Select style={{ width: 250}} placeholder="请选择事件负责人">
              {
                eventPerson.map((item: any) => {
                  return <Option key={item.id} value={item.uid}>{item.displayname}</Option>;
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="期望指派日期">
          {getFieldDecorator(`expectTime`, {
            rules: [
          { 
            required: true,
            message: '请选择期望指派日期' 
          }],
          })(
            <DatePicker placeholder="请选择期望指派日期"/>
          )}
        </Form.Item>
        <Form.Item label="评审备注">
          {getFieldDecorator(`remark`, {
          })(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入评审备注"/>)}
        </Form.Item>
      </Fragment>
    );
  };

  // 渲染评审结果暂放表单项
  const reviewPostPone = () => {
    return (
      <Fragment>
        <Form.Item label="问题名称">
          {getFieldDecorator(`name`, {
            initialValue: reviewForm && reviewForm.name,
            rules: [
          { 
            required: true,
            message: '请输入问题名称' 
          }],
          })(<Input style={{width: 250}} placeholder="请输入问题名称" />)}
        </Form.Item>
        <Form.Item label="问题分类">
          {getFieldDecorator(`categoryId`, {
            initialValue: reviewForm && reviewForm.category_id,
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
        <Form.Item label="问题描述">
          {getFieldDecorator(`desc`, {
            initialValue: reviewForm && reviewForm.desc || '',
          })(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入问题描述"/>)}
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
        <Form.Item label="评审备注">
          {getFieldDecorator(`remark`, {
          })(
          <TextArea style={{width: 250}} rows={4} placeholder="请输入评审备注"/>)}
        </Form.Item>
      </Fragment>
    );
  };

  // 根据需选择的评审结果动态渲染表单
  const reviewFormItem = () => {
    if (reviewType == 2) {
      return reviewRefuse;
    }
    if (reviewType == 1) {
      return reviewAdopt;
    }
    if (reviewType == 3) {
      return reviewPostPone;
    }
    return function() {
      return null;
    };
  };

  return (
    <Drawer
      title='评审问题'
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={reviewShow}
      width={500}
    >
    <Form {...formItemLayout}>
      <Form.Item label="评审结果">
        {getFieldDecorator(`reviewResult`, {
          rules: [
        { 
          required: true,
          message: '请选择评审结果' 
        }],
        })(
          <Select onChange={reviewResultChange} style={{ width: 250}} placeholder="请选择评审结果">
            <Option value={1}>通过</Option>
            <Option value={2}>拒绝</Option>
            <Option value={3}>暂放</Option>
          </Select>
        )}
      </Form.Item>
      {/* 根据需选择的评审结果动态渲染表单 */}
      {reviewFormItem()()}
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
const ReviewQuestionForm = Form.create({ name: 'ReviewQuestion' })(ReviewQuestion);

export {
  ReviewQuestionForm
};