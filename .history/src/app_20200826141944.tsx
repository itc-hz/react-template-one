import {hot} from "react-hot-loader/root";
import React, {Fragment, useEffect} from "react";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import {ConfigProvider, BackTop} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {createGlobalStyle} from "styled-components";
import {Scrollbars} from 'react-custom-scrollbars';
import {useDispatch} from 'redux-react-hook';

import GlobalServices from '@/services/globalServices';

// import '../mocker/process/system/index';

// 引入分布式请求
// import {DistributedServices} from '@/services/distributedServices';
const _globalServices = new GlobalServices();

// import {MeetingPageLayout} from "@/layout/meetingPageLayout";
// import {MeetingNormalPageLayout} from "@/layout/meetingNormalPageLayout";
// import {MeetingPaperlessLayout} from "@/layout/meetingPaperless";

// import {MeetingCommonPageLayout} from "@/layout/meetingCommonPageLayout";

// 项目
// import {ProjectPageLayout} from "@/layout/projectPageLayout";

// ITSM系统
import {ITSMSystemPageLayout} from "@/layout/itsmSystemPageLayout";

// 分布式
// import {DistributedCenterPageLayout} from "@/layout/distributedCenterPageLayout";
// import {DistributedSettingPageLayout} from "@/layout/distributedSettingPageLayout";

// 后勤
// import {LogisticsServicePageLayout} from "@/layout/logisticsServicePageLayout";

// 广播
// import {BroadcastPageLayout} from "@/layout/broadCastPageLayout";

// 考勤
// import {AttendanceCheckingLayout} from "@/layout/attendanceCheckingLayout";

// import {AccessPageLayout} from "@/layout/accessPageLayout";

// import {SchedulePageLayout} from "@/layout/schedulePageLayout";

// import {SeatPageLayout} from "@/layout/seatPageLayout";

// import {VotePageLayout} from "@/layout/votePageLayout";

// import {LogisticsPageLayout} from "@/layout/logisticsPageLayout";

// import {ShortMessagePageLayout} from "@/layout/shortMessagePageLayout";

// import { DevicesPageLayout } from "@/layout/devicePageLayout";

// import {NopaperPageLayout} from '@/layout/nopaperPageLayout';

// import {DepartmentPageLayout} from '@/layout/departmentPageLayout';

// import {MeetingRoom} from '@/layout/meetingRoom';

// import {RolesPageLayout} from '@/layout/rolesPageLayout';

// import {VideoPageLayout} from '@/layout/videomeeting';

// import {RecordingPageLayout} from '@/layout/recordingPageLayout';
// import {RecordingSettingPageLayout} from '@/layout/recordingSettingLayout';

// import {PaperlessPageLayout} from '@/layout/paperlessPageLayout';

// import {ProcessPageLayout} from '@/layout/processPageLayout';

// import {VisitorPageLayout} from '@/layout/visitorPageLayout';

import {DefaultPage} from '@/layout/404';

// import {DetectorPageLayout} from '@/layout/detectorPageLayout';

// import {AssetsPageLayout} from '@/layout/assetsPageLayout/indexNew';

