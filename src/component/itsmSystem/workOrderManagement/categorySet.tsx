import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, message, Icon, Modal } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
const { confirm } = Modal;

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    category: state.WorkOrderManagement.category,
    categorySetShow: state.WorkOrderManagement.categorySetShow,
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

const CategorySet: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {category, categorySetShow} = useMappedState(mapState);

  // 保存当前点击编辑按钮的分类id
  const [editId, setEditId] = useState('');

  // 控制添加input展示与隐藏
  const [isAdd, setIsAdd] = useState(false);

  const onClose = () => {
    dispatch({
      type: "change workOrderManagement categorySetShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { offset: 2, span: 22 },
  };

  // 定义获取工单分类数据方法
  const getWorkOrderCategory = () => {
    _ITSMSystemServices.getWorkOrderCategory((res: any) => {
      dispatch({
        type: "get workOrderManagement category",
        category: res.data
      });
    }, (res: any) => {
      warning("获取工单分类数据失败");
    });
  };

  // 点击展示新增工单分类input
  const showAddCategory = () => {
    setIsAdd(true);
  };

  // 点击取消，隐藏新增工单分类input
  const closeAddCategory = () => {
    setIsAdd(false);
  };

  // 提交新增分类
  const addCategory = () => {
    props.form.validateFields(['addName'], (err: any, vals: any) => {
      if (!err) {
        _ITSMSystemServices.addWorkOrderCategory({name: vals.addName}, (res: any) => {
          success("添加成功");
          getWorkOrderCategory();

          // 重置input
          props.form.resetFields(['addName']);
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 进入编辑分类状态，解除当前input禁用状态
  const editCategory = (id: any) => {

    // 保存当前用户选中的id，相等时展示保存按钮
    setEditId(id);
  };

  // 编辑分类提交
  const submitEditCategory = (id: any) => {
    props.form.validateFields([`editName${id}`], (err: any, vals: any) => {
      if (!err) {
        _ITSMSystemServices.editWorkOrderCategory(id, {name: vals[`editName${id}`]}, (res: any) => {

          // 置空保存的id，回到未编辑状态
          setEditId('');
          success("编辑成功");
          getWorkOrderCategory();
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 删除当前工单分类
  const deleteWorkOrderCategory = (id: any) => {
    
    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前所选分类？',
      onOk() {
        _ITSMSystemServices.deleteWorkOrderCategory(id, (res: any) => {
          success("删除成功");
          getWorkOrderCategory();
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 渲染工单分类项
  const categoryItem = () => {
    return category.map((item: any, index: any) => (
      <Form.Item key={item.id}>
        {getFieldDecorator(`editName${item.id}`, {
          initialValue: item.name,
          rules: [
        { 
          required: true,
          message: '请输入分类名称' 
        }],
        })(<Input style={{width: 250}} disabled={editId != item.id} placeholder="请输入分类名称" />)}
        {editId == item.id ? <Button icon="check" shape="circle" style={{marginLeft: 10}} onClick={() => submitEditCategory(item.id)}></Button> : <Button icon="edit" shape="circle" style={{marginLeft: 10}} onClick={() => editCategory(item.id)} ></Button>}
        <Button icon="delete" shape="circle" style={{marginLeft: 10}} onClick={() => deleteWorkOrderCategory(item.id)}></Button>
      </Form.Item>
    ));
  };

  // 重置工单分类
  const resetWorkOrderCategory = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否重置默认分类？',
      onOk() {
        _ITSMSystemServices.resetWorkOrderCategory((res: any) => {
          success("重置成功");
          dispatch({
            type: "get workOrderManagement category",
            category: res.data
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  return (
    <Drawer
      title="分类设置"
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={categorySetShow}
      width={500}
      bodyStyle={{position: "relative"}}
    >
    <Form {...formItemLayout}>
      {/* 动态渲染分类项 */}
      {categoryItem()}
      {/* 如果当前是add状态，就展示添加工单分类input */}
      {isAdd ? <Form.Item>
        {getFieldDecorator(`addName`, {
          rules: [
        { 
          required: true,
          message: '请输入分类名称' 
        }],
        })(<Input style={{width: 250}} placeholder="请输入分类名称" />)}
        <Button icon="check" shape="circle" style={{marginLeft: 10}} onClick={addCategory}></Button>
        <Button icon="close" shape="circle" style={{marginLeft: 10}} onClick={closeAddCategory}></Button>
      </Form.Item> : null}
      {/* 点击增加工单分类按钮 */}
      <Form.Item>
        <Button type="dashed" style={{width: 250}} onClick={showAddCategory}>
          <Icon type="plus"/>
          添加工单分类
        </Button>
      </Form.Item>
    </Form>
    <Button type="primary" style={{position: "absolute", top: -45, left: 100}} onClick={resetWorkOrderCategory}>重置默认分类</Button>
  </Drawer>
  );
};

// 使表单组件具有props.form
const CategorySetForm = Form.create({ name: 'CategorySet' })(CategorySet);

export {
  CategorySetForm
};