import styled from "styled-components";

const PageMain = styled.main`
// flex: auto;
flex: 1;
overflow-x: hidden;
padding-right: 20px;
// background: #fff;
margin: 30px 30px 0 15px;
scrollbar-width: none; /* Firefox */
-ms-overflow-style: none; /* IE 10+ */
&::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

export {
    PageMain
};