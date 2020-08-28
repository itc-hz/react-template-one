import React, { useEffect, useState } from 'react';
import { Button, message, Spin, Modal, Table } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { confirm } = Modal;

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListTitle} from "@/baseUI/BaseShowList";

// 引入子组件
import {AddPersonnelForm} from './addPersonnel';

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
    loading: state.ServiceGroupAuthorization.loading,
    serviceGroupList: state.ServiceGroupAuthorization.serviceGroupList,
    serviceGroupId: state.ServiceGroupAuthorization.serviceGroupId,
    selectRowsID: state.ServiceGroupAuthorization.selectRowsID,
    personnel: state.ServiceGroupAuthorization.personnel,
  };
};

const ServiceGroupAuthorization: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();
  
  const { loading, serviceGroupList, serviceGroupId, selectRowsID, personnel } = useMappedState(mapState);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: 'change serviceGroupAuthorization loading'
    });
    _ITSMSystemServices.getServiceGroup((res: any) => {
      dispatch({
        type: 'get serviceGroupAuthorization serviceGroupList',
        serviceGroupList: res.data
      });
      dispatch({
        type: 'change serviceGroupAuthorization loading'
      });
    }, (res: any) => {
      warning('获取服务组数据失败');
      dispatch({
        type: 'change serviceGroupAuthorization loading'
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (serviceGroupList.length > 0) {

      // 默认选中第一个服务组并且获取对应人员
      dispatch({
        type: "get serviceGroupAuthorization serviceGroupId",
        serviceGroupId: serviceGroupList[0].id
      });
    }
  }, [serviceGroupList]);

  useEffect(() => {
    if (serviceGroupId) {
      dispatch({
        type: 'change serviceGroupAuthorization loading'
      });

      // 选中服务组改变时，获取对应人员数据
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
    }
  }, [serviceGroupId]);

  // 组件卸载重置筛选
  useEffect(() => {
    return () => {
      dispatch({
        type: "get serviceGroupAuthorization selectRowsID",
        selectRowsID: []
      });
    };
  }, []);

  // 点击服务组获取对应人员数据
  const getPersonnel = (id: any) => {

    // 传递服务组id
    dispatch({
      type: "get serviceGroupAuthorization serviceGroupId",
      serviceGroupId: id
    });
  };  

  // 渲染服务组列表
  const renderServiceGroupList = () => {
    return serviceGroupList && serviceGroupList.map((item: any, index: any) => {
      return <ListItem key={item.id} type={item.id == serviceGroupId ? 1 : 0} onClick={() => getPersonnel(item.id)}>{item.name}</ListItem>;
    });
  };

  // 表格行配置数据
  const columns: any = [
    {
      key: "uid",
      title: "序号",
      align: "center",
      render: (text: any, record: any, index: any) => { return index + 1; }
    },
    {
      key: "displayname",
      title: '授权人员',
      align: "center",
      dataIndex: 'displayname'
    },
  ];

  // 表格选择框回调函数
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      
      // 点击选择框后，将当前行的id保存进数组中
      dispatch({
        type: "get serviceGroupAuthorization selectRowsID",
        selectRowsID: selectedRowKeys
      });
    },
    selectedRowKeys: selectRowsID,
  };

  // 新建服务授权人员
  const addPersonnel = () => {
    dispatch({
      type: "change serviceGroupAuthorization addPersonnelShow"
    });
  };

  // 删除服务授权人员
  const deletePersonnel = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前人员？',
      onOk() {

        _ITSMSystemServices.deletePersonnel(serviceGroupId, {users: selectRowsID}, (res: any) => {
          success("删除成功");
          dispatch({
            type: 'change serviceGroupAuthorization loading'
          });

          // 重新获取当前服务组人员数据
          _ITSMSystemServices.getPersonnel(serviceGroupId, (res: any) => {
            dispatch({
              type: 'get serviceGroupAuthorization personnel',
              personnel: res.data
            });
            dispatch({
              type: 'change serviceGroupAuthorization loading'
            });

            // 清空选中项
            dispatch({
              type: "get serviceGroupAuthorization selectRowsID",
              selectRowsID: []
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

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>服务组授权</ShowListTitle>
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
                <Button type='primary' style={{marginLeft: 8}} onClick={addPersonnel}>新建授权</Button>
                <Button type='danger' disabled={selectRowsID.length > 0 ? false : true} style={{marginLeft: 8, marginRight: 8}} onClick={deletePersonnel}>删除授权</Button>
              </ButtonWrapper>
              <Table scroll={{y: 649}} bordered rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.uid} dataSource={personnel}/>
            </UICol>
          </UIGrid>
        </Spin>
      </ContentWrapper>
      {/* 新建授权组件 */}
      <AddPersonnelForm />
    </ShowListWrapper>
  );
};

export {
  ServiceGroupAuthorization
};