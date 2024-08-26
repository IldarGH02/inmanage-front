import { useState } from "react";
import "./profileSetting.css";
import { ProfileDDList } from "../ProfileDDList/ProfileDDList";
import { IProfileDDList } from "../../../app/types/profile/IProfile";
import { ProfileItem } from "../ProfileItem/ProfileItem";

// import { useNavigate } from "react-router-dom";

// import avatar from "../../../shared/actives/img/profile/avatar.png"
// import exit from "../../../shared/actives/img/profile/exit.png"

const valutaInitial: IProfileDDList[] = [
    {
        id: 1, 
        name: 'Российский рубль',
        active: true,
    },
    {
        id: 2, 
        name: 'Американский доллар',
        active: false,
    },
    {
        id: 3, 
        name: 'Китайский юань',
        active: false,
    },
    {
        id: 4, 
        name: 'Беларусский доллар',
        active: false,
    }
]

const secondValutaInitial: IProfileDDList[] = [
    {
        id: 1, 
        name: 'Российский рубль',
        active: false,
    },
    {
        id: 2, 
        name: 'Американский доллар',
        active: true,
    },
    {
        id: 3, 
        name: 'Китайский юань',
        active: false,
    },
    {
        id: 4, 
        name: 'Беларусский доллар',
        active: false,
    }
]

const themeInitial: IProfileDDList[] = [
    {
        id: 1, 
        name: 'Светлая',
        active: true,
    },
    {
        id: 2, 
        name: 'Темная',
        active: false,
    },
]

export function ProfileSetting() {
    const [valuta, setValuta] = useState(valutaInitial)
    const [secondValuta, setSecondValuta] = useState(secondValutaInitial)
    const [theme, setTheme] = useState(themeInitial)

    const onSetValuta = (name: string) => {
        let valutaTmp = valuta.map(el=>{
            if(el.active) {
                el.active = false
            }
            if(el.name === name) {
                el.active = true
            }
            return el
        })
        setValuta(valutaTmp)
    }

    const onSetSecondValuta = (name: string) => {
        let valutaTmp = secondValuta.map(el=>{
            if(el.active) {
                el.active = false
            }
            if(el.name === name) {
                el.active = true
            }
            return el
        })
        setSecondValuta(valutaTmp)
    }

    const onSetTheme = (name: string) => {
        let themeTmp = theme.map(el=>{
            if(el.active) {
                el.active = false
            }
            if(el.name === name) {
                el.active = true
            }
            return el
        })
        setTheme(themeTmp)
    }

    // const exitProfile = () => {
    //     showLoader(actionTypesAuth.SHOW_LOADER_AUTH)
    //     let res = logout(actionTypesAuth.LOGOUT)
    //     res.then((e)=>{
    //         navigate('/entrance')
    //     })
    //     .catch(()=>{
    //         hideLoader(actionTypesAuth.HIDE_LOADER_AUTH)
    //     })
    // } 

    return (
        <div className="profile-setting">
            <div className="profile-setting__header">
                {/* <img src={avatar} className="profile-setting__avatar"/> */}
                <div className="profile-setting__person-data">
                    <div className="profile-setting__name">Василий</div>
                    <div className="profile-setting__profile-id">ID:{784300}</div>
                </div>
                <button className="profile-setting__exit-profile" onClick={()=> {}}>
                    <b className="profile-setting__exit-profile-title">Выйти</b>
                    {/* <img src={exit} className="profile-setting__exit-profile-img"/> */}
                </button>
            </div>
            <div className="profile-setting__content">
                <div className="profile-setting__item">
                    <ProfileDDList data={valuta} id={'valuta'} onSetValue={onSetValuta} name="Основная валюта" placeholder={valuta.filter(el=>el.active)[0].name}/>
                </div>
                <div className="profile-setting__item">
                    <ProfileDDList data={secondValuta} id={'second-valuta'} onSetValue={onSetSecondValuta} name="Второстепенная валюта" placeholder={secondValuta.filter(el=>el.active)[0].name}/>
                </div>
                <div className="profile-setting__item">
                    <ProfileDDList data={theme} id={'theme'} onSetValue={onSetTheme} name="Тема" placeholder={theme.filter(el=>el.active)[0].name}/>
                </div>
                <div className="profile-setting__item">
                    <ProfileItem title="Добавление совместного счета"/>
                </div>
            </div>
        </div>
    )
}