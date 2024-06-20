import "./profilePage.css"
import { ProfileSetting } from "../../widgets/profile/profileSetting/ProfileSetting"
import { ExtendedSetting } from "../../widgets/profile/ExtendedSetting/ExtendedSetting"
import { Background } from "../../widgets/elements/Background/Background"

import walletBckg from '../../shared/assets/img/balance/walletBckg.png'

export function ProfilePage() {
    return (
        <>
        <Background imgBckg={walletBckg}/>
        <div className="profile-page">
            <div className="profile-page__container" >
                    <div className="profile-page__title">Личный кабинет</div>
                <div className="profile-page__content">
                    <div className="profile-page__profile-setting">
                        <ProfileSetting/>
                    </div>
                    <div className="profile-page__extended-setting">
                       <ExtendedSetting/>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

