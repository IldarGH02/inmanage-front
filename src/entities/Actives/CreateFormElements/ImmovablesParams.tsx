import { FC } from "react"
import { InputText } from "../../../shared/ui/input/InputText"
import './ImmovablesParams.scss';

interface ImmovablesParams {
    immovablesName: string
    city: string
    street: string
    home: string
    owner: string
}

export const ImmovablesParams: FC<ImmovablesParams> = (
    {
        immovablesName,
        city,
        street,
        home,
        owner
    }) => {

    return (
        <div className="immovables__params">
            <InputText
                placeholder="Название недвижимости"
                value={immovablesName}
                type="text"
                onChange={() => {}}
            />
            <InputText
                placeholder="Город"
                value={city}
                type="text"
                onChange={() => {}}
            />
            <InputText
                placeholder="Улица"
                value={street}
                type="text"
                onChange={() => {}}
            />
            <InputText
                placeholder="Номер дома"
                value={home}
                type="text"
                onChange={() => {}}
            />
            <InputText
                placeholder="Владелец"
                value={owner}
                type="text"
                onChange={() => {}}
            />
        </div>
    )
}