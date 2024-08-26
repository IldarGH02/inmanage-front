import { useEffect, useState } from "react";
import "./expenseSlider.css";
import { IExpenseSlider } from "../../../../app/types/balance/IBalance";
import { SelectedItemSlider } from "../../SelectedItemSlider/SelectedItemSlider";
import { ButtonAdd } from "../../../../shared/ui/ButtonAdd/ButtonAdd";

interface IExpenseSliderProp {
    data: IExpenseSlider[],
    idItems: string,
    onClickItem: (id?: number|null)=>void,
    addBtnVisible?: boolean,
}

// const cash = require('../../../../actives/img/balance/addExpense/cashB.png')

export function ExpenseSlider({data, idItems, onClickItem, addBtnVisible=true}: IExpenseSliderProp) {
    const [widthSlider, setWidthSlider] = useState(0)
    const [countArr, setCountArr] = useState([0])
    const [numberActive, setNumberActive] = useState(1)
    const [widthContainer, setWidthContainer] = useState(0)
    // const [activeItem, setActiveItem] = useState(-1)
    const [activeData, setActiveData] = useState<IExpenseSlider|null>(null)

    useEffect(()=>{
        const widthSlider = (document.getElementById(idItems) as HTMLElement).offsetWidth
        const widthLine = (document.querySelector('.expense-slider__slider-line') as HTMLElement).offsetWidth
        let arrNum: number[] = []
        for(let i=0; i<Math.trunc(widthSlider/widthLine); i++) {
            arrNum.push(0)
        }
        setCountArr(arrNum);
        // (document.getElementById(idItems) as HTMLDivElement).addEventListener("resize", resizeSlider);
        window.addEventListener("resize", resizeSlider);
        return () => {
            window.removeEventListener("onresize", resizeSlider);
        };
    },[])

    // useEffect(()=>{
    //     if(data.length!==0) {
    //         setActiveData(data[0])
    //     }
    // }, [data])

    useEffect(()=>{
        const w = (document.querySelector('.expense-slider-container')as HTMLElement).offsetWidth
        // setWidthSlider(w);
        // const wItem = (document.querySelector('.expense-slider-item')as HTMLElement).offsetWidth
        const widthSlider = (document.getElementById(idItems) as HTMLElement).offsetWidth
        let arrNum: number[] = []
        // console.log('widthSlider ' + widthSlider)
        const length = Number.isInteger(widthSlider/w)?widthSlider/w:Math.trunc(widthSlider/w)+1
        for(let i=0; i<length; i++) {
            arrNum.push(0)
        }
        if(arrNum.length>1) {
            setNumberActive(numberActive)
            setWidthSlider(0+w*(numberActive-1));
        } else {
            setWidthSlider(0);
            setNumberActive(1)
        }
        setCountArr(arrNum)
    }, [widthContainer, data])

    const resizeSlider = ()=> {
        const wContainer = (document.querySelector('.expense-slider-container')as HTMLElement).offsetWidth
        // const wItem = (document.querySelector('.expense-slider-item__title')as HTMLElement).offsetWidth
        if(wContainer!==widthContainer) {
            setWidthContainer(wContainer)
            // const count = wContainer/wItem
        }
    }

    const nextSlider = () => {
        const widthSliderTmp = (document.querySelector('.expense-slider__slider-line')as HTMLElement).offsetWidth
        if(numberActive<countArr.length) {
            setNumberActive(numberActive+1)
            setWidthSlider(widthSlider+widthSliderTmp)
        }
    }

    const prevSlider = () => {
        const widthTmp = (document.querySelector('.expense-slider__slider-line')as HTMLElement).offsetWidth
        if(widthSlider!==0) {
            setNumberActive(numberActive-1)
            setWidthSlider(widthSlider-widthTmp)
        }
    }
    
    const clickItem = (id: number, el:IExpenseSlider) => {
        onClickItem(id)
        setActiveData(el)
    }

    return (
        <>
        {activeData && 
            <SelectedItemSlider img={activeData.img} title={activeData.name} subtitle={String(activeData.sum!)+' ₽'} onClickItem={()=>{
                setActiveData(null)
                onClickItem(null)
            }}/>
        }
            
        {!activeData &&
            <div className="expense-slider-container">
                <div className="expense-slider">
                    <button className="expense-slider-btn expense-slider__early" onClick={prevSlider}></button>
                    <div className="expense-slider__slider-line" >
                        <div id={idItems} className="expense-slider__items" style={{
                                transform: `translateX(-${widthSlider}px)`
                            }}>
                            {data.map((el)=> {
                                return (
                                    <div className={"expense-slider-item"} onClick={()=>clickItem(el.id!, el)} key={el.id}>
                                        <div className="expense-slider-item__title">{el.name}</div>
                                        <img className="expense-slider-item__img" src={el.img}/>                                           
                                        {el.sum && 
                                            <div className="expense-slider-item__sum">
                                                <div className="expense-slider-item__sum-title">{el.sum.toLocaleString()}</div>
                                                <span className="expense-slider-item__sum-valuta">₽</span> 
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                            {addBtnVisible && 
                                <ButtonAdd 
                                    classNameContainer="button__add-container" 
                                    classNameTitle="button__add-title" 
                                    classNameButton="button_add-btn" 
                                    handleClickItem={onClickItem}
                                />
                            }
                        </div>
                    </div>
                    <button className="expense-slider-btn expense-slider__next" onClick={nextSlider}></button>
                </div>
                <div className="expense-slider__pointers-line">
                    <div className="expense-slider__pointers">
                        {countArr.map((i)=>{
                            return (
                                <div className={`expense-slider__pointer${i+1===numberActive?'--active':''}`} key={i}></div>
                            )
                        })}
                    </div>
                </div>
            </div>
        }        
        </>
    )
}
