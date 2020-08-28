import React from 'react';
import { Drawer, Form, Button, Input, message } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

// 引入store数据集合
import { IState } from "@/store";

// 引入axios方法
import {ITSMSystemServices} from "@/services/itsmSystemServices";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
      addGroupShow: state.ServiceGroupManagement.addGroupShow,
  };
};

// 定义请求失败提示
const warning = (msg: string) => {
  message.warning(msg);
};

// 定义请求成功提示
const success = (msg: string) => {
  message.success(msg);
};

const AddServiceGroup: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices ();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {addGroupShow} = useMappedState(mapState);

  // 组件关闭
  const onClose = () => {
    dispatch({
      type: "change serviceGroupManagement addGroupShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // 提交
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      if (!err) {
        _ITSMSystemServices.addServiceGroup({name: vals.name}, (res: any) => {
          success("新建服务组成功");
          onClose();

          // 重新获取服务组数据，并且选中我们最后添加的服务组
          dispatch({
            type: 'change serviceGroupManagement loading'
          });
          _ITSMSystemServices.getServiceGroup((res: any) => {
            dispatch({
              type: 'get serviceGroupManagement serviceGroupList',
              serviceGroupList: res.data
            });
            dispatch({
              type: 'change serviceGroupManagement loading'
            });
      
            // 选中我们添加的服务组并且获取对应服务
            dispatch({
              type: "get serviceGroupManagement serviceGroupId",
              serviceGroupId: res.data[res.data.length - 1].id
            });
          }, (res: any) => {
            warning('获取服务组数据失败');
            dispatch({
              type: 'change serviceGroupManagement loading'
            });
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  return (
    <Drawer
      title="新建服务组"
      closable
      maskClosable={false}
      placement="right"
      onClose={onClose}
      visible={addGroupShow}
      width={495}
    >
    <Form {...formItemLayout}>
      <Form.Item label="服务组名称">
        {getFieldDecorator('name', {
          rules: [
        { 
          required: true,
          message: '请输入服务组名称' 
        }],
        })(<Input placeholder="请输入服务组名称" />)}
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

const AddServiceGroupForm = Form.create({ name: 'AddServiceGroup' })(AddServiceGroup);

export {
  AddServiceGroupForm
};