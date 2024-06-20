import React, { useEffect, useState } from "react";
import "./slider.css"
import { YMap } from "../YMap/YMap";


const transport = require("../../assets/img/solaris.jpg")

export function Slider({elementsArr}) {
    const [count, setCount] = useState(0)
    const [width, setWidth] = useState(0)
    const www = 376.99

    useEffect(()=>{
        // init()
    }, [])

    // function init() {
    //     // console.log('resize');
    //     // setOffSetwidth(0)
    //     let widthTmp = document.querySelector('.slider').offsetWidth
    //     // setWidth(widthTmp)
    //     document.querySelector('.slider .slider-line').style.width = widthTmp * (document.querySelectorAll('.slider .slider-line > div').length) + 'px';
    //     document.querySelectorAll('.slider .slider-line > div').forEach(item => {
    //         item.style.width = (document.querySelector('.slider').offsetWidth) + 'px';
    //         item.style.height = 'auto';
    //     });
    //     console.log(widthTmp)
    //     // rollSlider(count, widthTmp)
    // }

    // window.addEventListener('resize', init)
    
    // const rollSlider = (c, w=width)=> {
    //     document.querySelector('.slider .slider-line').style.transform = 'translate(-' + c * w + 'px)'
    // }

    const nextSlider = () => {
        setCount(count+1)
        if (count+1 >= 3) {
            setCount(0);
            setWidth(0)
            // rollSlider(0)
            return
        }
        // console.log(count+1);
        setWidth(width+www)
        console.log(width)
    }

    const prevSlider = () => {
        setCount(count-1)
        if ((count-1) < 0) {
            setCount(2);
            setWidth(www*2)
            // rollSlider(newCount)
            return
        }
        // rollSlider(count-1)
        setWidth(width-www)
        console.log(width);
    }
    const nextBtn = '>'
    const prevBtn = '<'
    return (
        <div className="slider-container">
            {/* <h1>Адаптивный слайдер</h1> */}

            <div className="slider">
                <div className="slider-line"
                style={{
                        transform: `translate(-${width}px)`,
                        width:376.99*3,
                        height: 'auto'
                }}
                >
                    {elementsArr.map(((el, i)=>{
                        return (
                            <div style={{width:'100%', height:'auto'}} key={i}>{el}</div>
                        )
                    }))}
                    {/* <div style={{width:'70%', height:'auto'}}><YMap/></div>
                    <div style={{width:'100%', height:'auto'}}><LineChart/></div>
                    <div style={{width:'100%', height:'auto'}}><LineChart/></div> */}
                </div>
            </div>
            <div className="slider__btn-container">
                <button className="button-slider slider-prev" onClick={prevSlider}>{prevBtn}</button>
                <button className="button-slider slider-next" onClick={nextSlider}>{nextBtn}</button>
            </div>   
            

        </div>
    )
}