import React, {useEffect} from 'react';
import { Drawer, Button, message, Table } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

// 引入store数据集合
import { IState } from "@/store";

// 引入axios方法
import {ITSMSystemServices} from "@/services/itsmSystemServices";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
      addPermissionShow: state.ServiceGroupManagement.addPermissionShow,
      serviceGroupId: state.ServiceGroupManagement.serviceGroupId,
      selectPermission: state.ServiceGroupManagement.selectPermission,
      selectedPermission: state.ServiceGroupManagement.selectedPermission,
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

const AddPermission: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices ();

  const dispatch = useDispatch();

  const {addPermissionShow, serviceGroupId, selectPermission, selectedPermission} = useMappedState(mapState);
  
  useEffect(() => {
    if (serviceGroupId) {

      // 获取可新增服务
      _ITSMSystemServices.getNewPermission(serviceGroupId, (res: any) => {
        dispatch({
          type: "get serviceGroupManagement selectPermission",
          selectPermission: res.data
        });
      }, (res: any) => {
        warning('获取可新增服务数据失败');
      });
    }
  }, [serviceGroupId]);

  // 组件关闭
  const onClose = () => {
    dispatch({
      type: "change serviceGroupManagement addPermissionShow"
    });

    // 清空选中项
    dispatch({
      type: "get serviceGroupManagement selectedPermission",
      selectedPermission: []
    });
  };

  // 提交
  const onSubmit = () => {
    _ITSMSystemServices.addPermission(serviceGroupId, {permission: selectedPermission}, (res: any) => {
      success("新建服务成功");
      onClose();
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
      }, (res: any) => {
        warning(res.message);
        dispatch({
          type: 'change serviceGroupManagement loading'
        });
      });
    }, (res: any) => {
      warning(res.message);
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
        type: "get serviceGroupManagement selectedPermission",
        selectedPermission: selectedRowKeys
      });
    },
    selectedRowKeys: selectedPermission,
  };

  return (
    <Drawer
      title="新建服务"
      closable
      maskClosable={false}
      placement="right"
      onClose={onClose}
      visible={addPermissionShow}
      width={495}
    >
    <Table scroll={{y: 702}} bordered rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={selectPermission}/>
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

export {
  AddPermission
};