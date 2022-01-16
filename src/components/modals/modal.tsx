import React from 'react'
import styled from 'styled-components'
import plus from '../../assets/img/plus.svg'

const BlurModal = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(67, 83, 167, 0.3);
	position: absolute;
`

const ModalWrapper = styled.div`
	width: 100%;
	z-index: 99999;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
`

const ModalScroll = styled.div`
	width: 100%;
	display: flex;
	overflow-y: scroll;
	height: 100vh;
`

const ModalContent = styled.div<{
	padding?: string
	width?: string
	width_mob?: string
	background?: string
	margin?: string
	full?: boolean
}>`
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: relative;
	z-index: 10;
	border-radius: 10px;
	box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
	height: ${(props) => props.full ? '90vh' : 'max-content'};
	width: ${(props) => props.width || '850px'}; 
	background: ${(props) => props.background};
	@media (max-width: 1100px){
        width: ${(props) => props.width_mob || '750px'};
    }
`


ModalContent.defaultProps = {
	padding: '40px',
	margin: '45px auto',
	background: 'white',
}

export const Modal = ({
	onClose,
	padding,
	full,
	margin,
	background,
	width,
	width_mob,
	children,
}: {
	onClose?: () => void
	padding?: string
	full?: boolean
	margin?: string
	background?: string
	width?: string
	width_mob?: string
	children?: React.ReactNode
}) => {
	
	return (
		<ModalWrapper>
			<BlurModal onClick={onClose} />
			<ModalScroll>
				<ModalContent full={full} width={width} width_mob={width_mob} padding={padding} background={background} margin={margin}>
					{onClose ? (
						<img src={plus} alt='close' className='modal-close-icon' onClick={onClose} />
					) : null}
					{children}
				</ModalContent>
			</ModalScroll>
		</ModalWrapper>
	)
}
