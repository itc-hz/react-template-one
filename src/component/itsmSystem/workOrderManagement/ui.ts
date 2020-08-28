import styled, { css } from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

// 引入公共栅格化组件
import {
  UIGrid,
  UICol
} from '@/baseUI/Grid';

// 包裹作用的根标签
const CardWrapper = styled.section`
	${SlideShow}
	padding: 20px;
`;

// 卡片头部标题
const CardTitle = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 7px 10px;
	font-size: 15px;
	color: #000000;
	i {
		height: 12px;
		width: 10px;
		border-left: 4px solid #2B87FB;
	}
`;

// 左侧顶部卡片
const LeftTopCard = styled.div`
	height: 300px;
	border-radius: 7.5px;
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

// 左侧顶部卡片基本信息
const LeftTopCardItem = styled.div`
	padding: 10px;
	display: flex;
	.title {
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(0,0,0,1);
		width: 50%;
		text-align: right;
	}
	.content {
		margin-left: 40px;
		width: 50%;
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(91,94,95,1);
	}
`;

// 左侧底部卡片
const LeftBottomCard = styled.div`
	height: 400px;
	border-radius: 7.5px;
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

// 左侧底部卡片滚动外层
const LeftBottomCardScorll = styled.div`
	height: 90%;
	overflow-y: auto;
`;

// 左侧底部卡片基本信息
const LeftBottomCardItem = styled.div`
	padding: 10px;
	display: flex;
	.title {
		width: 20%;
		text-align: right;
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(0,0,0,1);
	}
	.content {
		padding-left: 40px;
		width: 80%;
		word-wrap:break-word;
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(0,0,0,1);
	}
`;

// 右侧卡片
const RightCard = styled.div`
	height: 715px;
	border-radius: 7.5px;
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

// 右侧卡片列表项
const RightCardItem = styled(UIGrid)`
	padding: 5px;
	.order {
		margin: auto;
		text-align: center;
		width:20px;
		height:20px;
		line-height: 20px;
		background:rgba(43,135,251,1);
		border-radius:50%; 
		color: #fff;
	}
	.time {
		color: #000000;
	}
`;

export {
	CardWrapper,
	CardTitle,
	LeftTopCard,
	LeftBottomCard,
	RightCard,
	RightCardItem,
	LeftTopCardItem,
	LeftBottomCardItem,
	LeftBottomCardScorll,
};