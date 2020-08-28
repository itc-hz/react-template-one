import React, {useEffect, useState} from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useMappedState } from "redux-react-hook";
import {IState} from '@/store';

// 引入axios方法
import {ITSMSystemServices} from "@/services/itsmSystemServices";

// 引入页面公共样式
import { PageLayoutWrapper } from '@/baseUI/PageLayoutWrapper';
import { PageSider } from "@/baseUI/PageSider";
import { PageMain } from "@/baseUI/PageMain";

// 引入侧边栏
import SideBar from "@/component/pageSideBar";

// 引入各页面组件
import {ChangeManagementPage} from "@/page/itsmSystem/changeManagement";
import {EventManagementPage} from "@/page/itsmSystem/eventManagement";
import {KnowledgeManagementPage} from "@/page/itsmSystem/knowledgeManagement";
import {QuestionManagementPage} from "@/page/itsmSystem/questionManagement";
import {ServiceGroupAuthorizationPage} from "@/page/itsmSystem/serviceCatalogManagement/authorization";
import {ServiceGroupManagement} from "@/component/itsmSystem/serviceCatalogManagement/management";
import {ServiceSettingPage} from "@/page/itsmSystem/serviceCatalogManagement/setting";
import {ServiceControlPage} from "@/page/itsmSystem/serviceControl";
import {WorkOrderManagementPage} from "@/page/itsmSystem/workOrderManagement";

// 问题详情组件
import {QuestionDetail} from "@/component/itsmSystem/questionManagement/questionDetail";

// 事件详情组件
import {EventDetail} from "@/component/itsmSystem/eventManagement/eventDetail";

// 工单详情组件
import {WorkOrderDetail} from "@/component/itsmSystem/workOrderManagement/workOrderDetail";

// 变更详情组件
import {ChangeDetail} from "@/component/itsmSystem/changeManagement/changeDetail";

// 知识库对应分类列表页
import {KonwledgeList} from "@/component/itsmSystem/knowledgeManagement/konwledgeList";

// 新增，编辑知识页面
import {EditKnowledgeForm} from "@/component/itsmSystem/knowledgeManagement/editKnowledge";

// 知识详情页面
import {KnowledgeDetail} from "@/component/itsmSystem/knowledgeManagement/knowledgeDetail";

// 引入菜单栏图标
import {
  control,
  controlAct,
  question,
  questionAct,
  change,
  changeAct,
  event,
  eventAct,
  order,
  orderAct,
  knowledge,
  knowledgeAct,
  catalog,
  catalogAct,
} from "@/assert/img/itsmSystem";
import { warning } from "@/util/golbalModalMessage";

const mapState = (state: IState) => {
  return {
      user: state.Global.globalUser,
      getUserPermission: state.Global.getUserPermission
  };
};

