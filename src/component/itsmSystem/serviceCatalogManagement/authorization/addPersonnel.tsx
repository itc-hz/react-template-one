import React, {useEffect} from 'react';
import { Drawer, Button, message, TreeSelect, Form } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

// 引入store数据集合
import { IState } from "@/store";

// 引入axios方法
import {ITSMSystemServices} from "@/services/itsmSystemServices";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
      addPersonnelShow: state.ServiceGroupAuthorization.addPersonnelShow,
      serviceGroupId: state.ServiceGroupAuthorization.serviceGroupId,
      selectPersonnel: state.ServiceGroupAuthorization.selectPersonnel,
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

const AddPersonnel: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices ();

  const dispatch = useDispatch();

  const { getFieldDecorator } = props.form;

  const {addPersonnelShow, serviceGroupId, selectPersonnel} = useMappedState(mapState);
  
  useEffect(() => {
    if (serviceGroupId) {

      // 获取可新增授权人员
      _ITSMSystemServices.getNewPersonnel(serviceGroupId, (res: any) => {
        dispatch({
          type: "get serviceGroupAuthorization selectPersonnel",
          selectPersonnel: res
        });
      }, (res: any) => {
        warning('获取可新增授权人员数据失败');
      });
    }
  }, [serviceGroupId]);

  // 组件关闭
  const onClose = () => {
    dispatch({
      type: "change serviceGroupAuthorization addPersonnelShow"
    });

    // 重置表单
    props.form.resetFields();
  };

  // 提交
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      if (!err) {

        // 目前vals.users中都数据已经过滤了只有子级，这里直接取出后缀：salt就可以了
        const sonArr: any[] = [];
        vals.users.forEach((item: any) => {
          sonArr.push(item.split(':')[0]);
        });
        _ITSMSystemServices.addPersonnel(serviceGroupId, {users: sonArr}, (res: any) => {
          success("新建授权人员成功");
          onClose();
          dispatch({
            type: 'change serviceGroupAuthorization loading'
          });
    
          // 重新获取当前服务组授权人员数据
          _ITSMSystemServices.getPersonnel(serviceGroupId, (res: any) => {
            dispatch({
              type: 'get serviceGroupAuthorization personnel',
              personnel: res.data
            });
            dispatch({
              type: 'change serviceGroupAuthorization loading'
            });
          }, (res: any) => {
            warning(res.message);
            dispatch({
              type: 'change serviceGroupAuthorization loading'
            });
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };
  
  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // TreeSelect配置项
  const tProps = {
    treeData: selectPersonnel,
    treeCheckable: true,
    searchPlaceholder: '请选择人员',
    showSearch: true,
    treeNodeFilterProp: "title",
    dropdownStyle: {
        maxHeight: '300px'
    }
  };

  return (
    <Drawer
      title="新建授权"
      closable
      maskClosable={false}
      placement="right"
      onClose={onClose}
      visible={addPersonnelShow}
      width={495}
    >
      <Form {...formItemLayout}>
        <Form.Item label="特殊授权人员">
          {getFieldDecorator(`users`, {
            getValueFromEvent: (vals: any) => {

              // 过滤出子级
              const newData = vals.filter((item: any, label: any, extra: any) => {
                return item.indexOf(':d') === -1;
              });
              
              return newData;
            },
            rules: [
          { 
            required: true,
            message: '请选择人员' 
          }],
          })(<TreeSelect {...tProps}/>)}
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
const AddPersonnelForm = Form.create({ name: 'AddPersonnel' })(AddPersonnel);

export {
  AddPersonnelForm
};