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
import {EditQuestionForm} from "./editQuestion";
import {CloseQuestionForm} from "./closeQuestion";
import {ReviewQuestionForm} from "./reviewQuestion";

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
    detailId: state.QuestionManagement.detailId,
    detailMsg: state.QuestionManagement.detailMsg,
    formControl: state.ServiceControl.formControl,
    backModuleId: state.ServiceControl.backModuleId,
    backSearchVal: state.ServiceControl.backSearchVal,
  };
};

const QuestionDetail: React.ComponentType = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();
  
  // 控制各卡片加载中状态
  const [loading, setLoading] = useState(false);

  const { detailId, detailMsg, formControl, backModuleId, backSearchVal } = useMappedState(mapState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    // 保存地址栏携带的id
    dispatch({
      type: "get questionManagement detailId",
      detailId: props.match.params.id
    });
    
    // 获取地址栏携带的当前问题id，获取问题详情信息
    _ITSMSystemServices.getQuestionMsg(props.match.params.id, (res: any) => {
      setLoading(false);
      dispatch({
        type: "get questionManagement detailMsg",
        detailMsg: res.data,
      });
    }, (res: any) => {
      warning(res.message);
    });
  }, [dispatch]);

  // 点击评审问题
  const reviewQuestion = () => {
    dispatch({
      type: "change questionManagement reviewShow",
      reviewId: detailId
    });
  };

  // 点击编辑问题
  const editQuestion = () => {
    dispatch({
      type: "change questionManagement editShow",
      editType: "edit",
      editId: detailId,
    });
  };

  // 点击关闭问题
  const closeQuestion = () => {
    dispatch({
      type: "change questionManagement closeShow",
      closeId: detailId
    });
  };

  // 点击删除问题
  const deleteQuestion = () => {

    // 询问是否确定
    confirm({
      title: '警告',
      content: '是否删除当前问题？',
      onOk() {
        _ITSMSystemServices.deleteQuestion({ids: [detailId]}, (res: any) => {
          success("删除成功");

          // 返回问题列表页面
          props.history.push('/itsm/question/');
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
    props.history.push('/itsm/question/');
  };

  return (
    <ShowListWrapper>
      <ShowListHeader>
        <ShowListTitle>问题详情</ShowListTitle>
        <ShowListOperateNoForm>
          {
            detailMsg && detailMsg.handle && detailMsg.handle.map((item: any, index: any) => {
              if (item == "review") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#15C0A9", borderColor: "#15C0A9"}} onClick={reviewQuestion}>评审</Button>;
              }
              if (item == "edit") {
                return <Button key={index} type= "primary" style={{marginRight: 10}} onClick={editQuestion}>编辑</Button>;
              }
              if (item == "close") {
                return <Button key={index} type= "primary" style={{marginRight: 10, backgroundColor: "#FF7B11", borderColor: "#FF7B11"}} onClick={closeQuestion}>关闭</Button>;
              }
              return <Button key={index} type= "danger" style={{marginRight: 10}} onClick={deleteQuestion}>删除</Button>;
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
                        <div className="title">问题编号：</div>
                        <div className="content">{detailMsg && detailMsg.id}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">问题分类：</div>
                        <div className="content">{detailMsg && detailMsg.categoryName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">问题来源：</div>
                        <div className="content">{detailMsg && detailMsg.source || "暂无"}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">创建人：</div>
                        <div className="content">{detailMsg && detailMsg.creatorName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">评审人：</div>
                        <div className="content">{detailMsg && detailMsg.principalName}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">问题紧急程度：</div>
                        <div className="content">{detailMsg && detailMsg.level_text}</div>
                      </LeftTopCardItem>
                    </UICol>
                    <UICol span={10}>
                      <LeftTopCardItem>
                        <div className="title">问题状态：</div>
                        <div className="content">{detailMsg && detailMsg.status_text}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">期望指派日期：</div>
                        <div className="content">{detailMsg && detailMsg.expect_time}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">抄送给：</div>
                        <div className="content">{detailMsg && detailMsg.relate_event && detailMsg.relate_event.principalName || "暂无"}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">关联事件：</div>
                        <div className="content">{detailMsg && detailMsg.relate_event && detailMsg.relate_event.name ? <Link to={`/itsm/event/detail/${detailMsg.relate_event.id}`} style={{color: "#2391FF"}}>{detailMsg.relate_event.name}</Link> : "暂无"}</div>
                      </LeftTopCardItem>
                      <LeftTopCardItem>
                        <div className="title">关联工单：</div>
                        <div className="content">{detailMsg && detailMsg.relate_work_order && detailMsg.relate_work_order.name ? <Link to={`/itsm/workorder/detail/${detailMsg.relate_work_order.id}`} style={{color: "#2391FF"}}>{detailMsg.relate_work_order.name}</Link> : "暂无"}</div>
                      </LeftTopCardItem>
                    </UICol>
                  </UIGrid>
              </LeftTopCard>
            </Spin>
            <Spin spinning={loading}>
              {/* 左侧底部卡片 */}
              <LeftBottomCard style={{marginTop: 15}}>
                <CardTitle><i></i>问题详情</CardTitle>
                <LeftBottomCardScorll>
                  <LeftBottomCardItem>
                    <div className="title">问题名称：</div>
                    <div className="content">{detailMsg && detailMsg.name}</div>
                  </LeftBottomCardItem>
                  <LeftBottomCardItem>
                    <div className="title">问题描述：</div>
                    <div className="content">{detailMsg && detailMsg.desc || "暂无"}</div>
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
  QuestionDetail
};