import styled from "styled-components";
import {SlideShow, SlideRight, SlideDown} from '@/baseUI/Animate';

const CrowWrapper = styled.aside`
${SlideShow};
left: 0;
top: 0;
position: fixed;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.3);
z-index: 1000;
`;

const CrowTwoLvWrapper = styled(CrowWrapper)`
z-index: 1001;
`;

const RightCrow = styled.div`
${SlideRight};
position: absolute;
right: 0;
top: 0;
height: 100%;
width: 500px;
background-color: #fff;
`;

const CrowHeader = styled.header`
height: 49px;
position: relative;
border-bottom: 1px solid rgba(218, 225, 228, 1);
background-color: rgba(245, 247, 248, 1);
`;

const CrowTitle = styled.h3`
line-height: 49px;
font-size: 18px;
font-weight: 400;
padding-left: 20px;
`;

const CrowClose = styled.span`
position: absolute;
right: 10px;
top: 10px;
`;

const CrowFooter = styled.footer`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 50px;
box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.2);
background-color: #fff;
text-align: center;
padding-top: 10px;
`;

const CrowFooterNoPading = styled(CrowFooter)`
padding: 0;
line-height: 50px;
`;

const CrowContent = styled.div`
overflow-y: auto;
height: calc(100% - 100px);
`;

const CrowHiddenContent = styled(CrowContent)`
overflow: hidden;
`;

const CrowMidContent = styled.div`
overflow-y: hidden;
height: calc(100% - 100px);
`;

const CrowMiddle = styled.div`
${SlideDown};
border-radius: 5px;
overflow: hidden;
position: absolute;
left: 50%;
top: 50%;
width: 500px;
height: 500px;
transform: translate(-50%, -50%);
background-color: #fff;
max-height: 100%;
.ant-spin-nested-loading{
height: 100%;
.ant-spin-container {
height: 100%;
}
}
`;

const CrowMiddleLarge = styled.div`
${SlideDown};
border-radius: 5px;
overflow: hidden;
position: absolute;
left: 50%;
top: 50%;
width: 1200px;
transform: translate(-50%, -50%);
background-color: #fff;
height: 80%;
.ant-tabs {
height: 100%;
  .ant-tabs-bar {
    margin: 0;
  }
  .ant-tabs-top-content.ant-tabs-content-animated, .ant-tabs-bottom-content.ant-tabs-content-animated {
    height: calc(100% - 45px);
  }
}
.ant-tabs-nav-container {
  height: 100%;
}
`;

const CrowMidLargeContent = styled.div`
height: calc(100% - 50px);
`;

const CrowChildWrapper = styled.div`
overflow: hidden;
`;

const CrowChildHeader = styled.header`
height: 40px;
position: relative;
background-color: #f5f7f8;
`;

const CrowChildTitle = styled.h4`
line-height: 40px;
padding-left: 20px;
font-size: 16px;
font-weight: 400;
`;

const CrowChildOperate = styled.span`
position: absolute;
right: 10px;
top: 5px;
`;

export {
    CrowWrapper,
    CrowTwoLvWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowContent,
    CrowFooter,
    CrowChildHeader,
    CrowChildTitle,
    CrowChildOperate,
    CrowMiddle,
    CrowMidContent,
    CrowChildWrapper,
    CrowHiddenContent,
    CrowMiddleLarge,
    CrowMidLargeContent,
    CrowFooterNoPading
};
