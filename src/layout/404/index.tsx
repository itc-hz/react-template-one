import React from "react";
import {DefaultImg} from '@/assert/img';
const DefaultPage = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '675px'}}>
            <div style={{position: 'relative'}}>
                <img style={{width: '816px'}} src={DefaultImg}/>
                <p style={{position: 'absolute', bottom: '60px', textAlign: 'center', width: '100%', fontSize: '30px'}}>你暂无该模块功能权限，请联系管理员开通功能权限</p>
            </div>
        </div>
    );
};

export {
    DefaultPage
};
