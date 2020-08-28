import styled from "styled-components";
interface TabProps {
    height?: string;
}

const TabsUi = styled.div`
    height: 100%;
   .ant-tabs-nav-scroll{
        display: flex;
        justify-content: center;
        
   }
   .ant-tabs-nav .ant-tabs-tab{
        margin-right: 80px;
        &:last-child{
            margin-right: 0px;
        }
    }
`;

const TabsBodyUi = styled.div`
height: calc(100vh - ${(props: TabProps) => props.height ? props.height : '200px'});
overflow: auto;
`;

const UpBtnUi = styled.div`
 i{
    background: #278EF8;
    border-radius: 50%;
    color: #fff;
    font-size: 30px;
    padding: 5px;
 }
`;

export {
    TabsUi,
    TabsBodyUi,
    UpBtnUi
};