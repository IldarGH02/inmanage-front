import React from "react";
import { IImage } from "../../../../app/types/elements/IImage";

import "./InputFileImages.css";

interface IInputFileImages {
    setImages: (images: IImage[]|[]) => void,
    multiple?: boolean
}

export function InputFileImages({setImages, multiple=false}: IInputFileImages) {

    const changeInputHandler = (event: React.FormEvent<HTMLInputElement>)=> {
        if(!event.currentTarget.files!.length) {
            return;
        }

        const files = Array.from(event.currentTarget.files as FileList);
        let images:IImage[] = []  

        new Promise((resolve)=>{
            files.forEach((file, i) => {
                const reader = new FileReader;
                reader.onload = async (ev) => {
                    if (file.name.split('.').at(-1) === 'svg' || file.name.split('.').at(-1) === 'png' || file.name.split('.').at(-1) === 'jpeg' || file.name.split('.').at(-1) === 'jpg') {
                        const imgTmp: IImage = {
                            id: 0,
                            img: ev.target!.result as string,
                        };
                        images.push(imgTmp);
                        if(i===(files.length-1)) {
                            resolve(null)
                        }
                    }
                };
                reader.readAsDataURL(file);                
            })
        })      
        .then(()=>setImages(images))   
    };

    return (
        <input type="file" id="input-file" accept=".svg, .png, .jpeg, .jpg" multiple={multiple} onChange={changeInputHandler}/>
    )
}