import styled, { css } from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

// 包裹作用的卡片根标签
const CardWrapper = styled.section`
	${SlideShow}
	padding: 20px;
`;

// 包裹作用的列表根标签
const ListWrapper = styled.section`
	${SlideShow}
`;

// 右侧卡片
const RightCard = styled.div`
	height: 520px;
	border-radius: 7.5px;
	box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	background-color: #fff;
`;

// 左侧卡片
const LeftCard = styled.div`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;

// 统计卡片
const CardItem = styled.div`
	overflow: hidden;
	width: 47%;
	height: 250px;
	border-radius: 7.5px;
	box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
`;

// 卡片标题
const CardItemHeader = styled.div`
	padding: 12px;
	font-weight: 400;
	font-size: 17px;
	background: rgba(35,146,255,1);
	color: #fff;
	&:before{
		margin-right: 10px;
		content: '丨';
	}
`;

// 卡片内容
const CardItemContent = styled.div`
	padding: 20px;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		background: #eee;
	}
	img {
		margin-right: 10px;
		height: 18px;
		width: 18px;
	}
	span {
		color: rgba(35,146,255,1);
	}
`;

export {
	CardWrapper,
	ListWrapper,
	RightCard,
	LeftCard,
	CardItem,
	CardItemHeader,
	CardItemContent,
};