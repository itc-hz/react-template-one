import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button, Input, message, Select, Spin } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';
import {UIGrid, UICol} from '@/baseUI/Grid';

const { Search } = Input;
const { Option } = Select;

// 引入本组件样式
import {
  CardWrapper,
  ListWrapper,
	RightCard,
	LeftCard,
  CardItem,
  CardItemHeader,
  CardItemContent,
} from "./ui";

// 引入图标
import {label} from '@/assert/img/itsmSystem';

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
    list: state.ServiceControl.list,
    count: state.ServiceControl.count,
    page: state.ServiceControl.page,
    limit: state.ServiceControl.limit,
    searchVal: state.ServiceControl.searchVal,
    loading: state.ServiceControl.loading,
    listLoading: state.ServiceControl.listLoading,
    moduleId: state.ServiceControl.moduleId,
    consoleData: state.ServiceControl.consoleData,
    levelSort: state.ServiceControl.levelSort,
    createTimeSort: state.ServiceControl.createTimeSort,
    showList: state.ServiceControl.showList,
  };
};

const ServiceControl: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const { list, count, page, limit, searchVal, loading, listLoading, moduleId, consoleData, levelSort, createTimeSort, showList } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  // Echarts数据源
  const [EchartsData, setEchartsData] = useState<any>([]);
  
  // 保存下拉框选中值，展示效果
  const [selectValue, setSelectValue] = useState<any>('');

  // 保存搜索框值，展示效果
  const [inputValue, setInputValue] = useState<any>('');
  
  useEffect(() => {
    dispatch({
      type: 'change serviceControl loading'
    });

    // 获取控制台数据
    _ITSMSystemServices.getConsoleData((res: any) => {
      dispatch({
        type: 'get serviceControl consoleData',
        consoleData: res.data
      });
      dispatch({
        type: 'change serviceControl loading'
      });
    }, (res: any) => {
      warning('获取控制台统计数据失败');
      dispatch({
        type: 'change serviceControl loading'
      });
    });
  }, [showList, dispatch]);

  useEffect(() => {
    if(consoleData && consoleData.list) {
      
      // 取出consoleData中我们要展示的数据，生成新数组作为echarts数据源
      setEchartsData([{
        name: '待我审核的问题' + ' ' + consoleData.list.question_not_audit,
        legendname: '问题',
        value: consoleData.list.question_not_audit == 0 ? null : consoleData.list.question_not_audit,
        itemStyle: {color: "#2D8FFE"}
      },
      {
        name: '待我分派的事件' + ' ' + consoleData.list.event_not_assign,
        legendname: '事件',
        value: consoleData.list.event_not_assign == 0 ? null : consoleData.list.event_not_assign,
        itemStyle: {color: "#FFCC4A"}
      },
      {
        name: '待我处理的工单' + ' ' + consoleData.list.work_order_not_audit,
        legendname: '工单',
        value: consoleData.list.work_order_not_audit == 0 ? null : consoleData.list.work_order_not_audit,
        itemStyle: {color: "#01C0AD"}
      },
      {
        name: '待我处理的变更' + ' ' + consoleData.list.change_not_audit,
        legendname: '变更',
        value: consoleData.list.change_not_audit == 0 ? null : consoleData.list.change_not_audit,
        itemStyle: {color: "#FF7723"}
      },
      {
        name: '待我审核的知识' + ' ' + consoleData.list.know_not_audit,
        legendname: '知识',
        value: consoleData.list.know_not_audit == 0 ? null : consoleData.list.know_not_audit,
        itemStyle: {color: "#9357F7"}
      }]);
    }
  }, [consoleData]);

  useEffect(() => {
    
    // 获取问题列表数据
    if (moduleId == 2) {
      dispatch({
        type: "change serviceControl listLoading"
      });
      _ITSMSystemServices.getQuestionList({page, pagesize: limit, name: searchVal, levelSort, createTimeSort}, (res: any) => {
        dispatch({
          type: "get serviceControl list",
          list: res.data.list,
          count: res.data.count
        });
        dispatch({
          type: "change serviceControl listLoading"
        });
      }, (res: any) => {
        warning("获取问题数据失败");
        dispatch({
          type: "change serviceControl listLoading"
        });
      });
    }

    // 获取事件列表数据
    if (moduleId == 3) {
      dispatch({
        type: "change serviceControl listLoading"
      });
      _ITSMSystemServices.getEventList({page, pagesize: limit, name: searchVal, levelSort, createTimeSort}, (res: any) => {
        dispatch({
          type: "get serviceControl list",
          list: res.data.list,
          count: res.data.count
        });
        dispatch({
          type: "change serviceControl listLoading"
        });
      }, (res: any) => {
        warning("获取事件数据失败");
        dispatch({
          type: "change serviceControl listLoading"
        });
      });
    }

    // 获取工单列表数据
    if (moduleId == 4) {
      dispatch({
        type: "change serviceControl listLoading"
      });
      _ITSMSystemServices.getWorkOrderList({page, pagesize: limit, name: searchVal, levelSort, createTimeSort}, (res: any) => {
        dispatch({
          type: "get serviceControl list",
          list: res.data.list,
          count: res.data.count
        });
        dispatch({
          type: "change serviceControl listLoading"
        });
      }, (res: any) => {
        warning("获取工单数据失败");
        dispatch({
          type: "change serviceControl listLoading"
        });
      });
    }

    // 获取变更列表数据
    if (moduleId == 5) {
      dispatch({
        type: "change serviceControl listLoading"
      });
      _ITSMSystemServices.getChangeList({page, pagesize: limit, name: searchVal, levelSort, createTimeSort}, (res: any) => {
        dispatch({
          type: "get serviceControl list",
          list: res.data.list,
          count: res.data.count
        });
        dispatch({
          type: "change serviceControl listLoading"
        });
      }, (res: any) => {
        warning("获取变更数据失败");
        dispatch({
          type: "change serviceControl listLoading"
        });
      });
    }
  }, [moduleId, searchVal, levelSort, createTimeSort, page, limit]);

  useEffect(() => {

    // 当从其他详情页面返回控制台列表页面的时候，同步传递回来的moduleId
    setSelectValue(moduleId);
  }, [moduleId]);

  useEffect(() => {

    // 当从其他详情页面返回控制台列表页面的时候，同步传递回来的searchVal
    setInputValue(searchVal);
  }, [searchVal]);

  useEffect(() => {
    
    // 如果EchartsData没有值，那么添加一个空闲状态进去，有值即可
    const flag = EchartsData.some((item: any) => {
      return item.value;
    });
    if (!flag) {
      EchartsData.push({
        name: '暂无待处理条目',
        legendname: '空闲',
        value: 1,
        itemStyle: {color: "#ccc"}
      });
      setEchartsData([...EchartsData]);
    }
  }, [EchartsData]);

  // 组件卸载时重置筛选条件
  useEffect(() => {
    return () => {
      dispatch({
        type: "change serviceControl moduleId",
        moduleId: '',
      });
      dispatch({
        type: "change serviceControl searchVal",
        searchVal: ""
      });
      dispatch({
        type: "change serviceControl showList",
        showList: false
      });

      // 重置搜索框值
      setInputValue(''); 

      dispatch({
        type: 'change serviceControl levelSort',
        levelSort: ''
      });
  
      dispatch({
        type: 'change serviceControl createTimeSort',
        createTimeSort: ''
      });
    };
  }, []);

  // 当页码改变时触发，将我们定义的page改变成当前被选中的page
  const onSizeChange = (page: number): void => {
    dispatch({
      type: "change serviceControl page",
      page: page
    });
  };

  // 修改分页器每页显示条数回调函数
  const onShowSizeChange = (current: any, pagesize: number) => {

    // 将我们定义的limit改变成当前被选中的pageSize
    dispatch({
      type: "change serviceControl limit",
      limit: pagesize
    });

    // 重置为第一页
    dispatch({
      type: "change serviceControl page",
      page: 1,
    });
  };

  // 搜索关键字
  const onSearch = (val: any) => {

    // 如果没有选中服务，终止操作
    if (!selectValue) return warning('请选择服务');

    // 传递搜索字段
    dispatch({
      type: "change serviceControl searchVal",
      searchVal: val || ""
    });

    // 同时传递选中的下拉框值
    dispatch({
      type: "change serviceControl moduleId",
      moduleId: selectValue
    });

    // 重置为第一页
    dispatch({
      type: "change serviceControl page",
      page: 1,
    });

    // 展示列表数据
    dispatch({
      type: "change serviceControl showList",
      showList: true
    });
  };

  // 选择服务下拉框
  const choiceModule = (val: any) => {
    
    // 同步保存，但不触发dispatch
    setSelectValue(val);
  };

  // echarts配置项
  const getOtion = () => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function(parms: any){
          const str = 
            parms.marker + "" + parms.data.legendname + "</br>" +
            "数量：" + parms.data.value + "</br>" +
            "占比：" + parms.percent + "%";
            return str;
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['50%', '42%'],
          data: EchartsData,
          label: {
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5
          },
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      ]
  };
  return option;
  };

  // 点击跳转事件管理页面
  const goEventPage = (type: any) => {

    // 遍历是否有问题权限
    const flag = consoleData.auth.some((item: any) => {
      return item.id == 3;
    });

    // 没有权限，阻止跳转
    if (!flag) return warning('当前用户无权限');

    props.history.push('/itsm/event/');

    // 展示我负责的，并且未指派条件下的事件
    if (type == 1) {
      dispatch({
        type: "change eventManagement tabsKey",
        tabsKey: '1',
      });
      dispatch({
        type: "change eventManagement status",
        status: 1,
      });
    }

    // 展示我创建的事件
    if (type == 2) {
      dispatch({
        type: "change eventManagement tabsKey",
        tabsKey: '2',
      });
    }

    // 展示我已分派的事件
    if (type == 3) {
      dispatch({
        type: "change eventManagement tabsKey",
        tabsKey: '1',
      });
      dispatch({
        type: "change eventManagement status",
        status: 2,
      });
    }
  };

  // 点击跳转工单管理页面
  const goWorkOrderPage = (type: any) => {

    // 遍历是否有问题权限
    const flag = consoleData.auth.some((item: any) => {
      return item.id == 4;
    });

    // 没有权限，阻止跳转
    if (!flag) return warning('当前用户无权限');

    props.history.push('/itsm/workorder/');

    // 展示指派给我的，并且未开始条件下的工单
    if (type == 1) {
      dispatch({
        type: "change workOrderManagement tabsKey",
        tabsKey: '1',
      });
      dispatch({
        type: "change workOrderManagement status",
        status: 1,
      });
    }

    // 展示我创建的工单
    if (type == 2) {
      dispatch({
        type: "change workOrderManagement tabsKey",
        tabsKey: '2',
      });
    }

    // 展示指派给我的，并且已完成条件下的工单
    if (type == 3) {
      dispatch({
        type: "change workOrderManagement tabsKey",
        tabsKey: '1',
      });
      dispatch({
        type: "change workOrderManagement status",
        status: 5,
      });
    }
  };

  // 点击跳转问题管理页面
  const goQuestionPage = (type: any) => {

    // 遍历是否有问题权限
    const flag = consoleData.auth.some((item: any) => {
      return item.id == 2;
    });

    // 没有权限，阻止跳转
    if (!flag) return warning('当前用户无权限');

    props.history.push('/itsm/question/');

    // 展示待我评审的问题
    if (type == 1) {
      dispatch({
        type: "change questionManagement tabsKey",
        tabsKey: '1',
      });
    }

    // 展示我创建的问题
    if (type == 2) {
      dispatch({
        type: "change questionManagement tabsKey",
        tabsKey: '2',
      });
    }

    // 展示我已审核的问题
    if (type == 3) {
      dispatch({
        type: "change questionManagement tabsKey",
        tabsKey: '3',
      });
    }
  };

  // 点击跳转变更管理页面
  const goChangePage = (type: any) => {

    // 遍历是否有问题权限
    const flag = consoleData.auth.some((item: any) => {
      return item.id == 5;
    });

    // 没有权限，阻止跳转
    if (!flag) return warning('当前用户无权限');

    props.history.push('/itsm/change/');

    // 展示指派给我的，并且未开始条件下的变更
    if (type == 1) {
      dispatch({
        type: "change changeManagement tabsKey",
        tabsKey: '1',
      });
      dispatch({
        type: "change changeManagement status",
        status: 1,
      });
    }

    // 展示我创建的变更
    if (type == 2) {
      dispatch({
        type: "change changeManagement tabsKey",
        tabsKey: '2',
      });
    }

    // 展示指派给我的，并且已完成条件下的变更
    if (type == 3) {
      dispatch({
        type: "change changeManagement tabsKey",
        tabsKey: '1',
      });
      dispatch({
        type: "change changeManagement status",
        status: 4,
      });
    }
  };

  // 点击重置按钮，返回数据统计页面，重置下拉框和搜索框
  const backReset = () => {
    dispatch({
      type: "change serviceControl showList",
      showList: false
    });

    // 重置下拉框
    setSelectValue('');
    dispatch({
      type: "change serviceControl searchVal",
      searchVal: ""
    });

    // 重置搜索框值
    setInputValue(''); 
  };

  // 同步搜索框输入值
  const changeSearchValue = (e: any) => {
    setInputValue(e.target.value);
  };

  // 进入当前问题详情
  const questionDetail = (record: any) => {
    dispatch({
      type: "get questionManagement detailId",
      detailId: record.id,
    });
    dispatch({
      type: "change serviceControl formControl",
      formControl: true,
      backModuleId: moduleId,
      backSearchVal: searchVal
    });
  };

  // 进入当前事件详情
  const eventDetail = (record: any) => {
    dispatch({
      type: "get eventManagement detailId",
      detailId: record.id,
    });
    dispatch({
      type: "change serviceControl formControl",
      formControl: true,
      backModuleId: moduleId,
      backSearchVal: searchVal
    });
  };

  // 进入当前工单详情
  const workOrderDetail = (record: any) => {
    dispatch({
      type: "get workOrderManagement detailId",
      detailId: record.id,
    });
    dispatch({
      type: "change serviceControl formControl",
      formControl: true,
      backModuleId: moduleId,
      backSearchVal: searchVal
    });
  };

  // 进入当前变更详情
  const changeDetail = (record: any) => {
    dispatch({
      type: "get changeManagement detailId",
      detailId: record.id,
    });
    dispatch({
      type: "change serviceControl formControl",
      formControl: true,
      backModuleId: moduleId,
      backSearchVal: searchVal
    });
  };

  // 问题-表格配置
  const question: any = [
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
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => {
        return <Link to='/itsm/question/detail' style={{color: "#2391FF"}} onClick={() => questionDetail(record)}>{record.name}</Link>;
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
    }
  ];

  // 事件-表格配置
  const event: any = [
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
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => {
        return <Link to='/itsm/event/detail' style={{color: "#2391FF"}} onClick={() => eventDetail(record)}>{record.name}</Link>;
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
    }
  ];

  // 工单-表格配置
  const workOrder: any = [
    {
      key: "id",
      title: "工单编号",
      align: "center",
      dataIndex: 'id'
    },
    {
      key: "name",
      title: '工单名称',
      align: "center",
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => {
        return <Link to='/itsm/workorder/detail' style={{color: "#2391FF"}} onClick={() => workOrderDetail(record)}>{record.name}</Link>;
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
      title: '指派给',
      align: "center",
      dataIndex: 'principalName',
    },
    {
      key: "categoryName",
      title: '工单分类',
      align: "center",
      dataIndex: 'categoryName',
    },
    {
      key: "level_text",
      title: '工单等级',
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
    }
  ];

  // 变更-表格配置
  const change: any = [
    {
      key: "id",
      title: "变更编号",
      align: "center",
      dataIndex: 'id'
    },
    {
      key: "name",
      title: '变更名称',
      align: "center",
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any, index: any) => {
        return <Link to='/itsm/change/detail' style={{color: "#2391FF"}} onClick={() => changeDetail(record)}>{record.name}</Link>;
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
      title: '指派给',
      align: "center",
      dataIndex: 'principalName',
    },
    {
      key: "categoryName",
      title: '变更分类',
      align: "center",
      dataIndex: 'categoryName',
    },
    {
      key: "level_text",
      title: '变更等级',
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
    }
  ];

  // 触发问题等级，创建时间排序
  const changeSorter = (pagination: any, filters: any, sorter: any, extra: any) => {

    // 根据点击的当前列，设置对应sort的值
    if (sorter.columnKey == "level_text") {
      dispatch({
        type: 'change serviceControl levelSort',
        levelSort: levelSort == 'asc' ? 'desc' : 'asc'
      });
    }

    if (sorter.columnKey == "create_time") {
      dispatch({
        type: 'change serviceControl createTimeSort',
        createTimeSort: createTimeSort == 'asc' ? 'desc' : 'asc'
      });
    }
  };

  // 根据当前选择的服务，动态渲染表格配置项
  const columns = () => {
    if (moduleId == 3) return event;
    if (moduleId == 4) return workOrder;
    if (moduleId == 5) return change;
    return question;
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>服务控制台</ShowListTitle>
        <ShowListOperateNoForm>
          {/* 服务 */}
          <Select style={{ width: 120, marginRight: 10 }} placeholder="服务" onChange={choiceModule} value={selectValue ? selectValue : undefined}>
            {
              consoleData && consoleData.auth && consoleData.auth.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.module}</Option>;
              })
            }
          </Select>
          {/* 搜索框 */}
          <Search allowClear onSearch={onSearch} onChange={changeSearchValue} placeholder="请输入关键词" style={{ width: 200, marginRight: 10}} value={inputValue} />
          {/* 取消按钮，返回数据页面 */}
          <Button type="primary" onClick={backReset}>重置</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      {showList ? <ListWrapper>
                    <Table onChange={changeSorter} pagination={false} columns={columns()} rowKey={(record: any): string => record.id} dataSource={list} loading={listLoading}/>
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
                  </ListWrapper>
                   : 
                  <CardWrapper>
                    <Spin spinning={loading}>
                      <UIGrid>
                        <UICol span={14}>
                          {/* 左侧卡片 */}
                          <LeftCard>
                            <CardItem>
                              <CardItemHeader className='header'>问题统计</CardItemHeader>
                              <CardItemContent onClick={() => goQuestionPage(1)}><img src={label}/>待我审核的问题<span>({consoleData.list && consoleData.list.question_not_audit})</span></CardItemContent>
                              <CardItemContent onClick={() => goQuestionPage(2)}><img src={label}/>我创建的问题<span>({consoleData.list && consoleData.list.question_create})</span></CardItemContent>
                              <CardItemContent onClick={() => goQuestionPage(3)}><img src={label}/>我已审核的问题<span>({consoleData.list && consoleData.list.question_end_audit})</span></CardItemContent>
                            </CardItem>
                            <CardItem>
                              <CardItemHeader className='header'>事件统计</CardItemHeader>
                              <CardItemContent onClick={() => goEventPage(1)}><img src={label}/>待我分派的事件<span>({consoleData.list && consoleData.list.event_not_assign})</span></CardItemContent>
                              <CardItemContent onClick={() => goEventPage(2)}><img src={label}/>我创建的事件<span>({consoleData.list && consoleData.list.event_create})</span></CardItemContent>
                              <CardItemContent onClick={() => goEventPage(3)}><img src={label}/>我已分派的事件<span>({consoleData.list && consoleData.list.event_end_assign})</span></CardItemContent>
                            </CardItem>
                            <CardItem>
                              <CardItemHeader className='header'>工单统计</CardItemHeader>
                              <CardItemContent onClick={() => goWorkOrderPage(1)}><img src={label}/>待我处理的工单<span>({consoleData.list && consoleData.list.work_order_not_audit})</span></CardItemContent>
                              <CardItemContent onClick={() => goWorkOrderPage(2)}><img src={label}/>我创建的工单<span>({consoleData.list && consoleData.list.work_order_create})</span></CardItemContent>
                              <CardItemContent onClick={() => goWorkOrderPage(3)}><img src={label}/>我已完成的工单<span>({consoleData.list && consoleData.list.work_order_end_audit})</span></CardItemContent>
                            </CardItem>
                            <CardItem>
                              <CardItemHeader className='header'>变更统计</CardItemHeader>
                              <CardItemContent onClick={() => goChangePage(1)}><img src={label}/>待我处理的变更<span>({consoleData.list && consoleData.list.change_not_audit})</span></CardItemContent>
                              <CardItemContent onClick={() => goChangePage(2)}><img src={label}/>我创建的变更<span>({consoleData.list && consoleData.list.change_create})</span></CardItemContent>
                              <CardItemContent onClick={() => goChangePage(3)}><img src={label}/>我已完成的变更<span>({consoleData.list && consoleData.list.change_end_audit})</span></CardItemContent>
                            </CardItem>
                          </LeftCard>
                        </UICol>
                        <UICol span={10}>
                          {/* 右侧卡片 */}
                          <RightCard>
                            <ReactEcharts option={getOtion()} style={{height: '100%', width: '100%'}} className='react_for_echarts' />
                          </RightCard>
                        </UICol>
                      </UIGrid>
                    </Spin>
                  </CardWrapper>}
    </ShowListWrapper>
  );
};

export default withRouter(ServiceControl);