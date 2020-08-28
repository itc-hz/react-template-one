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

// 引入子组件
import {CategorySetForm} from "./categorySet";
import {EditEventForm} from "./editEvent";
import {CloseEventForm} from "./closeEvent";
import {ReviewEventForm} from "./reviewEvent";

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
    list: state.EventManagement.list,
    count: state.EventManagement.count,
    page: state.EventManagement.page,
    limit: state.EventManagement.limit,
    searchVal: state.EventManagement.searchVal,
    loading: state.EventManagement.loading,
    tabsKey: state.EventManagement.tabsKey,
    selectRowsID: state.EventManagement.selectRowsID,
    level: state.EventManagement.level,
    status: state.EventManagement.status,
    category: state.EventManagement.category,
    categoryId: state.EventManagement.categoryId,
    person: state.EventManagement.person,
    personId: state.EventManagement.personId,
    levelSort: state.EventManagement.levelSort,
    createTimeSort: state.EventManagement.createTimeSort,
  };
};

const EventManagement: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const { list, count, page, limit, searchVal, loading, tabsKey, selectRowsID, level, status, categoryId, personId, category, person, levelSort, createTimeSort } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "change eventManagement loading"
    });

    // 获取事件列表
    _ITSMSystemServices.getEventList({page, pagesize: limit, type: tabsKey, categoryId, status, level, staff: personId, name: searchVal, levelSort, createTimeSort}, (res: any) => {
      dispatch({
        type: "get eventManagement list",
        list: res.data.list,
        count: res.data.count
      });
      dispatch({
        type: "change eventManagement loading"
      });
    }, (res: any) => {
      warning("获取事件数据失败");
      dispatch({
        type: "change eventManagement loading"
      });
    });
  }, [count, page, limit, searchVal, tabsKey, level, status, categoryId, personId, levelSort, createTimeSort]);

  useEffect(() => {

    // 获取事件分类
    _ITSMSystemServices.getEventCategory((res: any) => {
      dispatch({
        type: "get eventManagement category",
        category: res.data
      });
    }, (res: any) => {
      warning("获取事件分类数据失败");
    });

    // 获取事件搜索人员
    _ITSMSystemServices.getEventSearchUser((res: any) => {
      dispatch({
        type: "get eventManagement person",
        person: res.data
      });
    }, (res: any) => {
      warning("获取事件搜索人员数据失败");
    });
  }, [dispatch]);

  // 组件卸载时重置所有事件筛选条件
  useEffect(() => {
    return () => {
      dispatch({
        type: "change eventManagement page",
        page: 1,
      });
      dispatch({
        type: "change eventManagement limit",
        limit: 10,
      });
      dispatch({
        type: "change eventManagement searchVal",
        searchVal: ""
      });
      dispatch({
        type: "change eventManagement level",
        level: '',
      });
      dispatch({
        type: "change eventManagement status",
        status: '',
      });
      dispatch({
        type: "change eventManagement categoryId",
        categoryId: '',
      });
      dispatch({
        type: "change eventManagement personId",
        personId: '',
      });
      dispatch({
        type: "change eventManagement tabsKey",
        tabsKey: '0',
      });
      dispatch({
        type: 'change eventManagement levelSort',
        levelSort: ''
      });
      dispatch({
        type: 'change eventManagement createTimeSort',
        createTimeSort: ''
      });
      dispatch({
        type: "get eventManagement selectRowsID",
        selectRowsID: []
      });
    };
  }, []);

  // 当页码改变时触发，将我们定义的page改变成当前被选中的page
  const onSizeChange = (page: number): void => {
    dispatch({
      type: "change eventManagement page",
      page: page
    });
  };

  // 修改分页器每页显示条数回调函数
  const onShowSizeChange = (current: any, pagesize: number) => {

    // 将我们定义的limit改变成当前被选中的pageSize
    dispatch({
      type: "change eventManagement limit",
      limit: pagesize
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 表格选择框回调函数
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      
      // 点击选择框后，将当前行的id保存进数组中
      dispatch({
        type: "get eventManagement selectRowsID",
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
      type: "change eventManagement searchVal",
      searchVal: val || ""
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 切换选项卡
  const tabsChange = (key: any) => {
    dispatch({
      type: "change eventManagement tabsKey",
      tabsKey: key,
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 选择事件等级
  const changeLevel = (val: any) => {
    dispatch({
      type: "change eventManagement level",
      level: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 选择事件状态
  const changeStatus = (val: any) => {
    dispatch({
      type: "change eventManagement status",
      status: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 选择事件分类
  const changeCategory = (val: any) => {
    dispatch({
      type: "change eventManagement categoryId",
      categoryId: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 选择人员
  const changePerson = (val: any) => {
    dispatch({
      type: "change eventManagement personId",
      personId: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change eventManagement page",
      page: 1,
    });
  };

  // 点击分类设置
  const setCategory = () => {
    dispatch({
      type: "change eventManagement categorySetShow"
    });
  };

  // 点击新建事件
  const addEvent = () => {
    dispatch({
      type: "change eventManagement editShow",
      editType: "add",
    });
    dispatch({
      type: "get eventManagement editForm",
      editForm: {},
    });
  };

  // 删除事件
  const deleteEvent = (ids: any) => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前所选事件？',
      onOk() {
        _ITSMSystemServices.deleteEvent({ids}, (res: any) => {
          success("删除成功");
          dispatch({
            type: "get eventManagement list",
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
              type: "get eventManagement selectRowsID",
              selectRowsID: newSelectRowsID
            });
            return;
          }

          // 清空选中项
          dispatch({
            type: "get eventManagement selectRowsID",
            selectRowsID: []
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 点击编辑事件
  const editEvent = (record: any) => {
    dispatch({
      type: "change eventManagement editShow",
      editType: "edit",
      editId: record.id,
    });
  };

  // 点击关闭事件
  const closeEvent = (record: any) => {
    dispatch({
      type: "change eventManagement closeShow",
      closeId: record.id
    });
  };

  // 点击指派事件
  const reviewEvent = (record: any) => {
    dispatch({
      type: "change eventManagement reviewShow",
      reviewId: record.id
    });
  };

  // 表格行配置数据
  const columns: any = [
    {
      key: "id",
      title: "事件编号",
      align: "center",
      dataIndex: 'id'
    },
    {
      key: "name",
      title: '事件名称',
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
        return <Link to={`/itsm/event/detail/${record.id}`} style={{color: "#2391FF"}}>{record.name}</Link>;
      }
    },
    {
      key: "creatorName",
      title: '创建者',
      align: "center",
      dataIndex: 'creatorName'
    },
    {
      key: "principalName",
      title: '负责人',
      align: "center",
      dataIndex: 'principalName',
    },
    {
      key: "categoryName",
      title: '事件分类',
      align: "center",
      dataIndex: 'categoryName',
    },
    {
      key: "level_text",
      title: '事件等级',
      align: "center",
      dataIndex: 'level_text',
      sorter: true,
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
      key: "handle",
      title: '操作',
      align: "center",
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => (
        record.handle.length > 0 ? record.handle.map((item: any, index: any) => {
          if (item == "review") {
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px", backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => reviewEvent(record)}>指派</Button>;
          }
          if (item == "edit") {
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px"}} onClick={() => editEvent(record)}>编辑</Button>;
          }
          if (item == "close") {
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px", backgroundColor: "#FF7B11", borderColor: "#FF7B11"}} onClick={() => closeEvent(record)}>关闭</Button>;
          }
          return <Button key={index} type= "danger" disabled={selectRowsID.includes(record.id) ? false : true} style={{margin: "0px 8px 0 8px"}} onClick={() => deleteEvent([record.id])}>删除</Button>;
        }) : <span>-</span>
      )
    },
  ];

  // 触发事件等级，创建时间排序
  const changeSorter = (pagination: any, filters: any, sorter: any, extra: any) => {

    // 根据点击的当前列，设置对应sort的值
    if (sorter.columnKey == "level_text") {
      dispatch({
        type: 'change eventManagement levelSort',
        levelSort: levelSort == 'asc' ? 'desc' : 'asc'
      });
    }

    if (sorter.columnKey == "create_time") {
      dispatch({
        type: 'change eventManagement createTimeSort',
        createTimeSort: createTimeSort == 'asc' ? 'desc' : 'asc'
      });
    }
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>事件管理</ShowListTitle>
        <ShowListOperateNoForm>
          {/* 事件分类 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="事件分类" onChange={changeCategory}>
            {
              category.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>;
              })
            }
          </Select>
          {/* 事件状态 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="事件状态" onChange={changeStatus} value={status ? status : undefined}>
            <Option value={1}>未指派</Option>
            <Option value={2}>已派出</Option>
            <Option value={3}>已关闭</Option>
            <Option value={4}>延期</Option>
          </Select>
          {/* 事件等级 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="事件等级" onChange={changeLevel}>
            <Option value={1}>紧急</Option>
            <Option value={2}>高</Option>
            <Option value={3}>中等</Option>
            <Option value={4}>低</Option>
          </Select>
          {/* 人员 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="人员" onChange={changePerson}>
            {
              person.map((item: any) => {
                return <Option key={item.uid} value={item.uid}>{item.displayname}</Option>;
              })
            }
          </Select>
          {/* 搜索框 */}
          <Search allowClear onSearch={onSearch} placeholder="请输入关键词" style={{ width: 200, marginRight: 10}}/>
          {/* 分类设置 */}
          <Button style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} type="primary" onClick={setCategory}>分类设置</Button>
          {/* 新建事件 */}
          <Button style={{marginRight: 10}} type="primary" onClick={addEvent}>新建事件</Button>
          {/* 删除事件 */}
          <Button type= "danger" onClick={() => deleteEvent(selectRowsID)} disabled={selectRowsID.length > 0 ? false : true}>批量删除</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      {/* 选型卡列表区域 */}
      <Tabs tabBarStyle={{paddingLeft: 17, margin: 0}} activeKey={tabsKey} onChange={tabsChange}>
        <TabPane tab="全部" key="0">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
        <TabPane tab="我负责" key="1">
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
      {/* 分类设置组件 */}
      <CategorySetForm />
      {/* 新建编辑事件组件 */}
      <EditEventForm />
      {/* 关闭事件组件 */}
      <CloseEventForm />
      {/* 指派事件组件 */}
      <ReviewEventForm />
    </ShowListWrapper>
  );
};

export {
  EventManagement
};