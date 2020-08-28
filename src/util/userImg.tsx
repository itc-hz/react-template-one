import React from 'react';

interface LinkObj {
    index: number;
    name: string;
}

const colorArr = ['#6ea68f', '#3d6eba', '#b6459c', '#70a791', '#5b63b3', '#d19e6d', '#c37285', '#795aab', '#1f78c1'];

const UserImgText = (props: LinkObj) => {
    const text = (name: string) => {
        const reg = /^[A-Za-z]/;

        // 是字母就转换成大写
        return reg.test(name) ? name.toUpperCase() : name;

    };
    return (
        <div style={{height: '50px',
            overflow: 'hidden',
            width: '50px',
            textAlign: 'center',
            fontSize: '12px',
            marginBottom: '15px'}}>
            <span style={{borderRadius: '50%', background: colorArr[9 % props.index || 0], color: '#fff', fontSize: '20px', lineHeight: '36px', display: 'inline-block', width: 36, height: 36}}>{text(props.name.substr(0, 1))}</span>
            <br/><span>{props.name}</span>
        </div>
    );
};

export {
    UserImgText
};