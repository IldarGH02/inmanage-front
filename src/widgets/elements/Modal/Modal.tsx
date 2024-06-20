import React, { useEffect } from "react"
import "./modal.css"

interface modalProps {
    children: React.ReactNode
    onClose: () => void,
    colorBckg?: string 
    // onOpen: () => void
}

export function Modal({children, onClose, colorBckg='rgba(0,0,0,0.7)'}: modalProps) {
    useEffect(()=>{
        document.querySelector('body')!.style.overflow = 'hidden'
        return () => {
            document.querySelector('body')!.style.overflow = 'visible'
        }
    },[])
    
    return (
        // <div className='modal-window'>
        <div className='modal' onClick={onClose} style={{backgroundColor: colorBckg}}>
            <div className="modal__wrapper">
                <div className='modal__content' onClick={e=>{
                    e.stopPropagation()
                }}>
                    {children}
                </div>
            
            </div>
        </div>
    )
}