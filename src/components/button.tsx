import React from "react";
import styled from "styled-components";
import { Colors } from "../interface";

interface ButtonProps {
	fill: Colors | string
	width?: string
	padding?: string
	borderRadius?: string
	centered?: boolean
	border?: string
	margin?: string
	color?: Colors | string
	filter?: string
	boxShadow?: string
	transition?: string
	hover?: string
	activeStyle?: string
	fontWeight?: string
} 

export const Button = styled.button<ButtonProps>`
    width: ${(props) => props.width || '290px'};
	
	padding: ${(props) => props.padding || '17px'};

	color: ${(props) => props.color || '#fff'};
	background: ${(props) => props.fill};
	box-shadow: ${(props) => props.boxShadow};

	cursor: ${(props) => (!props.disabled ? 'pointer' : 'block')};

	text-align: ${(props) => (props.centered ? 'center' : 'initial')};
	border: ${(props) => props.border || 'none'};
	border-radius: ${(props) => props.borderRadius || '80px'};

	margin: ${(props) => props.margin || 0};

	font-weight: ${(props) => props.fontWeight || 'bold'};
	font-size: 16px;

	transition: ${(props) => props.transition || '0.3s'};

	:hover {
		${(props) => props.hover || 'opacity: 0.8;'}
	}

	:active {
		${(props) => props.activeStyle || 'opacity: 1;'}
	}
`