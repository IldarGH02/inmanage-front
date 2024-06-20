import React from "react";
import { Route } from "react-router-dom";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";

const profileRouter =
    <Route path='/'>
        <Route path= "profile" element={<ProfilePage/>}/>
    </Route>

export default profileRouter
