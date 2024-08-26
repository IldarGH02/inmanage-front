import { NavLink } from "react-router-dom";
import "./navbar.scss"

interface NavbarList {
    path: string,
    name: string
}

const navbarList: NavbarList[] = [
    {
        path: "/balance",
        name: "Баланс"
    },
    {
        path: "/assets",
        name: "Активы"
    },
    {
        path: "liabilities",
        name: "Пассивы"
    },
    {
        path: "/reports",
        name: "Аналитика"
    },
    {
        path: "/planner",
        name: "Планировщик"
    }
]

export function Navbar() {
    return (
        <nav className="nav header__nav">
            <ul className="header__nav-items">
                {
                    navbarList.map(({path, name}) => {
                        return <li key={path} className="header__nav-item">
                                    <NavLink className={`header__nav-link`} to={path}>{name}</NavLink>
                               </li>
                    })
                }
            </ul>
        </nav>
    )
}