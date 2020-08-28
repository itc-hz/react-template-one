import React, { useEffect, useState } from 'react';
import { Button, message, Spin, Modal } from 'antd';
import { useDispatch, useMappedState } from "redux-react-hook";
import { Link } from "react-router-dom";

const { confirm } = Modal;

// 引入公共样式
import {ShowListWrapper, ShowListHeader, ShowListOperateNoForm, ShowListTitle} from "@/baseUI/BaseShowList";

// 引入公共栅格化组件
import {
  UIGrid,
  UICol
} from '@/baseUI/Grid';

// 引入子组件
import {EditEventForm} from "./editEvent";
import {CloseEventForm} from "./closeEvent";
import {ReviewEventForm} from "./reviewEvent";

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
    detailId: state.EventManagement.detailId,
    detailMsg: state.EventManagement.detailMsg,
    formControl: state.ServiceControl.formControl,
    backModuleId: state.ServiceControl.backModuleId,
    backSearchVal: state.ServiceControl.backSearchVal,
  };
};

const EventDetail: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  // 控制各卡片加载中状态
  const [loading, setLoading] = useState(false);

  const { detailId, detailMsg, formControl, backModuleId, backSearchVal } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    // 保存地址栏携带的id
    dispatch({
      type: "get eventManagement detailId",
      detailId: props.match.params.id,
    });
    
    // 获取事件详情信息
    _ITSMSystemServices.getEventMsg(props.match.params.id, (res: any) => {
      setLoading(false);
      dispatch({
        type: "get eventManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  }, [dispatch]);

  // 点击指派事件
  const reviewEvent = () => {
    dispatch({
      type: "change eventManagement reviewShow",
      reviewId: detailId
    });
  };

  // 点击编辑事件
  const editEvent = () => {
    dispatch({
      type: "change eventManagement editShow",
      editType: "edit",
      editId: detailId,
    });
  };

  // 点击关闭事件
  const closeEvent = () => {
    dispatch({
      type: "change eventManagement closeShow",
      closeId: detailId
    });
  };

  // 点击删除事件
  const deleteEvent = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前事件？',
      onOk() {
        _ITSMSystemServices.deleteEvent({ids: [detailId]}, (res: any) => {
          success("删除成功");

          // 返回事件列表页面
          props.history.push('/itsm/event/');
        }, (res: any) => {
          warning(res.message);
        });
      }
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
    props.history.push('/itsm/event/');
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>事件详情</ShowListTitle>
        <ShowListOperateNoForm>
          {
            detailMsg && detailMsg.handle && detailMsg.handle.map((item: any, index: any) => {
              if (item == "review") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={reviewEvent}>指派</Button>;
              }
              if (item == "edit") {
                return <Button key={index} type= "primary" style={{marginRight: 10}} onClick={editEvent}>编辑</Button>;
              }
              if (item == "close") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#FF7B11", borderColor: "#FF7B11"}} onClick={closeEvent}>关闭</Button>;
              }
              return <Button key={index} type= "danger" style={{marginRight: 10}} onClick={deleteEvent}>删除</Button>;
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
                        <div className="title">事件编号：</div>
                        <div className="content">{detailMsg && detailMsg.id}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">事件分类：</div>
                        <div className="content">{detailMsg && detailMsg.categoryName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">事件来源：</div>
                        <div className="content">{detailMsg && detailMsg.source || '暂无'}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">创建人：</div>
                        <div className="content">{detailMsg && detailMsg.creatorName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">负责人：</div>
                        <div className="content">{detailMsg && detailMsg.principalName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">事件紧急程度：</div>
                        <div className="content">{detailMsg && detailMsg.level_text}</div>
                      </LeftTopCardItem>
                    </UICol>
                    <UICol span={10}>
                      <LeftTopCardItem>
                        <div className="title">事件状态：</div>
                        <div className="content">{detailMsg && detailMsg.status_text}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">指派给：</div>
                        <div className="content">{
                          detailMsg && detailMsg.relate_work_order ? detailMsg.relate_work_order.map((item: any, index: any) => {
                            if (index == detailMsg.relate_work_order.length - 1) return <span key={item.id}>{item.principalName}</span>;
                            return <span key={item.id}>{item.principalName}<span>，</span></span>;
                          }) : '暂无'
                        }</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">工单代号：</div>
                        <div className="content">{
                          detailMsg && detailMsg.relate_work_order ? detailMsg.relate_work_order.map((item: any, index: any) => {
                            if (index == detailMsg.relate_work_order.length - 1) return <span key={item.id}>{item.id}</span>;
                            return <span key={item.id}>{item.id}<span>，</span></span>;
                          }) : '暂无'
                        }</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">关联问题：</div>
                        <div className="content">{detailMsg && detailMsg.relate_question && detailMsg.relate_question.name ? <Link to={`/itsm/question/detail/${detailMsg.relate_question.id}`} style={{color: "#2391FF"}}>{detailMsg.relate_question.name}</Link> : "暂无"}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">关联工单：</div>
                        <div className="content">{
                          detailMsg && detailMsg.relate_work_order ? detailMsg.relate_work_order.map((item: any, index: any) => {
                            if (index == detailMsg.relate_work_order.length - 1) return <span key={item.id}><Link to={`/itsm/workorder/detail/${item.id}`} style={{color: "#2391FF"}}>{item.name}</Link></span>;
                            return <span key={item.id}><Link to={`/itsm/workorder/detail/${item.id}`} style={{color: "#2391FF"}}>{item.name}</Link><span>，</span></span>;
                          }) : '暂无'
                        }</div>
                      </LeftTopCardItem>
                    </UICol>
                  </UIGrid>
              </LeftTopCard>
            </Spin>
            <Spin spinning={loading}>
              {/* 左侧底部卡片 */}
              <LeftBottomCard style={{marginTop: 15}}>
                <CardTitle><i></i>事件详情</CardTitle>
                <LeftBottomCardScorll>
                  <LeftBottomCardItem>
                    <div className="title">事件名称：</div>
                    <div className="content">{detailMsg && detailMsg.name}</div>
                  </LeftBottomCardItem>
                  <LeftBottomCardItem>
                    <div className="title">事件描述：</div>
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
  EventDetail
};