import React, { useEffect, useState } from 'react';
import { Pagination, Button, Input, message, Select, Modal, Spin, Empty } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
import { useHistory } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

// 引入子组件
import {EditKnowCategoryForm} from "./editKnowCategory";
import {KnowCategoryDetail} from "./knowCategoryDetail";

// 引入默认图片
import {DefaultImg} from "@/assert/img/index";

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListFooter, ShowListOperateNoForm, ShowListTitle} from "@/baseUI/BaseShowList";

// 引入本组件样式
import {ContentWrapper, CardList, CardListItem, CardItemTop, CardItemBottom, CardItemImg, CardItemText } from "./ui";

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
    categoryList: state.KnowledgeManagement.categoryList,
    categoryCount: state.KnowledgeManagement.categoryCount,
    categoryPage: state.KnowledgeManagement.categoryPage,
    categoryLimit: state.KnowledgeManagement.categoryLimit,
    categorySearchVal: state.KnowledgeManagement.categorySearchVal,
    categoryLoading: state.KnowledgeManagement.categoryLoading,
    categoryPerson: state.KnowledgeManagement.categoryPerson,
    categoryPersonId: state.KnowledgeManagement.categoryPersonId,
  };
};

const KnowledgeManagement: React.ComponentType = (props: any) => {
  const history = useHistory();

  const _ITSMSystemServices = new ITSMSystemServices();

  const { categoryList, categoryCount, categoryPage, categoryLimit, categorySearchVal, categoryLoading, categoryPersonId, categoryPerson } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "change knowledgeManagement categoryLoading"
    });

    // 获取知识库分类
    _ITSMSystemServices.getKnowCategory({page: categoryPage, pagesize: categoryLimit, name: categorySearchVal, staff: categoryPersonId}, (res: any) => {
      dispatch({
        type: "get knowledgeManagement categoryList",
        categoryList: res.data.list,
        categoryCount: res.data.count
      });
      dispatch({
        type: "change knowledgeManagement categoryLoading"
      });
    }, (res: any) => {
      warning("获取知识库分类数据失败");
      dispatch({
        type: "change knowledgeManagement categoryLoading"
      });
    });
  }, [categoryCount, categoryPage, categoryLimit, categorySearchVal, categoryPersonId, dispatch]);

  useEffect(() => {

    // 获取知识库人员
    _ITSMSystemServices.getKnowUser((res: any) => {
      dispatch({
        type: "get knowledgeManagement categoryPerson",
        categoryPerson: res.data
      });
    }, (res: any) => {
      warning("获取变更处理人员数据失败");
    });
  }, [dispatch]);

  // 组件销毁重置筛选条件
  useEffect(() => {
    return () => {
      dispatch({
        type: "change knowledgeManagement categoryPersonId",
        categoryPersonId: '',
      });
      dispatch({
        type: "change knowledgeManagement categorySearchVal",
        categorySearchVal: ""
      });
      dispatch({
        type: "change knowledgeManagement categoryPage",
        categoryPage: 1
      });
      dispatch({
        type: "change knowledgeManagement categoryLimit",
        categoryLimit: 12
      });
    };
  }, []);

  // 当页码改变时触发，将我们定义的page改变成当前被选中的page
  const onSizeChange = (page: number): void => {
    dispatch({
      type: "change knowledgeManagement categoryPage",
      categoryPage: page
    });
  };

  // 修改分页器每页显示条数回调函数
  const onShowSizeChange = (current: any, pagesize: number) => {

    // 将我们定义的limit改变成当前被选中的pageSize
    dispatch({
      type: "change knowledgeManagement categoryLimit",
      categoryLimit: pagesize
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement categoryPage",
      categoryPage: 1,
    });
  };

  // 搜索关键字
  const onSearch = (val: any) => {

    // 传递搜索字段
    dispatch({
      type: "change knowledgeManagement categorySearchVal",
      categorySearchVal: val || ""
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement categoryPage",
      categoryPage: 1,
    });
  };

  // 选择人员
  const changePerson = (val: any) => {
    dispatch({
      type: "change knowledgeManagement categoryPersonId",
      categoryPersonId: val || '',
    });

    // 重置为第一页
    dispatch({
      type: "change knowledgeManagement categoryPage",
      categoryPage: 1,
    });
  };

  // 删除知识库分类
  const deleteKnowCategory = (id: any, e: any) => {

    // 阻止冒泡
    e.stopPropagation();

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前所选分类？',
      onOk() {
        _ITSMSystemServices.deleteKnowCategory(id, (res: any) => {
          success("删除成功");
          dispatch({
            type: "get knowledgeManagement categoryList",
            categoryCount: categoryCount - 1
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 重置知识库分类
  const resetKnowCategory = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否重置默认分类？',
      onOk() {
        _ITSMSystemServices.resetKnowCategory((res: any) => {
          success("重置成功");
          dispatch({
            type: "get knowledgeManagement categoryList",
            categoryList: res.data.list
          });
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 点击新建分类
  const addKnowCategory = () => {
    dispatch({
      type: "change knowledgeManagement categoryEditShow",
      categoryEditType: "add",
    });
    dispatch({
      type: "get knowledgeManagement categoryEditForm",
      categoryEditForm: {},
    });
  };

  // 点击编辑分类
  const editKnowCategory = (id: any, e: any) => {

    // 阻止冒泡
    e.stopPropagation();
    dispatch({
      type: "change knowledgeManagement categoryEditShow",
      categoryEditType: "edit",
      categoryEditId: id,
    });
  };

  // 点击展示分类详情
  const showKnowCategoryDetail = (id: any, e: any) => {

    // 阻止冒泡
    e.stopPropagation();
    dispatch({
      type: "change knowledgeManagement categoryDetailShow",
      categoryDetailId: id,
    });
  };

  // 点击进入对应分类列表页
  const goToListPage = function(id: any) {
    history.push('/itsm/knowledge/list/');

    // 传递分类id
    dispatch({
      type: "get knowledgeManagement categoryId",
      categoryId: id,
    });
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>知识库管理</ShowListTitle>
        <ShowListOperateNoForm>
          {/* 人员 */}
          <Select allowClear style={{ width: 120, marginRight: 10 }} placeholder="人员" onChange={changePerson}>
            {
              categoryPerson.map((item: any) => {
                return <Option key={item.uid} value={item.uid}>{item.displayname}</Option>;
              })
            }
          </Select>
          {/* 搜索框 */}
          <Search allowClear onSearch={onSearch} placeholder="请输入关键词" style={{ width: 200, marginRight: 10}}/>
          {/* 新建分类 */}
          <Button style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} type="primary" onClick={addKnowCategory}>新建分类</Button>
          {/* 重置分类 */}
          <Button type="primary" onClick={resetKnowCategory}>重置分类</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      {/* 分类卡片区域 */}
      <ContentWrapper>
        <CardList>
          {categoryLoading ? <div className="loading"><Spin /></div> :
          (categoryList && categoryList.length > 0 ? categoryList.map((item: any, index: any) => {
            return (<CardListItem key={item.id} onClick={() => goToListPage(item.id)}>
                      {/* 卡片上部 */}
                      <CardItemTop>
                        <CardItemImg src={item.icon || DefaultImg}/>
                        <CardItemText>{item.name}</CardItemText>
                      </CardItemTop>
                      {/* 卡片下部 */}
                      <CardItemBottom>
                        <Button style={{marginRight: 10, background: 'rgba(21,192,169,1)', borderColor: 'rgba(21,192,169,1)'}} type="primary" onClick={(e: any) => showKnowCategoryDetail(item.id, e)}>详情</Button>
                        <Button style={{marginRight: 10, background: 'rgba(35,146,255,1)', borderColor: 'rgba(35,146,255,1)'}} type="primary" onClick={(e: any) => editKnowCategory(item.id, e)}>编辑</Button>
                        <Button type="danger" onClick={(e: any) => deleteKnowCategory(item.id, e)}>删除</Button>
                      </CardItemBottom>
                    </CardListItem>);
          }) : <Empty style={{margin: "32px auto"}} image={Empty.PRESENTED_IMAGE_SIMPLE} />)}
        </CardList>
      </ContentWrapper>
      {/* 分页区域 */}
      <ShowListFooter>
        <div>
          <Pagination
            showQuickJumper
            showSizeChanger
            pageSizeOptions={["8", "12"]}
            current={categoryPage}
            pageSize={categoryLimit}
            onChange={onSizeChange}
            onShowSizeChange={onShowSizeChange}
            total={categoryCount}
          />
        </div>
      </ShowListFooter>
      {/* 新建，编辑分类组件 */}
      <EditKnowCategoryForm />
      {/* 分类详情组件 */}
      <KnowCategoryDetail />
    </ShowListWrapper>
  );
};

export {
  KnowledgeManagement
};