import { Link } from "react-router-dom";

import { Navbar } from "../Navbar/Navbar";
import avatar from "../../shared/assets/img/avatar1.svg"

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Navbar/>
                    <Link to="/profile">
                        <img src={avatar} alt="logo-img" />
                    </Link>
                </div>
            </div>
        </header>
    )
}