// import {ActivityPageLayout} from '@/layout/activityPageLayout';
import {error} from "@/util/golbalModalMessage";

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
}
*, *::before, *::after {
    box-sizing: border-box;
}
html, body {
    width: 100%;
    height: 100%;
}
ul, li {
list-style: none;
}
#root {
  height: 100%;
  width: 100%;
  background-color: rgba(239,243,245,1);
}
`;

const App: React.ComponentType = () => {

    // 创建分布式方法实例
    // const _DistributedServices = new DistributedServices();

    const dispatch = useDispatch();

    const getUserPermission = (id: any) => {
        _globalServices.getUserPermission({uid: id}, (res: any) => {
            dispatch({
                type: 'change global getUserPermission',
                getUserPermission: res.data,
                getUserPermissionIds: res.data && res.data.map((val: any) => val.id) || [],
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });

    };

    // 定义分布式获取websocketUrl
    // const getWebSocket = () => {

    //     // 获取socket地址
    //     _DistributedServices.getWebSocket((res: any) => {
            
    //         // 将url存进store
    //         dispatch({
    //             type: "get webSocket url",
    //             webSocketUrl: res.data.websocket_host
    //         });
    //     }, (err: any) => {
    //         error(err.message ? err.message : err.toString());
    //     });
    // };
    useEffect(() => {
        _globalServices.getDepartment((res: any) => {
            dispatch({
                type: 'change global loginUser',
                loginUserId: res.data.uid || '',
                globalUser: res.data || {}
            });
            getUserPermission(res.data.uid);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });

        // 分布式获取socketURL
        // getWebSocket();
    }, [dispatch]);
    return (
        <HashRouter>
            <ConfigProvider locale={zhCN}>
                <Fragment>
                    <GlobalStyle/>
                    <Scrollbars id={"pageWrapper"} autoHide autoHideTimeout={1000} autoHideDuration={200}>
                        <BackTop visibilityHeight={300} target={() => {
                            const elementParent: HTMLElement | null = document.querySelector('#pageWrapper');
                            const element: any = elementParent && elementParent.children[0];
                            return element;
                        }}/>
                        <Switch>
                            <Route exact path={'/'} render={() => <Redirect to="/itsm/"/>}/>
                            <Route path="/404/" component={DefaultPage}/>
                            {/* <Route path="/seat/" component={SeatPageLayout}/> */}
                            {/* <Route path="/meeting/" component={MeetingPageLayout}/>
                            <Route exact path={'/'} render={() => <Redirect to="/roles/"/>}/>
                            {/* 项目 */}
                            {/* <Route path="/project/" component={ProjectPageLayout}/> */}
                            {/* ITSM系统 */}
                            <Route path="/itsm/" component={ITSMSystemPageLayout}/>
                            {/* 考勤 */}
                            {/* <Route path="/attendance/" component={AttendanceCheckingLayout}/> */}
                            {/* 后勤 */}
                            {/* <Route path="/logistics/" component={LogisticsServicePageLayout}/> */}
                            {/* 
                            <Route path="/meeting/" component={MeetingPageLayout}/>
                            <Route path="/normalmeeting/" component={MeetingNormalPageLayout}/> */}
                            {/* <Route path="/commonmeeting/" component={MeetingCommonPageLayout}/> */}
                            {/* <Route path="/paperlessmeeting/" component={MeetingPaperlessLayout}/> */}
                            {/* <Route path="/vote/" component={VotePageLayout}/> */}
                            {/* <Route path="/access/" component={AccessPageLayout}/> */}
                            {/* <Route path="/schedule/" component={SchedulePageLayout}/> */}
                            {/* <Route path="/logistics/" component={LogisticsPageLayout}/> */}
                            {/* <Route path="/sms/" component={ShortMessagePageLayout}/> */}
                            {/* <Route path="/devices/" component={DevicesPageLayout}/> */}
                            {/* <Route path="/nopaper/" component={NopaperPageLayout}/>  */}
                            {/* <Route path="/detector/" component={DetectorPageLayout}/> */}
                            {/* <Route path="/department/" component={DepartmentPageLayout}/>  */}
                            {/* <Route path="/roles/" component={RolesPageLayout}/> */}
                            {/* <Route path="/meetingroom/" component={MeetingRoom}/>  */}
                            {/* 广播 */}
                            {/* <Route path="/broadcast/" component={BroadcastPageLayout}/>  */}
                            {/* 分布式中控组件 */}
                            {/* <Route path="/controlWall/" component={DistributedCenterPageLayout}/> */}
                            {/* 分布式配置页面 */}
                            {/* <Route path="/encoder/" component={DistributedSettingPageLayout}/> */}
                            {/* <Route path="/video/" component={VideoPageLayout}/>  */}
                            {/* <Route path="/paperless/" component={PaperlessPageLayout}/>  */}
                            {/* <Route path="/recording/" component={RecordingPageLayout}/> 
                            <Route path="/recordsetting/" component={RecordingSettingPageLayout} /> */}
                             {/* <Route path="/detector/" component={DetectorPageLayout}/> */}
                            {/* <Route path="/process/" component={ProcessPageLayout}/> */}
                            {/* <Route path="/visitor/" component={VisitorPageLayout}/> */}
                            {/* <Route path="/assets/" component={AssetsPageLayout}/> */}
                            {/* <Route path="/activity/" component={ActivityPageLayout}/>  */}
                        </Switch>
                    </Scrollbars>
                </Fragment>
            </ConfigProvider>
        </HashRouter>
    );
};

export default hot(App);
