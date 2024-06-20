import React, { useState } from "react";
import "./extendedSetting.css";
import { ProfileDDList } from "../ProfileDDList/ProfileDDList";
import { IProfileDDList } from "../../../app/types/profile/IProfile";
import { ProfileItem } from "../ProfileItem/ProfileItem";

const languageInitial: IProfileDDList[] = [
    {
        id: 1, 
        name: 'Русский',
        active: true,
    },
    {
        id: 2, 
        name: 'Английский',
        active: false,
    },
]

export function ExtendedSetting() {
    const [language, setLanguage] = useState(languageInitial)

    const onSetLanguage = (name: string) => {
        let valTmp = language.map(el=>{
            if(el.active) {
                el.active = false
            }
            if(el.name === name) {
                el.active = true
            }
            return el
        })
        setLanguage(valTmp)
    }

    return (
        <div className="extended-setting">
            <div className="extended-setting__content">
                <div className="extended-setting__item">
                    <ProfileItem title="Добавление в друзья"/>
                </div>
                <div className="extended-setting__item">
                    <ProfileItem title="Обучение"/>
                </div>
                <div className="extended-setting__item">
                    <ProfileDDList data={language} id={'language'} onSetValue={onSetLanguage} name="Язык" placeholder={language.filter(el=>el.active)[0].name}/>
                </div>
                <div className="extended-setting__item">
                    <ProfileItem title="Ваши данные"/>
                </div>
                <div className="extended-setting__item">
                    <ProfileItem title="Помощь техподдержки"/>
                </div>
                <div className="extended-setting-item">
                    <div className="extended-setting-item__title">Реферальная ссылка</div>
                    <div className="extended-setting-item__content">Скопировать</div>
                </div>
                <div className="extended-setting-item">
                    <div className="extended-setting-item__title">Уведомления в браузере</div>
                    <div className="extended-setting-item__toggle">
                    <div className="toggle-switch">
                        <input type="checkbox" className="toggle-switch__checkbox" 
                            name={'toggle-switch'} id={'toggle-switch'} />
                        <label className="toggle-switch__label" htmlFor={'toggle-switch'}>
                        <span className="toggle-switch__inner" />
                        <span className="toggle-switch__switch" />
                        </label>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}