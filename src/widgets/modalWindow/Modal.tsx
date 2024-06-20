import React, { useContext } from 'react'
import "./modal.css"
import { ModalContext } from '../../features/context/modalProperty/ModalContext'

interface IModal {
    children: React.ReactNode
    // onClose: () => void
    // onOpen: () => void
}


export function Modal({children}: IModal) {
    // const {hideAlert} = useContext(AlertContext)
    const {hide} = useContext(ModalContext)
    // modalWindow()
    // onOpen()
    return (
        // <div className='modal-window'>
         <div className='modal-window' onClick={()=>{
            hide()
            // hideAlert()
            }}>
            <div className='modal-window__content' onClick={e=>{
                // closeWindow()
                e.stopPropagation()
            }}>
                {children}
            </div>
        </div>
    )
}