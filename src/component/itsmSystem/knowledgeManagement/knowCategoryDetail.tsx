import React, { useEffect, useState } from 'react';
import { Drawer, Button, message, Row, Col } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

// 引入默认图片
import {DefaultImg} from "@/assert/img/index";

// 引入store数据集合
import { IState } from "@/store";

// 定义从store中取出的数据
const mapState = (state: IState) => {
  return {
    categoryDetailShow: state.KnowledgeManagement.categoryDetailShow,
    categoryDetailId: state.KnowledgeManagement.categoryDetailId,
    categoryDetailForm: state.KnowledgeManagement.categoryDetailForm,
  };
};

import {ITSMSystemServices} from "@/services/itsmSystemServices";

// 定义请求失败提示
const warning = (msg: string) => {
  message.warning(msg);
};

// 定义请求成功提示
const success = (msg: string) => {
  message.success(msg);
};

const KnowCategoryDetail: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const dispatch = useDispatch();

  const {categoryDetailShow, categoryDetailId, categoryDetailForm } = useMappedState(mapState);
  
  useEffect(() => {
    if (categoryDetailId) {

      // 获取知识库分类详情信息
      _ITSMSystemServices.getKnowCategoryMsg(categoryDetailId, (res: any) => {
        dispatch({
          type: "get knowledgeManagement categoryDetailForm",
          categoryDetailForm: res.data,
        });
      }, (res: any) => {
        warning(res.message);
      });
    }
  }, [categoryDetailId]);

  const onClose = () => {
    dispatch({
      type: "change knowledgeManagement categoryDetailShow"
    });
  };

  // 点击进入编辑组件
  const editKnowCategory = () => {
    dispatch({
      type: "change knowledgeManagement categoryDetailShow"
    });

    // 展示编辑组件
    dispatch({
      type: "change knowledgeManagement categoryEditShow",
      categoryEditType: "edit",
      categoryEditId: categoryDetailId,
    });
  };

  return (
    <Drawer
      title={'分类详情'}
      placement="right"
      closable
      maskClosable={false}
      onClose={onClose}
      visible={categoryDetailShow}
      width={500}
    >
      <Row style={{marginBottom: "34px"}} >
          <Col span={6} style={{display: 'flex', justifyContent: 'flex-end'}}>分类名称：</Col>
          <Col span={18} style={{paddingLeft: 20}}>{categoryDetailForm && categoryDetailForm.name}</Col>
        </Row>
        <Row style={{marginBottom: "34px"}} >
          <Col span={6} style={{display: 'flex', justifyContent: 'flex-end'}}>图标：</Col>
          <Col span={18} style={{paddingLeft: 20}}><img style={{width: 100, height: 100}} src={categoryDetailForm && categoryDetailForm.icon || DefaultImg} /></Col>
        </Row>
        <Row style={{marginBottom: "34px"}} >
          <Col span={6} style={{display: 'flex', justifyContent: 'flex-end'}}>审核人：</Col>
          <Col span={18} style={{paddingLeft: 20}}>{categoryDetailForm && categoryDetailForm.auditorName}</Col>
        </Row>
        <Row style={{marginBottom: "34px"}} >
          <Col span={6} style={{display: 'flex', justifyContent: 'flex-end'}}>分类描述：</Col>
          <Col span={18} style={{paddingLeft: 20}}>{categoryDetailForm && categoryDetailForm.desc}</Col>
        </Row>
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
      <Button onClick={editKnowCategory} type="primary" style={{ marginRight: 12 }} >
        编辑
      </Button>
      <Button onClick={onClose} type="primary" style={{backgroundColor: "rgba(113,126,132,1)", borderColor: "rgba(113,126,132,1)"}} >
        取消
      </Button>
    </div>
  </Drawer>
  );
};

export {
  KnowCategoryDetail
};