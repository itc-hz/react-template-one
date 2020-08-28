import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button, Input, message, Tabs, Select, Modal } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
import { Link } from "react-router-dom";

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListFooter, ShowListOperateNoForm, ShowListTitle} from "@/baseUI/BaseShowList";

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
    list: state.KnowledgeManagement.list,
    count: state.KnowledgeManagement.count,
    page: state.KnowledgeManagement.page,
    limit: state.KnowledgeManagement.limit,
    searchVal: state.KnowledgeManagement.searchVal,
    loading: state.KnowledgeManagement.loading,
    tabsKey: state.KnowledgeManagement.tabsKey,
    selectRowsID: state.KnowledgeManagement.selectRowsID,
    status: state.KnowledgeManagement.status,
    updateTimeSort: state.KnowledgeManagement.updateTimeSort,
    createTimeSort: state.KnowledgeManagement.createTimeSort,
    categoryId: state.KnowledgeManagement.categoryId,
  };
};

const KonwledgeList: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const { list, count, page, limit, searchVal, loading, tabsKey, selectRowsID, status, updateTimeSort, createTimeSort, categoryId } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "change knowledgeManagement loading"
    });

    // 获取知识列表
    _ITSMSystemServices.getKnowList({categoryId, type: tabsKey, status, name: searchVal, page, pagesize: limit, updateTimeSort, createTimeSort}, (res: any) => {
      dispatch({
        type: "get knowledgeManagement list",
        list: res.data.list,
        count: res.data.count
      });
      dispatch({
        type: "change knowledgeManagement loading"
      });
    }, (res: any) => {
      warning("获取知识数据失败，请返回知识库管理重新选择分类");
      dispatch({
        type: "change knowledgeManagement loading"
      });
    });
  }, [count, categoryId, page, limit, searchVal, tabsKey, status, updateTimeSort, createTimeSort, dispatch]);

  // 组件销毁重置筛选条件
  useEffect(() => {
    return () => {
      dispatch({
        type: "change knowledgeManagement status",
        status: '',
      });
      dispatch({
        type: "change knowledgeManagement searchVal",
        searchVal: ""
      });
      dispatch({
        type: "change knowledgeManagement page",
        page: 1
      });
      dispatch({
        type: "change knowledgeManagement limit",
        limit: 10
      });
      dispatch({
        type: "get knowledgeManagement selectRowsID",
        selectRowsID: []
      });
    };
  }, []);

  // 当页码改变时触发，将我们定义的page改变成当前被选中的page
  const onSizeChange = (page: number): void => {
    dispatch({
      type: "change knowledgeManagement page",
      page: page
    });
  };

  // 修改分页器每页显示条数回调函数
  const onShowSizeChange = (current: any, pagesize: number) => {

    // 将我们定义的limit改变成当前被选中的pageSize
    dispatch({
      type: "change knowledgeManagement limit",
      limit: pagesize
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement page",
      page: 1,
    });
  };

  // 表格选择框回调函数
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      
      // 点击选择框后，将当前行的id保存进数组中
      dispatch({
        type: "get knowledgeManagement selectRowsID",
        selectRowsID: selectedRowKeys
      });
    },
    selectedRowKeys: selectRowsID,

    // 当前行handle不包含delete的，禁止选中
    getCheckboxProps: (record: any) => {
      if (record.handle && record.handle.includes('delete')) {
        return { disabled: false};
      } 
      return { disabled: true};
    }
  };

  // 搜索关键字
  const onSearch = (val: any) => {

    // 传递搜索字段
    dispatch({
      type: "change knowledgeManagement searchVal",
      searchVal: val || ""
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement page",
      page: 1,
    });
  };

  // 切换选项卡
  const tabsChange = (key: any) => {
    dispatch({
      type: "change knowledgeManagement tabsKey",
      tabsKey: Number(key),
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement page",
      page: 1,
    });
  };

  // 选择知识状态
  const changeStatus = (val: any) => {
    dispatch({
      type: "change knowledgeManagement status",
      status: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement page",
      page: 1,
    });
  };

  // 点击新建知识
  const addKnowledge = () => {
    dispatch({
      type: "change knowledgeManagement editShow",
      editType: "add",
    });
    dispatch({
      type: "get knowledgeManagement editForm",
      editForm: {},
    });
  };

  // 删除知识
  const deleteKnowledge = (ids: any) => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前所选知识？',
      onOk() {
        _ITSMSystemServices.deleteKnowledge({ids}, (res: any) => {
          success("删除成功");
          dispatch({
            type: "get knowledgeManagement list",
            count: count - 1
          });

          // 如果当前是单个删除的话
          if (ids.length == 1) {

            // 清空selectRowsID中当前删除的id
            const newSelectRowsID = selectRowsID.slice();
            const indexArr: any[] = [];
            ids.forEach((item: any) => {
              indexArr.push(
                newSelectRowsID.findIndex((item1: any) => {
                  return item == item1;
                })
              );
            });

            // 根据索引删除
            indexArr.forEach((item2: any) => {
              newSelectRowsID.splice(item2, 1);
            });

            // 同步保存
            dispatch({
              type: "get knowledgeManagement selectRowsID",
              selectRowsID: newSelectRowsID
            });
            return;
          }

          // 清空选中项
          dispatch({
            type: "get knowledgeManagement selectRowsID",
            selectRowsID: []
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 点击更新知识
  const editKnowledge = (record: any) => {
    dispatch({
      type: "change knowledgeManagement editShow",
      editType: "edit",
      editId: record.id,
    });

    // 每次点击更新，先清除一次editForm，防止富文本更新器信息残留
    dispatch({
      type: "get knowledgeManagement editForm",
      editForm: {},
    });
  };

  // 表格行配置数据
  const columns: any = [
    {
      key: "id",
      title: "知识编号",
      align: "center",
      dataIndex: 'id'
    },
    {
      key: "name",
      title: '知识名称',
      align: "center",
      onCell: () => {  // 设置单元格超出宽度省略号显示
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }
        };
      },
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => {
        return <Link to={`/itsm/knowledge/list/detail/${record.id}`}>{record.name}</Link>;
      }
    },
    {
      key: "creatorName",
      title: '创建者',
      align: "center",
      dataIndex: 'creatorName'
    },
    {
      key: "auditorName",
      title: '审核人',
      align: "center",
      dataIndex: 'auditorName',
    },
    {
      key: "status_text",
      title: '状态',
      align: "center",
      dataIndex: 'status_text',
    },
    {
      key: "create_time",
      title: '创建时间',
      align: "center",
      dataIndex: 'create_time',
      sorter: true,
    },
    {
      key: "update_time",
      title: '更新时间',
      align: "center",
      dataIndex: 'update_time',
      sorter: true,
    },
    {
      key: "handle",
      title: '操作',
      align: "center",
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => (
        record.handle && record.handle.length > 0 ? record.handle.map((item: any, index: any) => {
          if (item == "audit") {
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px"}} href={`#/itsm/knowledge/list/detail/${record.id}`}>审核</Button>;
          }
          if (item == "edit") {
            return <Button href='#/itsm/knowledge/list/editKnowledge' key={index} type= "primary" style={{margin: "0px 8px 0 8px", backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => editKnowledge(record)}>更新</Button>;
          }
          return <Button key={index} type= "danger" disabled={selectRowsID.includes(record.id) ? false : true} style={{margin: "0px 8px 0 8px"}} onClick={() => deleteKnowledge([record.id])}>删除</Button>;
        }) : <span>-</span>
      )
    },
  ];

  // 点击表头时间，根据时间排序
  const changeSorter = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (sorter.columnKey == "update_time") {
      dispatch({
        type: 'change knowledgeManagement updateTimeSort',
        updateTimeSort: updateTimeSort == 'asc' ? 'desc' : 'asc'
      });
    }

    if (sorter.columnKey == "create_time") {
      dispatch({
        type: 'change knowledgeManagement createTimeSort',
        createTimeSort: createTimeSort == 'asc' ? 'desc' : 'asc'
      });
    }
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>知识管理</ShowListTitle>
        <ShowListOperateNoForm>
          {/* 知识状态 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="知识状态" onChange={changeStatus}>
            <Option value={1}>未审核</Option>
            <Option value={2}>审核通过</Option>
            <Option value={3}>审核拒绝</Option>
          </Select>
          {/* 搜索框 */}
          <Search 
          onBlur={(e: any) => {
            dispatch({
              type: "change knowledgeManagement searchVal",
              searchVal: e.target.value
            });
          }} allowClear onSearch={onSearch} placeholder="请输入关键词" style={{ width: 200, marginRight: 10}}/>
          {/* 新建知识 */}
          <Button href='#/itsm/knowledge/list/editKnowledge' style={{marginRight: 10}} type="primary" onClick={addKnowledge}>新建知识</Button>
          {/* 删除知识 */}
          <Button style={{marginRight: 10}} type= "danger" onClick={() => deleteKnowledge(selectRowsID)} disabled={selectRowsID.length > 0 ? false : true}>批量删除</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      {/* 选型卡列表区域 */}
      <Tabs tabBarStyle={{paddingLeft: 17, margin: 0}} defaultActiveKey="0" onChange={tabsChange}>
        <TabPane tab="全部" key="0">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
        <TabPane tab="我审核的" key="1">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
        <TabPane tab="我创建的" key="2">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
      </Tabs>
      {/* 分页区域 */}
      <ShowListFooter>
        <div>
          <Pagination
            showQuickJumper
            showSizeChanger
            current={page}
            pageSize={limit}
            onChange={onSizeChange}
            onShowSizeChange={onShowSizeChange}
            total={count}
          />
        </div>
      </ShowListFooter>
    </ShowListWrapper>
  );
};

export {
  KonwledgeList
};