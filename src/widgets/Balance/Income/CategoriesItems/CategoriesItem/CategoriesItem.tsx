import { observer } from "mobx-react-lite";
import { FC } from "react";

type CategoryType = {
    category: string,
    active: string
    onClick: React.MouseEventHandler<HTMLElement>
}

export const CategoriesItem: FC<CategoryType> = observer((
    {
        category,
        active,
        onClick
    }) => {


    return (
        <li
            className={`balance__categories-item ${active}`}
            onClick={onClick}
        >
            {category}
        </li>
    )
})