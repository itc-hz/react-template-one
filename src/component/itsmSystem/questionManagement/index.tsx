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
import {EditQuestionForm} from "./editQuestion";
import {CloseQuestionForm} from "./closeQuestion";
import {ReviewQuestionForm} from "./reviewQuestion";

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
    list: state.QuestionManagement.list,
    count: state.QuestionManagement.count,
    page: state.QuestionManagement.page,
    limit: state.QuestionManagement.limit,
    searchVal: state.QuestionManagement.searchVal,
    loading: state.QuestionManagement.loading,
    tabsKey: state.QuestionManagement.tabsKey,
    selectRowsID: state.QuestionManagement.selectRowsID,
    level: state.QuestionManagement.level,
    status: state.QuestionManagement.status,
    category: state.QuestionManagement.category,
    categoryId: state.QuestionManagement.categoryId,
    person: state.QuestionManagement.person,
    personId: state.QuestionManagement.personId,
    levelSort: state.QuestionManagement.levelSort,
    createTimeSort: state.QuestionManagement.createTimeSort,
  };
};

const QuestionManagement: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const { list, count, page, limit, searchVal, loading, tabsKey, selectRowsID, level, status, categoryId, personId, category, person, levelSort, createTimeSort } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "change questionManagement loading"
    });

    // 获取问题列表
    _ITSMSystemServices.getQuestionList({page, pagesize: limit, type: tabsKey, categoryId, status, level, staff: personId, name: searchVal, levelSort, createTimeSort}, (res: any) => {
      dispatch({
        type: "get questionManagement list",
        list: res.data.list,
        count: res.data.count
      });
      dispatch({
        type: "change questionManagement loading"
      });
    }, (res: any) => {
      warning("获取问题数据失败");
      dispatch({
        type: "change questionManagement loading"
      });
    });
  }, [count, page, limit, searchVal, tabsKey, level, status, categoryId, personId, levelSort, createTimeSort, dispatch]);

  useEffect(() => {

    // 获取问题分类
    _ITSMSystemServices.getQuestionCategory((res: any) => {
      dispatch({
        type: "get questionManagement category",
        category: res.data
      });
    }, (res: any) => {
      warning("获取问题分类数据失败");
    });

    // 获取问题列表搜索人员
    _ITSMSystemServices.getQuestionSearchUser((res: any) => {
      dispatch({
        type: "get questionManagement person",
        person: res.data
      });
    }, (res: any) => {
      warning("获取问题列表搜索人员失败");
    });
  }, [dispatch]);

  // 组件卸载时重置所有问题筛选条件
  useEffect(() => {
    return () => {
      dispatch({
        type: "change questionManagement page",
        page: 1,
      });
      dispatch({
        type: "change questionManagement limit",
        limit: 10,
      });
      dispatch({
        type: "change questionManagement searchVal",
        searchVal: ""
      });
      dispatch({
        type: "change questionManagement level",
        level: '',
      });
      dispatch({
        type: "change questionManagement status",
        status: '',
      });
      dispatch({
        type: "change questionManagement categoryId",
        categoryId: '',
      });
      dispatch({
        type: "change questionManagement personId",
        personId: '',
      });
      dispatch({
        type: "change questionManagement tabsKey",
        tabsKey: '0',
      });
      dispatch({
        type: 'change questionManagement levelSort',
        levelSort: ''
      });
      dispatch({
        type: 'change questionManagement createTimeSort',
        createTimeSort: ''
      });
      dispatch({
        type: "get questionManagement selectRowsID",
        selectRowsID: []
      });
    };
  }, []);

  // 当页码改变时触发，将我们定义的page改变成当前被选中的page
  const onSizeChange = (page: number): void => {
    dispatch({
      type: "change questionManagement page",
      page: page
    });
  };

  // 修改分页器每页显示条数回调函数
  const onShowSizeChange = (current: any, pagesize: number) => {

    // 将我们定义的limit改变成当前被选中的pageSize
    dispatch({
      type: "change questionManagement limit",
      limit: pagesize
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 表格选择框回调函数
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      
      // 点击选择框后，将当前行的id保存进数组中
      dispatch({
        type: "get questionManagement selectRowsID",
        selectRowsID: selectedRowKeys
      });
    },
    selectedRowKeys: selectRowsID,
    getCheckboxProps: (record: any) => {
      if (record.handle && record.handle.includes('delete')) {
        return { disabled: false};
      } 
      return { disabled: true};
    }
  };

  // 搜索问题名称
  const onSearch = (val: any) => {

    // 传递搜索字段
    dispatch({
      type: "change questionManagement searchVal",
      searchVal: val || ""
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 切换选项卡
  const tabsChange = (key: any) => {
    dispatch({
      type: "change questionManagement tabsKey",
      tabsKey: key,
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 选择问题等级
  const changeLevel = (val: any) => {
    dispatch({
      type: "change questionManagement level",
      level: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 选择问题状态
  const changeStatus = (val: any) => {
    dispatch({
      type: "change questionManagement status",
      status: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 选择问题分类
  const changeCategory = (val: any) => {
    dispatch({
      type: "change questionManagement categoryId",
      categoryId: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 选择人员
  const changePerson = (val: any) => {
    dispatch({
      type: "change questionManagement personId",
      personId: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change questionManagement page",
      page: 1,
    });
  };

  // 点击分类设置
  const setCategory = () => {
    dispatch({
      type: "change questionManagement categorySetShow"
    });
  };

  // 点击新建问题
  const addQuestion = () => {
    dispatch({
      type: "change questionManagement editShow",
      editType: "add",
    });
    dispatch({
      type: "get questionManagement editForm",
      editForm: {},
    });
  };

  // 删除问题
  const deleteQuestion = (ids: any) => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前所选问题？',
      onOk() {
        _ITSMSystemServices.deleteQuestion({ids}, (res: any) => {
          success("删除成功");
          dispatch({
            type: "get questionManagement list",
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
              type: "get questionManagement selectRowsID",
              selectRowsID: newSelectRowsID
            });
            return;
          }

          // 清空选中项
          dispatch({
            type: "get questionManagement selectRowsID",
            selectRowsID: []
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 点击编辑问题
  const editQuestion = (record: any) => {
    dispatch({
      type: "change questionManagement editShow",
      editType: "edit",
      editId: record.id,
    });
  };

  // 点击关闭问题
  const closeQuestion = (record: any) => {
    dispatch({
      type: "change questionManagement closeShow",
      closeId: record.id
    });
  };

  // 点击评审问题
  const reviewQuestion = (record: any) => {
    dispatch({
      type: "change questionManagement reviewShow",
      reviewId: record.id
    });
  };

  // 表格行配置数据
  const columns: any = [
    {
      key: "id",
      title: "问题编号",
      align: "center",
      dataIndex: 'id'
    },
    {
      key: "name",
      title: '问题名称',
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
        return <Link to={`/itsm/question/detail/${record.id}`} style={{color: "#2391FF"}}>{record.name}</Link>;
      }
    },
    {
      key: "creatorName",
      title: '创建人',
      align: "center",
      dataIndex: 'creatorName'
    },
    {
      key: "principalName",
      title: '评审人',
      align: "center",
      dataIndex: 'principalName',
    },
    {
      key: "categoryName",
      title: '问题分类',
      align: "center",
      dataIndex: 'categoryName',
    },
    {
      key: "level_text",
      title: '问题等级',
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
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px", backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => reviewQuestion(record)}>评审</Button>;
          }
          if (item == "edit") {
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px"}} onClick={() => editQuestion(record)}>编辑</Button>;
          }
          if (item == "close") {
            return <Button key={index} type= "primary" style={{margin: "0px 8px 0 8px", backgroundColor: "#FF7B11", borderColor: "#FF7B11"}} onClick={() => closeQuestion(record)}>关闭</Button>;
          }
          return <Button key={index} type= "danger" disabled={selectRowsID.includes(record.id) ? false : true} style={{margin: "0px 8px 0 8px"}} onClick={() => deleteQuestion([record.id])}>删除</Button>;
        }) : <span>-</span>
      )
    },
  ];

  // 触发问题等级，创建时间排序
  const changeSorter = (pagination: any, filters: any, sorter: any, extra: any) => {

    // 根据点击的当前列，设置对应sort的值
    if (sorter.columnKey == "level_text") {
      dispatch({
        type: 'change questionManagement levelSort',
        levelSort: levelSort == 'asc' ? 'desc' : 'asc'
      });
    }

    if (sorter.columnKey == "create_time") {
      dispatch({
        type: 'change questionManagement createTimeSort',
        createTimeSort: createTimeSort == 'asc' ? 'desc' : 'asc'
      });
    }
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>问题管理</ShowListTitle>
        <ShowListOperateNoForm>
          {/* 问题分类，需要动态获取数据渲染 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="问题分类" onChange={changeCategory}>
            {
              category.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>;
              })
            }
          </Select>
          {/* 问题状态 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="问题状态" onChange={changeStatus}>
            <Option value={1}>未评审</Option>
            <Option value={2}>通过</Option>
            <Option value={3}>拒绝</Option>
            <Option value={4}>关闭</Option>
            <Option value={5}>暂放</Option>
            <Option value={6}>延期</Option>
          </Select>
          {/* 问题等级 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="问题等级" onChange={changeLevel}>
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
          {/* 新建问题 */}
          <Button style={{marginRight: 10}} type="primary" onClick={addQuestion}>新建问题</Button>
          {/* 删除问题 */}
          <Button type= "danger" onClick={() => deleteQuestion(selectRowsID)} disabled={selectRowsID.length > 0 ? false : true}>批量删除</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      {/* 选型卡列表区域 */}
      <Tabs tabBarStyle={{paddingLeft: 17, margin: 0}} activeKey={tabsKey} onChange={tabsChange}>
        <TabPane tab="全部" key="0">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
        <TabPane tab="待我评审的" key="1">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
        <TabPane tab="我创建的" key="2">
          <Table onChange={changeSorter} rowSelection={rowSelection} pagination={false} columns={columns} rowKey={(record: any): string => record.id} dataSource={list} loading={loading}/>
        </TabPane>
        <TabPane tab="我已评审的" key="3">
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
      {/* 新建编辑问题组件 */}
      <EditQuestionForm />
      {/* 关闭问题组件 */}
      <CloseQuestionForm />
      {/* 评审问题组件 */}
      <ReviewQuestionForm />
    </ShowListWrapper>
  );
};

export {
  QuestionManagement
};