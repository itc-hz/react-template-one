import styled, {css} from "styled-components";

const DividingLine = styled.p`
width: 100%;
height:1px;
background:rgba(218,225,228,1);
`;
const DetailBaseContent = styled.div`
padding: 20px;

position: relative;
`;

const DetailBaseItem = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
line-height: 30px;
margin-bottom: 20px;
`;

const DetailBaseLabel = styled.div`
width: 20%;
text-align: right;
font-weight: 800;
`;

const DetailBaseItemContent = styled.div`
width: 75%;
text-align: left;
`;
const DetailStateImg = styled.div`
width: 90px;
position: absolute;
top: 10px;
right: 30px;
img{
    width: 90px;
}
`;

const DetailBaseListContent = styled.div`
padding: 20px;
`;
const DetailBaseListContentActive = styled.span`
width: 5px;
height: 20px;
display: inline-block;
background: #2392FF;
position: relative;
top: 5px;
`;

const DetailTabsBody = styled.div`
height: calc(100vh - 170px);
overflow: auto;
&::-webkit-scrollbar{
    width: 3px !important;
}
&::-webkit-scrollbar-track {
    display: none; /* Chrome Safari */
}
`;
export {
    DividingLine,
    DetailBaseContent,
    DetailBaseItem,
    DetailBaseLabel,
    DetailBaseItemContent,
    DetailStateImg,
    DetailBaseListContent,
    DetailBaseListContentActive,
    DetailTabsBody
};