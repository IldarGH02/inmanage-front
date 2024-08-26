import React, {FC, useEffect, useState} from "react";
import {DropDownItem} from "./DropDownItem.tsx";
import {choices} from "../../../features/lib/choices";
import '../../../features/lib/choice.css'
import {ICarList} from "../../../features/func/parsData.ts";
import {observer} from "mobx-react-lite";

interface DropDown {
    data: ICarList[] | null
    ariaLabel: string
    className: string
    classNameItem: string
    defaultItemText: string
    value: string
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

interface Options {
    allowHTML: boolean,
    noResultsText: string,
    placeholder: boolean,
    placeholderValue: string,
    itemSelectText: string
}

export const DropDown: FC<DropDown> = observer((
    {
        data,
        ariaLabel,
        className,
        classNameItem,
        defaultItemText,
        value,
        onChange
    }) => {
    const [brandElement, setBrandElement] = useState<Element | null>(null);
    const [modelElement, setModelElement] = useState<Element | null>(null);

    const options: Options = {
        allowHTML: false,
        noResultsText: 'Нет совпадений',
        placeholder: true,
        placeholderValue: 'Не выбрано',
        itemSelectText: ''
    }

    useEffect(() => {
        const brandDropdown = document.querySelector(".brand-dropdown");

        setBrandElement(brandDropdown);
        choices(brandElement, className, options)

    }, [brandElement, className, options]);

    useEffect(() => {
        const modelDropdown = document.querySelector(".model-dropdown");

        setModelElement(modelDropdown);
        choices(modelElement, className, options)
    }, []);

    return (
        <select className={className} aria-label={ariaLabel} onChange={onChange} value={value}>
            <option value='' className='default-option'>{defaultItemText}</option>
            {data && data.map((item) => {
                return <DropDownItem item={item} key={item.id} classNameItem={classNameItem}/>
            })}
        </select>
    )
})