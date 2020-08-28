import styled, { css } from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

// 设置服务组每项标签属性
interface ServiceGroupItemProps {
  type: any;
}

// 包裹作用的根标签
const ContentWrapper = styled.section`
	${SlideShow}
	height: 800px;
	h3 {
		padding: 10px 0;
		text-align: center;
		border-bottom: 1px solid #dae1e4;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.ant-table-wrapper {
		margin-top: 20px;
		width: 75%;
    margin: auto;
	}
	.ant-checkbox-group-item {
		padding-bottom: 10px;
	}
`;

// 服务组外层包裹
const ListWrapper = styled.div`
	height: 750;
	overflow-y: auto;
	margin-top: -5px;
`;

// 服务组每项
const ListItem = styled.div`
	${
    (props: ServiceGroupItemProps) => {
			if (props.type) {
				return css`
				background:rgba(35,146,255,1);
				color: #fff;
				`;
			}
			return null;
    }
  }
	padding: 10px 0;
	text-align: center;
	cursor: pointer;
	:hover {
		background:rgba(35,146,255,1);
    color: #fff;
	}
`;

// 表单标题
const Title = styled.div`
	padding: 25px 0 20px 80px;
	font-size: 20px;
	font-weight: 700;
	color: #2D2F30;
`;

// 服务表格顶部按钮包裹
const ButtonWrapper = styled.div`
 	padding: 20px 220px;
`;

export {
	ContentWrapper,
	ListWrapper,
	ListItem,
	Title,
	ButtonWrapper,
};