import React, {ReactNode} from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

type GameModalProps = {
  onClose: () => void
  children: ReactNode
  isOpen: boolean
}

export default function Modal({children, onClose, isOpen}: GameModalProps) {
  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </StyledModal>
  )
}

function ReactModalWrapper({className, modalClassName, ...props}) {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      ariaHideApp={false}
      {...props}
    />
  )
}

const StyledModal = styled(ReactModalWrapper).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Content'
})`
  .Content {
    background: rgba(0, 0, 0, 0);
    border-radius: 4px;
    outline: none;
    width: 920px;
    overflow-y: auto;

    @media (max-width: 920px) {
      width: 100%;
    }
  }

  .Overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1001;
  }
`
