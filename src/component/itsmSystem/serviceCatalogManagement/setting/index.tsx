import React, { useEffect, useState } from 'react';
import { message, Spin, Form, Radio, Select, Checkbox, Button } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const {Option} = Select;

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListTitle} from "@/baseUI/BaseShowList";

// 引入公共栅格化组件
import {
  UIGrid,
  UICol
} from '@/baseUI/Grid';

// 引入本组件样式
import {
  ContentWrapper,
  ListWrapper,
  ListItem,
  Title,
  ButtonWrapper,
} from "./ui";

// 引入axios方法
import {ITSMSystemServices} from "@/services/itsmSystemServices";

import { IState } from "@/store";

// 定义请求失败提示
const warning = (msg: string) => {
  message.warning(msg);
};

const success = (msg: string) => {
  message.success(msg);
};

// 从store中取出我们需要的数据
const mapState = (state: IState) => {
  return {
    loading: state.ServiceSetting.loading,
    moduleList: state.ServiceSetting.moduleList,
    moduleId: state.ServiceSetting.moduleId,
    setMsg: state.ServiceSetting.setMsg,
    personnel: state.ServiceSetting.personnel,
  };
};

const ServiceSetting: React.ComponentType = (props: any) => {
  const { getFieldDecorator } = props.form;
  
  const { loading, moduleList, moduleId, setMsg, personnel} = useMappedState(mapState);

  const _ITSMSystemServices = new ITSMSystemServices();
  
  const dispatch = useDispatch();

  const [type, setType] = useState<any>(null);

  // 控制修改表单后，重新获取设置数据
  const [update, setUpdate] = useState(0);
  
  useEffect(() => {
    dispatch({
      type: 'change serviceSetting loading'
    });
    _ITSMSystemServices.getModuleList((res: any) => {
      dispatch({
        type: 'get serviceSetting moduleList',
        moduleList: res.data
      });
      dispatch({
        type: 'change serviceSetting loading'
      });

      // 页面加载默认选中第一个服务并且获取对应配置数据
      dispatch({
        type: "get serviceSetting moduleId",
        moduleId: res.data[0].id
      });
    }, (res: any) => {
      warning('获取服务配置失败');
      dispatch({
        type: 'change serviceSetting loading'
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (moduleId) {
      dispatch({
        type: 'change serviceSetting loading'
      });

      // 选中服务改变时，获取对应配置数据
      _ITSMSystemServices.getModuleSetting(moduleId, (res: any) => {
        dispatch({
          type: 'get serviceSetting setMsg',
          setMsg: res.data
        });
        dispatch({
          type: 'change serviceSetting loading'
        });

        // 如果users长度不为1，即设置type初始值为指定审核人
        if (res.data.users.length > 0) {
          setType(1);
        }
      }, (res: any) => {
        warning(res.message);
        dispatch({
          type: 'change serviceSetting loading'
        });
      });

      // 获取服务配置可选审核人
      _ITSMSystemServices.getAuthServeUser(moduleId, (res: any) => {
        dispatch({
          type: 'get serviceSetting personnel',
          personnel: res.data
        });
      }, (res: any) => {
        warning(res.message);
      });
    }
  }, [update, moduleId]);

  // 点击服务获取对应服务数据
  const getModuleSetting = (id: any) => {
    
    // 重置type
    setType(null);

    // 传递服务id
    dispatch({
      type: "get serviceSetting moduleId",
      moduleId: id
    });

    // 重置表单
    props.form.resetFields();
  };  

  // 渲染服务列表
  const renderModuleList = () => {
    return moduleList && moduleList.map((item: any, index: any) => {
      return <ListItem key={item.id} type={item.id == moduleId ? 1 : 0} onClick={() => getModuleSetting(item.id)}>{item.module}</ListItem>;
    });
  };

  // 定义表格表单名和输入框所占比例
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const formItemLayoutNoLabel = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24, offset: 6 },
  };

  const formItemLayoutCheckbox = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };

  // 单选按钮样式
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '38px',
  };

  // 创建者-问题-复选框数据
  const questionCreateNotify = [
    { label: '问题“某某某”已成功创建', value: '1' },
    { label: '您创建的问题“某某某”已关闭', value: '2' },
    { label: '您创建的问题“某某某”审核通过', value: '3' },
    { label: '您创建的问题“某某某”审核拒绝', value: '4' },
    { label: '您创建的问题“某某某”审核暂放', value: '5' },
    { label: '您创建的问题“某某某”超时未审核', value: '6' },
  ];

  // 创建者-事件-复选框数据
  const eventCreateNotify = [
    { label: '事件“某某某”已成功创建', value: '1' },
    { label: '您创建的事件“某某某”已关闭', value: '2' },
    { label: '您创建的事件“某某某”已派为工单', value: '3' },
    { label: '您创建的事件“某某某”超时未完成', value: '4' },
  ];

  // 创建者-工单-复选框数据
  const workOrderCreateNotify = [
    { label: '工单“某某某”已成功创建', value: '1' },
    { label: '您创建的工单“某某某”已关闭', value: '2' },
    { label: '您创建的工单“某某某”已开始', value: '3' },
    { label: '您创建的工单“某某某”超时未完成', value: '5' },
    { label: '您创建的工单“某某某”待验收', value: '4' },
  ];

  // 创建者-变更-复选框数据
  const changeCreateNotify = [
    { label: '变更“某某某”已成功创建', value: '1' },
    { label: '您创建的变更“某某某”已关闭', value: '2' },
    { label: '您创建的变更“某某某”已开始处理', value: '3' },
    { label: '您创建的变更“某某某”超时未完成', value: '5' },
    { label: '您创建的变更“某某某”待验收', value: '4' },
  ];

  // 创建者-知识库-复选框数据
  const knowledgeCreateNotify = [
    { label: '知识“某某某”已成功创建', value: '1' },
    { label: '知识“某某某”已成功更新', value: '2' },
    { label: '您创建的知识“某某某”已删除', value: '3' },
    { label: '您创建的知识“某某某”审核通过', value: '4' },
    { label: '您创建的知识“某某某”审核拒绝', value: '5' },
  ];

  // 审核人-问题-复选框数据
  const questionAuditNotify = [
    { label: '您有一条问题待审核', value: '1' },
    { label: '待您评审的问题“某某某”已关闭', value: '2' },
    { label: '待您评审的问题“某某某”即将超时', value: '3' },
    { label: '待您评审的问题“某某某”已超时', value: '4' },
  ];

  // 审核人-事件-复选框数据
  const eventAuditNotify = [
    { label: '您有一条事件待分配', value: '1' },
    { label: '事件“某某某”已关闭', value: '2' },
    { label: '待您分派的事件“某某某”即将超时', value: '3' },
    { label: '待您分派的事件“某某某”已超时', value: '4' },
  ];

  // 审核人-工单-复选框数据
  const workOrderAuditNotify = [
    { label: '您有一条工单待处理', value: '1' },
    { label: '待您处理的工单“某某某”已关闭', value: '2' },
    { label: '您完成的工单“某某某”已验收', value: '3' },
    { label: '待您处理的工单“某某某”即将超时', value: '4' },
    { label: '待您处理的工单“某某某”已超时', value: '5' },
  ];

  // 审核人-变更-复选框数据
  const changeAuditNotify = [
    { label: '您有一条变更待处理', value: '1' },
    { label: '待您处理的变更“某某某”已关闭', value: '2' },
    { label: '您完成的变更“某某某”已验收', value: '3' },
    { label: '待您处理的变更“某某某”即将超时', value: '4' },
    { label: '待您处理的变更“某某某”已超时', value: '5' },
  ];

  // 审核人-知识库-复选框数据
  const knowledgeAuditNotify = [
    { label: '您有一条知识待审核', value: '1' },
    { label: '待您评审的知识“某某某”已删除', value: '2' },
  ];

  // 渲染创建者通知选项复选框
  const notifyCreateOptions = () => {
    if (moduleId == 3) {
      return eventCreateNotify;
    }
    if (moduleId == 4) {
      return workOrderCreateNotify;
    }
    if (moduleId == 5) {
      return changeCreateNotify;
    }
    if (moduleId == 6) {
      return knowledgeCreateNotify;
    }
    return questionCreateNotify;
  };

  // 渲染审核人通知选项复选框
  const notifyAuditOptions = () => {
    if (moduleId == 3) {
      return eventAuditNotify;
    }
    if (moduleId == 4) {
      return workOrderAuditNotify;
    }
    if (moduleId == 5) {
      return changeAuditNotify;
    }
    if (moduleId == 6) {
      return knowledgeAuditNotify;
    }
    return questionAuditNotify;
  };

  // 修改处理人设置
  const choiceMethod = (e: any) => {
    setType(e.target.value);
  };

  // 提交修改
  const onSubmit = () => {
    props.form.validateFields((err: any, vals: any) => {
      if (!err) {
        console.log(vals);
        _ITSMSystemServices.setSetting(moduleId, {users: vals.method ? vals.handler : [], notifyAudit: vals.notifyAudit, notifyCreate: vals.notifyCreate}, (res: any) => {
          success('修改成功');

          // 修改标识，促使更新
          setUpdate(update + 1);
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 重置表单
  const resetForm = () => {
    props.form.resetFields();
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>服务配置</ShowListTitle>
      </ShowListHeader>
      <ContentWrapper>
        <Spin spinning={loading}>
          <UIGrid>
            <UICol span={4} style={{borderRight: '1px solid #dae1e4', height: 800}}>
              <h3>服务名称</h3>
              <ListWrapper>
                {renderModuleList()}
              </ListWrapper>
            </UICol>
            <UICol span={20} style={{height: 800}}>
              <Form {...formItemLayout}>
                <Title>基础设置</Title>
                <Form.Item label="处理人设置" style={{marginBottom: 0}}>
                  {getFieldDecorator('method', {
                      initialValue: setMsg && setMsg.users && setMsg.users.length > 0 ? 1 : 0,
                    })(
                      <Radio.Group onChange={choiceMethod}>
                        <Radio style={radioStyle} value={0}>
                          自定义
                        </Radio>
                        <Radio style={radioStyle} value={1}>
                          指定审核人
                        </Radio>
                      </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayoutNoLabel}>
                  {getFieldDecorator('handler', {
                      initialValue: setMsg && setMsg.users,
                      rules: [
                        { 
                          required: type ? true : false,
                          message: '请选择审核人' 
                        }],
                    })(
                      <Select mode="multiple" style={{ width: 200}} placeholder="请选择审核人">
                        {personnel.map((item: any) => {
                          return <Option key={item.uid} value={item.uid}>{item.displayname}</Option>;
                        })}
                      </Select>
                    )}
                </Form.Item>
                <Title>通知配置</Title>
                <Form.Item label="创建者" {...formItemLayoutCheckbox}>
                  {getFieldDecorator('notifyCreate', {
                    initialValue: setMsg && setMsg.notify_create
                    })(
                      <Checkbox.Group style={{marginTop: 10}} options={notifyCreateOptions()}/>
                    )}
                </Form.Item>
                <Form.Item label="审核人" {...formItemLayoutCheckbox}>
                  {getFieldDecorator('notifyAudit', {
                    initialValue: setMsg && setMsg.notify_audit
                    })(
                      <Checkbox.Group style={{marginTop: 10}} options={notifyAuditOptions()}/>
                    )}
                </Form.Item>
              </Form>
              <ButtonWrapper>
                <Button type='primary' style={{marginLeft: 8}} onClick={onSubmit}>确认</Button>
                <Button type='danger' style={{marginLeft: 20}} onClick={resetForm}>重置</Button>
              </ButtonWrapper>
            </UICol>
          </UIGrid>
        </Spin>
      </ContentWrapper>
    </ShowListWrapper>
  );
};

const ServiceSettingForm = Form.create({ name: 'ServiceSetting' })(ServiceSetting);

export {
  ServiceSettingForm
};