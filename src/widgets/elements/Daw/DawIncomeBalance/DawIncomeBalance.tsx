import "./dawIncomeBalance.css"

interface IDaw {
    activeChecked: boolean,
    handleChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>,
    color?: string
    id: string
}

export function DawIncomeBalance(
    {
        activeChecked,
        handleChangeCheckbox,
        id,
        color = 'rgb(105, 205, 30)'}: IDaw)

    {

    return (
        <span className="job__item-checkbox">
            <label className="checkbox__label" htmlFor={id}>
                <input type="checkbox" id={id} checked={activeChecked} onChange={handleChangeCheckbox}/>
                <span style={{
                    border: `3px solid ${color}`,
                }}></span>
            </label>
        </span>
    )
}