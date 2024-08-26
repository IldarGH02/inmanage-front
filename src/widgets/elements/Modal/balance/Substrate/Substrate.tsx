import { useEffect } from "react"
import "./substrate.css"

interface SubstrateProps {
    // children: React.ReactNode
    onClose: () => void
    // onOpen: () => void
}

export function Substrate({onClose}: SubstrateProps) {
    useEffect(()=>{
        document.querySelector('body')!.style.overflow = 'hidden'
        return () => {
            document.querySelector('body')!.style.overflow = 'visible'
        }
    },[])
    
    return (
        // <div className='modal-window'>
        <div className='substrate' onClick={onClose}>
            <div className="substrate__wrapper">
                <div className='substrate__content' onClick={e=>{
                    e.stopPropagation()
                }}>
                    {/* {children} */}
                </div>
            
            </div>
        </div>
    )
}