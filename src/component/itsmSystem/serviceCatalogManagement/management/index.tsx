import React, { useEffect, useState } from 'react';
import { Button, message, Spin, Modal, Table } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { confirm } = Modal;

// 引入子组件
import {AddServiceGroupForm} from './addServiceGroup';
import {AddPermission} from './addPermission';

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListOperateNoForm, ShowListTitle} from "@/baseUI/BaseShowList";

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
    loading: state.ServiceGroupManagement.loading,
    serviceGroupList: state.ServiceGroupManagement.serviceGroupList,
    serviceGroupId: state.ServiceGroupManagement.serviceGroupId,
    permission: state.ServiceGroupManagement.permission,
    selectRowsID: state.ServiceGroupManagement.selectRowsID,
  };
};

const ServiceGroupManagement: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();
  
  const { loading, serviceGroupList, serviceGroupId, permission, selectRowsID } = useMappedState(mapState);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
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
    }, (res: any) => {
      warning('获取服务组数据失败');
      dispatch({
        type: 'change serviceGroupManagement loading'
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (serviceGroupList.length > 0) {

      // 默认选中第一个服务组并且获取对应服务
      dispatch({
        type: "get serviceGroupManagement serviceGroupId",
        serviceGroupId: serviceGroupList[0].id
      });
    }
  }, [serviceGroupList]);

  useEffect(() => {
    if (serviceGroupId) {
      dispatch({
        type: 'change serviceGroupManagement loading'
      });

      // 选中服务组改变时，获取对应服务数据
      _ITSMSystemServices.getPermission(serviceGroupId, (res: any) => {
        dispatch({
          type: 'get serviceGroupManagement permission',
          permission: res.data
        });
        dispatch({
          type: 'change serviceGroupManagement loading'
        });
      }, (res: any) => {
        warning(res.message);
        dispatch({
          type: 'change serviceGroupManagement loading'
        });
      });
    }
  }, [serviceGroupId]);

  // 组件卸载重置筛选
  useEffect(() => {
    return () => {
      dispatch({
        type: "get serviceGroupManagement selectRowsID",
        selectRowsID: []
      });
    };
  }, []);

  // 点击服务组获取对应服务数据
  const getPermission = (id: any) => {

    // 传递服务组id
    dispatch({
      type: "get serviceGroupManagement serviceGroupId",
      serviceGroupId: id
    });
  };  

  // 渲染服务组列表
  const renderServiceGroupList = () => {
    return serviceGroupList && serviceGroupList.map((item: any, index: any) => {
      return <ListItem key={item.id} type={item.id == serviceGroupId ? 1 : 0} onClick={() => getPermission(item.id)}>{item.name}</ListItem>;
    });
  };

  // 表格行配置数据
  const columns: any = [
    {
      key: "id",
      title: "序号",
      align: "center",
      render: (text: any, record: any, index: any) => { return index + 1; }
    },
    {
      key: "module",
      title: '服务名称',
      align: "center",
      dataIndex: 'module'
    },
  ];

  // 表格选择框回调函数
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      
      // 点击选择框后，将当前行的id保存进数组中
      dispatch({
        type: "get serviceGroupManagement selectRowsID",
        selectRowsID: selectedRowKeys
      });
    },
    selectedRowKeys: selectRowsID,
  };

  // 新建服务组
  const addServiceGroup = () => {
    dispatch({
      type: "change serviceGroupManagement addGroupShow"
    });
  };

  // 删除服务组
  const deleteServiceGroup = () => {
    
    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前服务组？',
      onOk() {
        _ITSMSystemServices.deleteServiceGroup(serviceGroupId, (res: any) => {
          success("删除成功");

          // 置空选择框
          dispatch({
            type: "get serviceGroupManagement selectRowsID",
            selectRowsID: []
          });

          // 重新获取服务组数据，并定位到第一个服务组
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

  // 新建服务
  const addPermission = () => {
    dispatch({
      type: "change serviceGroupManagement addPermissionShow"
    });
  };

  // 删除服务
  const deletePermission = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前服务？',
      onOk() {
        _ITSMSystemServices.deletePermission(serviceGroupId, {permission: selectRowsID}, (res: any) => {
          success("删除成功");
          dispatch({
            type: 'change serviceGroupManagement loading'
          });

          // 重新获取当前服务组服务数据
          _ITSMSystemServices.getPermission(serviceGroupId, (res: any) => {
            dispatch({
              type: 'get serviceGroupManagement permission',
              permission: res.data
            });
            dispatch({
              type: 'change serviceGroupManagement loading'
            });

            // 清空选中项
            dispatch({
              type: "get serviceGroupManagement selectRowsID",
              selectRowsID: []
            });
          }, (res: any) => {
            warning(res.message);
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
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>服务组管理</ShowListTitle>
        <ShowListOperateNoForm>
          <Button type='primary' style={{marginLeft: 8}} onClick={addServiceGroup}>新建服务组</Button>
          <Button type='danger' style={{marginLeft: 8}} onClick={deleteServiceGroup}>删除服务组</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      <ContentWrapper>
        <Spin spinning={loading}>
          <UIGrid>
            <UICol span={4} style={{borderRight: '1px solid #dae1e4', height: 800}}>
              <h3>服务组</h3>
              <ListWrapper>
                {renderServiceGroupList()}
              </ListWrapper>
            </UICol>
            <UICol span={20} style={{height: 800}}>
              <ButtonWrapper>
                <Button type='primary' style={{marginLeft: 8}} onClick={addPermission}>新建服务</Button>
                <Button type='danger' disabled={selectRowsID.length > 0 ? false : true} style={{marginLeft: 8, marginRight: 8}} onClick={deletePermission}>删除服务</Button>
              </ButtonWrapper>
              <Table scroll={{y: 649}} bordered rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={permission}/>
            </UICol>
          </UIGrid>
        </Spin>
      </ContentWrapper>
      {/* 新建服务组组件 */}
      <AddServiceGroupForm />
      {/* 新建服务组件 */}
      <AddPermission />
    </ShowListWrapper>
  );
};

export {
  ServiceGroupManagement
};