const ITSMSystemPageLayout: React.ComponentType<any> = (props: any) => {
  const _ITSMSystemServices = new ITSMSystemServices();

  const { user, getUserPermission } = useMappedState(mapState);

  const dispatch = useDispatch();

  // 保存筛选后的默认路由地址
  const [routPath, setRoutPath] = useState<string>('');

  // 保存根据权限生成的侧边栏数组
  const [linkArr, setLinkArr] = useState<any>([]);

  useEffect(() => {
    
    // 页面加载获取当前用户拥有的菜单权限数据
    _ITSMSystemServices.getModuleAuth((res: any) => {
      setLinkArr(
        res.data.map((item: any) => {
          if (item.id == 1) {
            return {
                    name: '服务控制台',
                    link: '/itsm/control/',
                    icon: control,
                    iconActive: controlAct,
                  };
          }
          if (item.id == 2) {
            return {
                    name: '问题管理',
                    link: '/itsm/question/',
                    icon: question,
                    iconActive: questionAct
                  };
          }
          if (item.id == 3) {
            return {
                    name: '事件管理',
                    link: '/itsm/event/',
                    icon: event,
                    iconActive: eventAct,
                  };
          }
          if (item.id == 4) {
            return {
                    name: '工单管理',
                    link: '/itsm/workorder/',
                    icon: order,
                    iconActive: orderAct,
                  };
          }
          if (item.id == 5) {
            return {
                    name: '变更管理',
                    link: '/itsm/change/',
                    icon: change,
                    iconActive: changeAct,
                  };
          }
          if (item.id == 6) {
            return {
                    name: '知识库管理',
                    link: '/itsm/knowledge/',
                    icon: knowledge,
                    iconActive: knowledgeAct,
                  };
          }
          if (item.id == 7) {
            return {
                    name: '服务目录管理',
                    link: '/itsm/catalog/',
                    icon: catalog,
                    iconActive: catalogAct,
                    children: [
                      {
                          name: '服务组管理',
                          link: '/itsm/catalog/management',
                      },
                      {
                          name: '服务组授权',
                          link: '/itsm/catalog/authorization',
                      },
                      {
                          name: '服务配置',
                          link: '/itsm/catalog/setting',
                      }
                    ]
                  };
          }
          return null;
        })
      );
    }, (res: any) => {
      warning('获取当前用户菜单权限失败');
    });
  }, [dispatch]);

  // 根据权限生成的侧边栏配置
  const superUser = {
    title: 'ITSM系统',
    defaultKey: '/itsm/control/',
    show: true,
    linkArray: linkArr
  };

  useEffect(() => {
    if(getUserPermission.length > 0){

      // 过滤出当前用户所有模块权限id
      const PermissionIds = getUserPermission.map((value: any) => value.id);

      // 是否拥有itsm系统权限
      const flag = PermissionIds.some((item: any) => {
        return item == 77;
      });
      
      let toPath = '';

      // 如果存在权限，设置路由地址为侧边栏第一个地址
      if(flag){
          toPath = superUser.linkArray[0] && superUser.linkArray[0].link;
          setRoutPath(toPath);
          props.history.push(toPath);
      }else{
          props.history.push('/404/');
      }
    }
  }, [getUserPermission]);

  // 侧边栏配置数据
  const NormalMeetingSideBar = user && superUser;

  return (
    <PageLayoutWrapper>
      <PageSider key={1}>
        {/* 传递SideBar侧边栏参数 */}
        <SideBar {...NormalMeetingSideBar} />
      </PageSider>
      <PageMain key={2}>
        {/* 使用switch标签包裹，只会渲染第一个匹配到的path */}
        {routPath ? <Switch>
          <Route exact path={'/itsm/'} render={() => <Redirect to={routPath} />} />
          <Route exact path="/itsm/control/" component={ServiceControlPage} />
          <Route exact path="/itsm/question/" component={QuestionManagementPage} />
          <Route exact path="/itsm/question/detail/:id" component={QuestionDetail} />
          <Route exact path="/itsm/change/" component={ChangeManagementPage} />
          <Route exact path="/itsm/change/detail/:id" component={ChangeDetail} />
          <Route exact path="/itsm/event/" component={EventManagementPage} />
          <Route exact path="/itsm/event/detail/:id" component={EventDetail} />
          <Route exact path="/itsm/workorder/" component={WorkOrderManagementPage} />
          <Route exact path="/itsm/workorder/detail/:id" component={WorkOrderDetail} />
          <Route exact path="/itsm/knowledge/" component={KnowledgeManagementPage} />
          <Route exact path="/itsm/knowledge/list" component={KonwledgeList} />
          <Route exact path="/itsm/knowledge/list/editKnowledge" component={EditKnowledgeForm} />
          <Route exact path="/itsm/knowledge/list/detail/:id" component={KnowledgeDetail} />
          <Route exact path="/itsm/catalog/management" component={ServiceGroupManagement} />
          <Route exact path="/itsm/catalog/authorization" component={ServiceGroupAuthorizationPage} />
          <Route exact path="/itsm/catalog/setting" component={ServiceSettingPage} />
        </Switch> : null}
      </PageMain>
    </PageLayoutWrapper>
  );
};

export {
  ITSMSystemPageLayout
};
