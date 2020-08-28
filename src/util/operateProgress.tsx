import React, {useState, useEffect} from 'react';
import {ProgressCenter} from "@/baseUI/operateProgress";
import {Modal, Progress } from 'antd';

interface LinkObj {
    content: string;
    percent: number;
    type?: 'line' | 'circle' | 'dashboard';
    title?: string;
    visible: boolean;
    closable: boolean;
    onCancel: any;
}

const ProgressSub = (props: LinkObj) => {
    const [visible, setVisible] = useState<boolean>(true);
    useEffect(() => {
        setVisible(true);
    }, [props]);
    return (
        <Modal
          visible={props.visible}
          maskClosable={false}
          closable= {props.closable}
          keyboard= {false}
          footer= {null}
          onOk={() => {
             
          }}
          onCancel={() => {
            props.onCancel();
          }}
        >
            <ProgressCenter>
                <Progress
                type={props.type || 'circle'}
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={props.percent}
                />
            <p>{props.content}</p>
            </ProgressCenter>
          
        </Modal>
    );
};

export {
    ProgressSub
};