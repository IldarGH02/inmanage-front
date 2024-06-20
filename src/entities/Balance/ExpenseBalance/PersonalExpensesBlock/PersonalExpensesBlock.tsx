import React, { memo, useEffect, useState } from "react";
import "./personalExpensesBlock.css";
// import { Modal } from "../../../../widgets/modalWindow/Modal"; 
// import { SelectIconModal } from "../../../../widgets/elements/Modal/balance/SelectIconModal/SelectIconModal";
import { IExpensePersonalIcons } from "../../../../app/types/balance/IBalance";
import { useDispatch } from "react-redux";
import { actionTypesBalance } from "../../../../app/store/types/balanceTypes";
import { addPersonalExpenseCategory, showLoader } from "../../../../app/store/actions/balance/balanceActions";
import { SelectedItemSlider } from "../../SelectedItemSlider/SelectedItemSlider";

import loop from "../../../../shared/assets/img/balance/addExpense/loop.png"

interface IIconBalance {
    id: number,
    src: string
}

interface IPersonalExpensesBlock {
    allIconsData: IIconBalance[],
    onBigBlockVisible: ()=>void,
    idActiveIcon: number|null,
    setIdActiveIcon: (id: number|null, title: string)=>void
    iconsData: IExpensePersonalIcons[],
}

interface ISelectedItem {
    img: string,
    title: string
}

