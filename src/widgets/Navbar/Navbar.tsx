import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"

export function Navbar() {

    return (
        <>
        <div className="navbar">
            <ul className="navbar__menu-box">
                <li><NavLink className={({ isActive }) => isActive ? 'navbar__item-active' : 'navbar__item'} to="/balance">Баланс</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'navbar__item-active' : 'navbar__item'} to="/assets">Активы</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'navbar__item-active' : 'navbar__item'} to="/liabilities">Пассивы</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'navbar__item-active' : 'navbar__item'} to="/reports">Аналитика</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'navbar__item-active' : 'navbar__item'} to={"/planner"}>Планировщик</NavLink></li>
            </ul>
        </div>
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
            </label>

            <ul className="menu__box">
                <li><NavLink className={({ isActive }) => isActive ? 'menu__item-active' : 'menu__item'} to="/balance">Баланс</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'menu__item-active' : 'menu__item'} to="/assets">Активы</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'menu__item-active' : 'menu__item'} to="/liabilities">Пассивы</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'menu__item-active' : 'menu__item'} to="/reports">Аналитика</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'menu__item-active' : 'menu__item'} to={"/planner"}>Планировщик</NavLink></li>
            </ul>
        </div>
        </>
    )
}