import styled from "styled-components";
import {SlideShow} from "@/baseUI/Animate";

const ContentWrapper = styled.div`
${SlideShow}
`;

const CardList = styled.ul`
list-style: none;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
padding: 15px 15px 0 35px;
margin-bottom: 0;
.loading {
    text-align: center;
    width: 100%;
    height: 200px;
    line-height: 200px;
}
`;

const CardListItem = styled.li`
position: relative;
width: calc(100% * (1/4) - 15px);
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
margin-bottom: 20px;
margin-right: 15px;
overflow: hidden;
transition: .2s linear;
&:hover {
    cursor: pointer;
    box-shadow: 0 0 5px #08baff;
}
&:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #08baff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
&:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
}
`;

const CardItemTop = styled.div`
    position: relative;
    height: 130px;
    border-bottom: 1px solid #DEE1E3;
`;

const CardItemBottom = styled.div`
    padding: 8px;
    display: flex;
    align-items:center;
    justify-content: flex-end;
`;

const CardItemImg = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
    position: absolute;
    top: 15px;
    left: 20px;
    width: 100px;
    height: 100px;
    border-radius: 10px;
`;

const CardItemText = styled.div`
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translateY(-50%);
    font-size: 24px;
    font-weight: 500;
    color: rgba(35,146,255,1);
`;

// 知识详情表单项
const ItemWrapper = styled.div`
    padding-left: 50px;
    .title {
        font-size: 15px;
        color: #2D2F30;
        line-height: 33px;
    }
    .content {
        padding: 5px;
        word-wrap:break-word;
        border:1px solid rgba(218,225,228,1);
        font-size: 14px;
        color: #5B5E5F;
    }
    .row {
        margin: 20px 0px;
    }
`;

// 富文本框包裹
const BraftEditorWrapper = styled.div`
    .bf-controlbar {
        line-height: 20px!important;
    }
    .bf-link-editor .buttons {
        box-sizing: content-box!important;
    }
    .bf-controlbar .control-item.button {
        z-index: 999!important;
    }
    .bf-controlbar .control-item {
        z-index: 999!important;
    }
`;

export {
    ContentWrapper,
    CardList,
    CardListItem,
    CardItemTop,
    CardItemBottom,
    CardItemImg,
    CardItemText,
    ItemWrapper,
    BraftEditorWrapper
};