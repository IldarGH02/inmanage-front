import React from "react";
import "./profileItem.css";

import vector from "../../../shared/assets/img/profile/vectorR.png"

interface IProfileItem {
    title: string
}

export function ProfileItem({title}: IProfileItem) {
    return (
        <div className="profile-item">
            <div className="profile-item__title">{title}</div>
            <img src={vector} className="profile-item__vector"/>
        </div>
    )
}