import { FC, useState } from 'react'
import { observer } from "mobx-react-lite";
import { CategoriesItem } from "./CategoriesItem/CategoriesItem.tsx";

type CategoriesType = {
    categories: string[],
    onChangeCategory: (i: number) => void,
    chooseCategory: number,
    classNameCategories: string,
    onClick: React.MouseEventHandler<HTMLElement>
}

export const CategoriesItems: FC<CategoriesType> = observer((
    {
        categories,
        // onChangeCategory,
        chooseCategory,
        classNameCategories,
        onClick
    }) => {
    const [
        activeCategory, 
        // setActiveCategory
    ] = useState(chooseCategory)

    // const changeCategory = (index: number) => {
    //     setActiveCategory(index)
    //     onChangeCategory(index)
    // }

    return (
        <ul className={classNameCategories}>
            {categories.map((category, index) => (
                <CategoriesItem
                    key={category}
                    active={activeCategory === index ? 'active' : ''}
                    // onClick={() => changeCategory(index)}
                    onClick={onClick}
                    category={category}
                />))}
        </ul>
    )
})