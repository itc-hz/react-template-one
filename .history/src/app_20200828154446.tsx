import {hot} from "react-hot-loader/root";
import React, {Fragment, useEffect} from "react";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import {ConfigProvider, BackTop} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {createGlobalStyle} from "styled-components";
import {Scrollbars} from 'react-custom-scrollbars';
import {useDispatch} from 'redux-react-hook';

import GlobalServices from '@/services/globalServices';

const _globalServices = new GlobalServices();

// ITSM系统
import {ITSMSystemPageLayout} from "@/layout/itsmSystemPageLayout";


import {DefaultPage} from '@/layout/404';

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
                            <Route path="/itsm/" component={ITSMSystemPageLayout}/>
                        </Switch>
                    </Scrollbars>
                </Fragment>
            </ConfigProvider>
        </HashRouter>
    );
};

export default hot(App);
