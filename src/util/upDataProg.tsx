import React, {useState, useEffect} from 'react';
import {ProgressCenter} from "@/baseUI/operateProgress";
import {Modal, Spin} from 'antd';

interface LinkObj {
    content: string;
    title: string;
    visible: boolean;
}

const UpdataProgressSub = (props: LinkObj) => {
 
    return (
        <Modal
          visible={props.visible}
          maskClosable={false}
          closable= {false}
          keyboard= {false}
          footer= {null}
          title = {props.title}
        >
            <ProgressCenter>
                <Spin size="large" />
                <p>{props.content}</p>
            </ProgressCenter>
          
        </Modal>
    );
};

export {
    UpdataProgressSub
};