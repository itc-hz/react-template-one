import styled from "styled-components";

// 设置左侧li高度 ant-menu-inline
const PageSider = styled.aside`
    width: 250px;
    min-height: calc(100vh - 90px);
    overflow: auto;
    flex: 0 0 250px;
    margin-right: 15px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid rgba(218, 225, 228, 1);
    transition: .5s;
    position: relative;
    .ant-menu-inline > .ant-menu-item{
        height: 60px;
        line-height: 60px;
    }
    .ant-menu-submenu > .ant-menu-submenu-title {
        height: 60px;
        line-height: 60px;
    }
    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    /* 控制左侧导航收起时导航名的隐藏 */
    .ant-menu-inline-collapsed .leftName{
        opacity: 0;
    }
    .ant-menu{
        transition: .5s;
        border-right: 0;
    }
`;

const PageSiderMenuWrapper = styled.div`
width: 100%;
.leftName{
    opacity: 1;
    font-size: 16px;
    transition: opacity 0.5s;
    &.collapsed{

    }
}
`;

const PageSiderMenuHeader = styled.div`
height: 49px;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const PageSiderMenuTitle = styled.h1`
line-height:50px;
margin: 0;
font-size: 18px;
padding-left: 20px;
font-weight: normal;
`;

const PageSiderCollapsed = styled.div`
    height: 150px;
    position: fixed;
    width: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    top: calc(50vh - 120px);
    &:before{
        content: '';
        display: block;
        border-left: 140px solid #D2D9DB; 
        border-bottom: 75px solid transparent;
        border-top: 75px solid transparent;
    }
    &:after{
        position: absolute;
        top: 72px;
        left: 4px;
        content: '';
        display: block;
        border-left: 7px solid #717E84; 
        border-bottom: 6px solid transparent;
        border-top: 6px solid transparent;
    }
`;
export {
    PageSider,
    PageSiderMenuHeader,
    PageSiderMenuWrapper,
    PageSiderMenuTitle,
    PageSiderCollapsed
};