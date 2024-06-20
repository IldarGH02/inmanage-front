import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IChooseAuth {
    classNameElement: string
    classNameLink: string
    classNameText: string
    text: string
    textLink: string
    path: string
}

export const ChooseAuth: FC<IChooseAuth> = (
    {   
        classNameElement,
        classNameLink, 
        classNameText,
        textLink,
        text, 
        path,
    }
    ) => {
   
    return (
        <div className={classNameElement}>
            <p 
                className={classNameText}
            >
                {text}
                {
                    <Link 
                        className={classNameLink} 
                        to={path}
                    >
                        {textLink}
                    </Link>
                }
            </p>
        </div>
    )
}