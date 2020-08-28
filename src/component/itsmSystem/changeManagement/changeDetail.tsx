import React, { useEffect, useState } from 'react';
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

// 引入子组件
import {EditChangeForm} from "./editChange";
import {CloseChangeForm} from "./closeChange";
import {ReviewChangeForm} from "./reviewChange";

// 引入本组件样式
import {
  CardWrapper,
  LeftTopCard,
  LeftBottomCard,
  RightCard,
  CardTitle,
  LeftTopCardItem,
  LeftBottomCardItem,
  LeftBottomCardScorll,
  RightCardItem,
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
    detailId: state.ChangeManagement.detailId,
    detailMsg: state.ChangeManagement.detailMsg,
    formControl: state.ServiceControl.formControl,
    backModuleId: state.ServiceControl.backModuleId,
    backSearchVal: state.ServiceControl.backSearchVal,
  };
};

const ChangeDetail: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  // 控制各卡片加载中状态
  const [loading, setLoading] = useState(false);

  const { detailId, detailMsg, formControl, backModuleId, backSearchVal } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    // 保存地址栏携带的id
    dispatch({
      type: "get changeManagement detailId",
      detailId: props.match.params.id,
    });
    
    // 获取变更详情信息
    _ITSMSystemServices.getChangeMsg(props.match.params.id, (res: any) => {
      setLoading(false);
      dispatch({
        type: "get changeManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  }, [dispatch]);

  // 点击编辑变更
  const editChange = () => {
    dispatch({
      type: "change changeManagement editShow",
      editType: "edit",
      editId: detailId,
    });
  };

  // 点击删除变更
  const deleteChange = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前变更？',
      onOk() {
        _ITSMSystemServices.deleteChange({ids: [detailId]}, (res: any) => {
          success("删除成功");

          // 返回变更列表页面
          props.history.push('/itsm/change/');
        }, (res: any) => {
          warning(res.message);
        });
      }
    });
  };

  // 点击关闭变更
  const closeChange = (record: any) => {
    dispatch({
      type: "change changeManagement closeShow",
      closeId: detailId
    });
  };

  // 开始，暂停，完成，验收，统一根据不同类型分别处理
  const reviewChange = (type: any) => {
    dispatch({
      type: "change changeManagement reviewShow",
      reviewId: detailId,
      reviewType: type,
    });
  };

  // 设置相关文件名称格式
  const fileName = () => {
    if (detailMsg && detailMsg.file) {
      const name = detailMsg.file.split('/');
      return name[2].substring(13);
    }
    return null;
  };

  // 点击返回
  const goBack = () => {

    // 如果当前是从服务控制台进入的详情页，则返回控制台列表页，并且携带控制台搜索数据
    if (formControl) {
      props.history.push('/itsm/control/');

      // 置反标志
      dispatch({
        type: "change serviceControl formControl",
        formControl: false,
        backModuleId: backModuleId,
        backSearchVal: backSearchVal
      });

      // 展示列表数据
      dispatch({
        type: "change serviceControl showList",
        showList: true
      });

      // 传递筛选数据
      dispatch({
        type: "change serviceControl searchVal",
        searchVal: backSearchVal
      });
      dispatch({
        type: "change serviceControl moduleId",
        moduleId: backModuleId
      });
      return;
    }

    // 正常情况下返回管理页
    props.history.push('/itsm/change/');
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>变更详情</ShowListTitle>
        <ShowListOperateNoForm>
          {
            detailMsg && detailMsg.handle && detailMsg.handle.map((item: any, index: any) => {
              if (item == "start") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => reviewChange(1)}>开始</Button>;
              }
              if (item == "stop") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => reviewChange(2)}>暂停</Button>;
              }
              if (item == "finish") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => reviewChange(3)}>完成</Button>;
              }
              if (item == "accept") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={() => reviewChange(4)}>验收</Button>;
              }
              if (item == "edit") {
                return <Button key={index} type= "primary" style={{marginRight: 10}} onClick={editChange}>编辑</Button>;
              }
              if (item == "close") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#FF7B11", borderColor: "#FF7B11"}} onClick={closeChange}>关闭</Button>;
              }
              return <Button key={index} type= "danger" style={{marginRight: 10}} onClick={deleteChange}>删除</Button>;
            })
          }
          <Button type='primary' onClick={goBack}>返回</Button>
        </ShowListOperateNoForm>
      </ShowListHeader>
      {/* 卡片区域 */}
      <CardWrapper>
        <UIGrid>
          <UICol span={16}>
            <Spin spinning={loading}>
              {/* 左侧顶部卡片 */}
              <LeftTopCard>
                <CardTitle><i></i>基本信息</CardTitle>
                  <UIGrid>
                    <UICol span={10}>
                      <LeftTopCardItem>
                        <div className="title">变更编号：</div>
                        <div className="content">{detailMsg && detailMsg.id}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">变更分类：</div>
                        <div className="content">{detailMsg && detailMsg.categoryName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">变更来源：</div>
                        <div className="content">{detailMsg && detailMsg.source || '暂无'}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">创建人：</div>
                        <div className="content">{detailMsg && detailMsg.creatorName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">指派给：</div>
                        <div className="content">{detailMsg && detailMsg.principalName}</div>
                      </LeftTopCardItem>
                    </UICol>
                    <UICol span={10}>
                      <LeftTopCardItem>
                        <div className="title">变更紧急程度：</div>
                        <div className="content">{detailMsg && detailMsg.level_text}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">变更状态：</div>
                        <div className="content">{detailMsg && detailMsg.status_text}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">期望开始时间：</div>
                        <div className="content">{detailMsg && detailMsg.expect_start_time}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">期望结束时间：</div>
                        <div className="content">{detailMsg && detailMsg.expect_end_time}</div>
                      </LeftTopCardItem>
                    </UICol>
                  </UIGrid>
              </LeftTopCard>
            </Spin>
            <Spin spinning={loading}>
              {/* 左侧底部卡片 */}
              <LeftBottomCard style={{marginTop: 15}}>
                <CardTitle><i></i>变更详情</CardTitle>
                <LeftBottomCardScorll>
                  <LeftBottomCardItem>
                    <div className="title">变更名称：</div>
                    <div className="content">{detailMsg && detailMsg.name}</div>
                  </LeftBottomCardItem>
                  <LeftBottomCardItem>
                    <div className="title">变更描述：</div>
                    <div className="content">{detailMsg && detailMsg.desc || '暂无'}</div>
                  </LeftBottomCardItem>
                  <LeftBottomCardItem>
                    <div className="title">相关文件：</div>
                    <div className="content">
                      {detailMsg && detailMsg.file && (
                        <a href={'/meetingcloud/remote.php/webdav/' + detailMsg.file}>{fileName()}</a>
                      ) || "暂无"}
                    </div>
                  </LeftBottomCardItem>
                  {detailMsg && detailMsg.status_log && detailMsg.status_log.map((item: any, index: any) => {
                    return (
                      <LeftBottomCardItem key={index}>
                        <div className="title">{item.status_text + "："}</div>
                        <div className="content">{item.remark}</div>
                      </LeftBottomCardItem>
                    );
                  })}
                </LeftBottomCardScorll>
              </LeftBottomCard>
            </Spin>
          </UICol>
          <UICol span={8}>
            <Spin spinning={loading}>
              {/* 右侧卡片 */}
              <RightCard style={{marginLeft: 15}}>
                <CardTitle><i></i>操作记录</CardTitle>
                {
                  detailMsg && detailMsg.log ? detailMsg.log.map((item: any, index: any) => {
                    return (<RightCardItem key={index}>
                              <UICol span={3}>
                                <div className='order'>{index + 1}</div>
                              </UICol>
                              <UICol span={6}>
                                <div className='time'>{item.timestamp}</div>
                              </UICol>
                              <UICol span={15}>
                                <div className='text'>{item.log}</div>
                              </UICol>
                            </RightCardItem>);
                  }) : null
                }
              </RightCard>
            </Spin>
          </UICol>
        </UIGrid>
      </CardWrapper>
      {/* 新建编辑变更组件 */}
      <EditChangeForm />
      {/* 关闭变更组件 */}
      <CloseChangeForm />
      {/* 开始，暂停，完成，验收，关闭变更组件 */}
      <ReviewChangeForm />
    </ShowListWrapper>
  );
};

export {
  ChangeDetail
};