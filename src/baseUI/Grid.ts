import styled from "styled-components";

interface ColProps {
    span?: number;
}

const UIRow = styled.div`
display: flex;
flex-direction: row;
width: 100%;
box-sizing: border-box;
&::before, &::after {
display: table;
content: '';
}
`;

const UIGrid = styled.div`
display: flex;
flex-direction: row;
width: 100%;
box-sizing: border-box;
&::before, &::after {
display: table;
content: '';
}
`;

const UICol = styled.div`
width: calc(100% * (${(props: ColProps) => props.span}/24));
`;

export {
    UIRow,
    UIGrid,
    UICol
};