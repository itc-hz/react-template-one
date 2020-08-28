import styled from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

const ShowListWrapper = styled.section`
${SlideShow};
width: 100%;
background-color: #fff;
border: 1px solid #dae1e4;
border-radius: 5px;
`;

const ShowListHeader = styled.header`
position: relative;
padding: 0 10px 0 20px;
height: 50px;
border-bottom: 1px solid #dae1e4;
`;

const ShowListTitle = styled.h2`
display: inline-block;
line-height: 50px;
font-size: 18px;
font-weight: 400;
margin: 0;
`;

const ShowListOperateLeft = styled.div`
padding-top: 5px;
line-height: 50px;
`;

const ShowListOperateCenter = styled.div`
padding-top: 5px;
text-align: center;
line-height: 50px;
position: absolute;
left: 0;
top: 0;
width: 100%;
`;

const ShowListOperate = styled.div`
padding-top: 5px;
position: absolute;
right: 0;
top: 0;
line-height: 50px;
`;

const ShowListOperateNoForm = styled.div`
position: absolute;
right: 0;
top: 0;
line-height: 50px;
padding-right: 10px;
`;

const ShowListFooter = styled.footer`
height: 50px;
text-align: center;
padding-top: 10px;
border-top: 1px solid #dae1e4;
`;

export {
    ShowListWrapper,
    ShowListHeader,
    ShowListTitle,
    ShowListOperate,
    ShowListFooter,
    ShowListOperateLeft,
    ShowListOperateCenter,
    ShowListOperateNoForm
};
