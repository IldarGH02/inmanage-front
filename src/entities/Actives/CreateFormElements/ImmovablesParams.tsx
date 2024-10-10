
import { FC, useContext } from "react";
import { InputText } from "../../../shared/ui/input/InputText"
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import './ImmovablesParams.scss';
import { Select } from "../../../widgets/Custom/Select";

interface Props {
    error_name: string
}

export const ImmovablesParams: FC<Props> = observer(({error_name}) => {
    const { immovablesStore } = useContext(Context).rootStore

    const selectedFacing = immovablesStore.facing_list.find((item) => item.content === immovablesStore.facing)
    const selectedConstruction = immovablesStore.construction_list.find((item) => item.content === immovablesStore.construction)
    const selectedBalcony = immovablesStore.balcony_existence.find((item) => item.content === immovablesStore.balcony_value)
    const selectedRooms = immovablesStore.rooms_list.find((item) => item.content === immovablesStore.rooms)
    

    return (
        <div className="immovables__params">
            <InputText
                placeholder="Название недвижимости"
                value={immovablesStore.immovables_name}
                type="text"
                onChange={immovablesStore.handleChangeImmovablesName}
            />

            {error_name ? <p>{error_name}</p> : null}
            <InputText
                placeholder="Город"
                value={immovablesStore.city}
                type="text"
                onChange={immovablesStore.handleChangeCity}
            />
            <InputText
                placeholder="Улица"
                value={immovablesStore.street}
                type="text"
                onChange={immovablesStore.handleChangeStreet}
            />
            <InputText
                placeholder="Номер дома"
                value={immovablesStore.home}
                type="text"
                onChange={immovablesStore.handleChangeHome}
            />
            <Select
                onChange={immovablesStore.handleChangeConstruction}
                selected={selectedConstruction || null}
                options={immovablesStore.construction_list}
                placeholder="Конструкция"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
            <InputText
                placeholder="Количество этажей"
                value={immovablesStore.floors}
                type="text"
                onChange={immovablesStore.handleChangeFloors}
            />
            <Select
                onChange={immovablesStore.handleChangeFacing}
                selected={selectedFacing || null}
                options={immovablesStore.facing_list}
                placeholder="Отделка"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
            <Select
                onChange={immovablesStore.handleChangeRooms}
                selected={selectedRooms || null}
                options={immovablesStore.rooms_list}
                placeholder="Количество комнат"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
            <Select
                onChange={immovablesStore.handleChangeBalconyValue}
                selected={selectedBalcony || null}
                options={immovablesStore.balcony_existence}
                placeholder="Есть балкон?"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
        </div>
    )
})