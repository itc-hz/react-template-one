import styled from "styled-components";

const ThemeOrange = styled.span`
a, button {
    margin-right: 15px;
    background-color: rgba(255, 123, 17, 1);
    border: 1px solid rgba(255, 123, 17, 1);
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: rgba(255, 123, 17, 1);
      border: 1px solid rgba(255, 123, 17, 1);
    }
}
`;

const ThemeGreen = styled.span`
a, button {
    margin-right: 15px;
    background-color: #15c0a9;
    border: 1px solid #15c0a9;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #15c0a9;
      border: 1px solid #15c0a9;
    }
}
`;

const ThemeYellow = styled.span`
a, button {
    margin-right: 15px;
    background-color: #FFc000;
    border: 1px solid #FFc000;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #FFc000;
      border: 1px solid #FFc000;
    }
}
`;

const ThemeGrey = styled.span`
a, button {
    margin-right: 15px;
    background-color: #E8E8E8;
    border: 1px solid #E8E8E8;
    color: #36383F;
    &:hover, &:active, &:focus {
      color: #36383F;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #E8E8E8;
      border: 1px solid #E8E8E8;
    }
}
`;

const ThemeDelete = styled.span`
button {
    margin-right: 15px;
    background-color: #717E84;
    border: 1px solid #717E84;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #717E84;
      border: 1px solid #717E84;
    }
}
`;

const ThemeWhite = styled.span`
button {
    background-color: #fff;
    border: 1px solid #717E84;
    color: #3E4447;
    &:hover, &:active, &:focus {
      color: #3E4447;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #fff;
      border: 1px solid #717E84;
    }
}
`;

const ThemeLightBlue = styled.span`
button {
    background-color: #6DB6FF;
    border: 1px solid #6DB6FF;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #6DB6FF;
      border: 1px solid #6DB6FF;
    }
}
`;
const ThemeGreenDeep = styled.span`
button {
    margin-right: 15px;
    background-color: #717E84;
    border: 1px solid #717E84;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #717E84;
      border: 1px solid #717E84;
    }
}
`;
export {
    ThemeOrange,
    ThemeGreen,
    ThemeYellow,
    ThemeGrey,
    ThemeDelete,
    ThemeWhite,
    ThemeLightBlue,
    ThemeGreenDeep
};