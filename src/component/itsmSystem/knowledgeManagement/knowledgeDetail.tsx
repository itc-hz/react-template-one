import React, { useEffect, useState, Fragment } from 'react';
import { Button, message, Spin, Modal } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";

const { confirm } = Modal;

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListOperateNoForm, ShowListTitle} from "@/baseUI/BaseShowList";

// 引入公共栅格化组件
import {
  UIGrid,
  UICol
} from '@/baseUI/Grid';

// 引入本组件样式
import {ItemWrapper} from './ui';

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
    detailId: state.KnowledgeManagement.detailId,
    detailMsg: state.KnowledgeManagement.detailMsg,
  };
};

const KnowledgeDetail: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  // 控制各卡片加载中状态
  const [loading, setLoading] = useState(false);

  const { detailId, detailMsg } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    // 保存地址栏的id参数
    dispatch({
      type: "get knowledgeManagement detailId",
      detailId: props.match.params.id,
    });
    
    // 获取知识详情信息
    _ITSMSystemServices.getKnowMsg(props.match.params.id, (res: any) => {
      setLoading(false);
      dispatch({
        type: "get knowledgeManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  }, [dispatch]);

  // 点击更新知识
  const editKnowledge = (record: any) => {
    dispatch({
      type: "change knowledgeManagement editShow",
      editType: "edit",
      editId: detailId,
    });

    // 每次点击更新，先清除一次editForm，防止富文本更新器信息残留
    dispatch({
      type: "get knowledgeManagement editForm",
      editForm: {},
    });
  };

  // 点击删除知识
  const deleteKnowledge = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前知识？',
      onOk() {
        _ITSMSystemServices.deleteKnowledge({ids: [detailId]}, (res: any) => {
          success("删除成功");

          // 跳转回上一页
          props.history.push('/itsm/knowledge/list');
        }, (res: any) => {
          warning(res.message);
        }); 
      }
    });
  };

  // 审核知识
  const examineKnowledge = (status: any) => {
    const str = status == 2 ? '通过' : '拒绝';

    // 询问是否确定
    confirm({
      title: '警告',
      content: `确定审核${str}该知识？`,
      onOk() {
        _ITSMSystemServices.examineKnowledge(detailId, {status}, (res: any) => {
          success(`审核${str}成功`);
    
          // 跳转回上一页
          props.history.push('/itsm/knowledge/list');
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 设置相关文件名称格式
  const fileName = () => {
    if (detailMsg && detailMsg.file) {
      const newFile = detailMsg.file.split('/')[4];
      return newFile && newFile.substring(13);
    }
    return null;
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>知识详情</ShowListTitle>
        <ShowListOperateNoForm>
          {
            detailMsg && detailMsg.handle && detailMsg.handle.map((item: any, index: any) => {
              if (item == "audit") {
                return <Fragment key={index}>
                        <Button type= "primary" style={{margin: "0px 8px 0 8px"}} onClick={() => examineKnowledge(2)}>审核通过</Button>
                        <Button type= "primary" style={{margin: "0px 8px 0 8px"}} onClick={() => examineKnowledge(3)}>审核拒绝</Button>
                      </Fragment>;
              }
              if (item == "edit") {
                return <Button href='#/itsm/knowledge/list/editKnowledge' key={index} type= "primary" style={{margin: "0px 8px 0 8px", backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={editKnowledge}>更新</Button>;
              }
              return <Button key={index} type= "danger" style={{margin: "0px 8px 0 8px"}} onClick={deleteKnowledge}>删除</Button>;
            })
          }
          <Button type='primary' style={{marginLeft: 8}} href="#/itsm/knowledge/list">返回</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      <ItemWrapper>
        <Spin spinning={loading}>
          <UIGrid className='row'>
            <UICol span={3}>
              <div className='title'>知识名称：</div>
            </UICol>
            <UICol span={16}>
              <div className='content'>{detailMsg && detailMsg.name}</div>
            </UICol>
          </UIGrid>
          <UIGrid className='row'>
            <UICol span={3}>
              <div className='title'>知识代号：</div>
            </UICol>
            <UICol span={16}>
              <div className='content'>{detailMsg && detailMsg.id}</div>
            </UICol>
          </UIGrid>
          <UIGrid className='row'>
            <UICol span={3}>
              <div className='title'>所属分类：</div>
            </UICol>
            <UICol span={16}>
              <div className='content'>{detailMsg && detailMsg.categoryName}</div>
            </UICol>
          </UIGrid>
          <UIGrid className='row'>
            <UICol span={3}>
              <div className='title'>知识简介：</div>
            </UICol>
            <UICol span={16}>
              <div className='content'>{detailMsg && detailMsg.desc || "暂无"}</div>
            </UICol>
          </UIGrid>
          <UIGrid className='row'>
            <UICol span={3}>
              <div className='title'>相关文件：</div>
            </UICol>
            <UICol span={16}>
              <div className="content">
                {detailMsg && detailMsg.file && (
                  <a href={detailMsg.file}>{fileName()}</a>
                ) || "暂无"}
              </div>
            </UICol>
          </UIGrid>
          <UIGrid className='row'>
            <UICol span={3}>
              <div className='title'>知识详情：</div>
            </UICol>
            <UICol span={16}>
              <div className='content' dangerouslySetInnerHTML={{ __html: detailMsg && detailMsg.info}}></div>
            </UICol>
          </UIGrid>
        </Spin>
      </ItemWrapper>
    </ShowListWrapper>
  );
};

export {
  KnowledgeDetail
};