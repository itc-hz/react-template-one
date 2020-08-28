import styled from "styled-components";

const PageLayoutWrapper = styled.div`
  // padding: 20px 0;
  // width: 1360px;
  width: 100%;
  height:100%;
  // margin-left: calc(50% - 680px);
  display: flex;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  // @media (max-width: 1360px) {
  //   width: 1200px;
  //   margin-left: calc(50% - 600px);
  // }
`;

const FullWinLayoutWrapper = styled.div`
width: 100%;
height: 100%;
&>div {
width: 100%;
height: 100%;
}
`;

export {
    PageLayoutWrapper,
    FullWinLayoutWrapper
};