export const PersonalExpensesBlock = memo(function PersonalExpensesBlock({allIconsData, onBigBlockVisible, iconsData, idActiveIcon, setIdActiveIcon}: IPersonalExpensesBlock) {
    const dispatch = useDispatch()
    const [selectIconModalVisible, setSelectIconModalVisible] = useState(false)
    const [icons, setIcons] = useState<IExpensePersonalIcons[][]>([])
    const [allIcons, setAllIcons] = useState<IIconBalance[]>([])
    const [widthSlider, setWidthSlider] = useState(0)
    const [widthProgress, setWidthProgress] = useState(0)
    const [selectedItem, setSelectedItem] = useState<null|ISelectedItem>(null)
    const [widthProgressLine, setWidthProgressLine] = useState(0)

    useEffect(()=>{
        if(!selectedItem) {
            const widthProgressTmp = (document.querySelector(".personal-expenses-block__progress") as HTMLElement).offsetWidth
            const widthSlider = (document.querySelector(".personal-expenses-block__categories-list") as HTMLElement).offsetWidth
            const widthLine = (document.querySelector('.personal-expenses-block__categories-list-line') as HTMLElement).offsetWidth;
            setWidthProgressLine(widthProgressTmp/Math.round(widthSlider/widthLine));
            (document.querySelector(".personal-expenses-block__progress-line") as HTMLElement).style.width = `${widthProgressTmp/Math.round(widthSlider/widthLine)}px`
        }
        console.log(selectIconModalVisible)
    }, [icons])

    useEffect(()=>{
        if(!selectedItem) {
            if(widthProgressLine!==0) {
                (document.querySelector(".personal-expenses-block__progress-line") as HTMLElement).style.width = `${widthProgressLine}px`
            } else {
                
                const widthProgressTmp = (document.querySelector(".personal-expenses-block__progress") as HTMLElement).offsetWidth
                console.log('widthProgressTmp', widthProgressTmp)
                const widthSlider = (document.querySelector(".personal-expenses-block__categories-list") as HTMLElement).offsetWidth
                const widthLine = (document.querySelector('.personal-expenses-block__categories-list-line') as HTMLElement).offsetWidth;
                setWidthProgressLine(widthProgressTmp/Math.round(widthSlider/widthLine));
                (document.querySelector(".personal-expenses-block__progress-line") as HTMLElement).style.width = `${widthProgressTmp/Math.round(widthSlider/widthLine)}px`
            }           
        }
    }, [selectedItem])

    useEffect(()=>{
        if(iconsData?.length!==icons.length && allIconsData.length!==0) {
            let arrIcons: IExpensePersonalIcons[] = []
            if(iconsData) {
                arrIcons = [...iconsData]
            }
            arrIcons.push({
                id: -1,
                icon_id: -1,
                title: "string"
            } as IExpensePersonalIcons)
            let newArr = []
            let arrTmp = []
            for(let i=0; i<arrIcons.length; i++) {
                if(arrIcons[i] && arrIcons[i].icon_id!==-1) {
                    let iconTmp = allIconsData[arrIcons[i].icon_id]
                    arrTmp.push({
                        id: iconTmp.id,
                        title: arrIcons[i].title,
                        icon_id: arrIcons[i].icon_id
                    })
                } else {
                    arrTmp.push(arrIcons[i])
                }
                if(i%7===0 && i!==0) {
                    newArr.push(arrTmp)
                    arrTmp = []
                }
            }
            if(arrTmp.length>0) {
                newArr.push(arrTmp)
            }
            setIcons(newArr as IExpensePersonalIcons[][])
        }
    }, [iconsData])

    useEffect(()=>{
        let arr = [...allIconsData]
        arr.push({
            id: -1,
            src: "string"
        } as IIconBalance)
        setAllIcons(arr)
    }, [allIconsData])

    const nextSlider = () => {
        const widthProgressTmp = (document.querySelector(".personal-expenses-block__progress") as HTMLElement).offsetWidth
        const widthLine = (document.querySelector('.personal-expenses-block__categories-list-line')as HTMLElement).offsetWidth
        const widthSliderTmp = (document.querySelector(".personal-expenses-block__categories-list") as HTMLElement).offsetWidth
        if((widthSlider+widthLine)<=widthSliderTmp) {
            setWidthProgress(prev=>prev+widthProgressTmp/Math.round(widthSliderTmp/widthLine))
            setWidthSlider(widthSlider+widthLine)
        }
    }

    const yearlySlider = () => {
        const widthProgressTmp = (document.querySelector(".personal-expenses-block__progress") as HTMLElement).offsetWidth
        const widthLine = (document.querySelector('.personal-expenses-block__categories-list-line')as HTMLElement).offsetWidth
        const widthSliderTmp = (document.querySelector(".personal-expenses-block__categories-list") as HTMLElement).offsetWidth

        if(widthSlider!==0) {
            setWidthProgress(prev=>prev-widthProgressTmp/Math.round(widthSliderTmp/widthLine))
            setWidthSlider(widthSlider-widthLine)
        }
    }

    const closeSelectIconModal = (newIcon?: IExpensePersonalIcons) => {
        if(newIcon) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            const res = addPersonalExpenseCategory(actionTypesBalance.ADD_EXPENSE_PERSONAL_CATEGORY, newIcon)
            res.then(e => {
                dispatch(e!)
            })
            .catch((e) => {
                console.log(e)
            })
        }
        setSelectIconModalVisible(false)
    }

    closeSelectIconModal()

    const clickItem = (id: number, title: string, img: string) => {
        setIdActiveIcon(id!, title)
        setSelectedItem({
            img: img,
            title: title, 
        })
    }

    useEffect(()=>{
        if(idActiveIcon) {
            const iconTmp = iconsData.find(el=>el.icon_id===idActiveIcon)
            const imgTmp = allIconsData.find(el=>el.id===iconTmp?.icon_id)?.src 
            if(iconTmp && imgTmp) {
                console.log({
                        img: imgTmp,
                        title: iconTmp.title
                    })
                setSelectedItem({
                    img: imgTmp,
                    title: iconTmp.title
                })
            }
        } else {
            setSelectedItem(null)
        }
    }, [idActiveIcon])

    return (
        <>
        {/* {selectIconModalVisible &&
            <Modal onClose={()=>setSelectIconModalVisible(false)}>
                <SelectIconModal data={allIconsData} onClose={closeSelectIconModal}/>
            </Modal>
        } */}
        {selectedItem && 
            <SelectedItemSlider img={selectedItem.img} title={selectedItem.title} onClickItem={()=>{
                setIdActiveIcon(null, '')
                setSelectedItem(null)
            }}/>
        }
        {!selectedItem &&
            <div className="personal-expenses-block">
                <div className="personal-expenses-block__search">
                    <input className="personal-expenses-block__search-input" placeholder="Поиск наименования"/>
                    <img src={loop} className="personal-expenses-block__search-img" alt="loop" />
                </div>
                <div className="personal-expenses-block__categories">
                    <button className="personal-expenses-block-btn personal-expenses-block__yearly-btn" onClick={yearlySlider}></button>
                    <button className="personal-expenses-block-btn personal-expenses-block__next-btn" onClick={nextSlider}></button>
                    <button className="personal-expenses-block-btn personal-expenses-block__extend-btn" onClick={onBigBlockVisible}></button>
                    <div className="personal-expenses-block__progress">
                        <span className="personal-expenses-block__progress-line" style={{
                            transform: `translateX(${widthProgress}px)`
                        }}></span>
                    </div>
                    <div className="personal-expenses-block__categories-list-line">
                        <div className="personal-expenses-block__categories-list" style={{
                            transform: `translateX(-${widthSlider}px)`
                        }}>
                            {icons.map((column, i)=>{
                                return (
                                    <div className="personal-expenses-block__categories-column" key={i}>
                                        {column.map(el=>{
                                            if(el.id && el.id===-1) {
                                                return (
                                                    <div className="personal-expenses-block__icon-add" key={el.id} onClick={()=>setSelectIconModalVisible(true)}>
                                                        <button className="personal-expenses-block__icon-add-btn">+</button>
                                                        <div className="personal-expenses-block__icon-add-title">Добавить</div>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div className="personal-expenses-block__icon" onClick={()=>clickItem(el.icon_id!, el.title, allIcons[el.icon_id-1].src)} key={el.id}>
                                                    <div className={`personal-expenses-block__icon-wrapper${idActiveIcon===el.icon_id?'--active':''}`}>
                                                        <img className="personal-expenses-block__icon-img" src={allIcons[el.icon_id-1].src} alt="" />
                                                    </div>
                                                    <div className={`personal-expenses-block__icon-title${idActiveIcon===el.id?'--active':''}`}>{el.title}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
})
