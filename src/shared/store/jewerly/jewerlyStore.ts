import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { ValuableRequest } from "../../../app/types/request/requestTypes";
import { ValuableService } from "../../http/actives/valuable";
import { JewerlyDto } from "../../../app/types/dto/DtoTypes";
import { AssetsService } from "../../http/actives";
import { makePersistable } from "mobx-persist-store";
import localforage from "localforage"

const isBrowser = typeof window !== 'undefined';

export class JewerlyStore {
    name: string = ''
    purchase_price: string = ''
    estimated_value: string = ''
    comment: string = ''
    photo: string = ''
    current_jewerly: JewerlyDto | undefined = undefined
    jewerly__list: JewerlyDto[] | undefined = undefined
    show: boolean = false
    show_modal: boolean = false
    isActive: boolean = false
    navigate: boolean = false

    constructor(){
        makeAutoObservable(this)
        makePersistable(this, {
            name: "JewerlyStore",
            storage: localforage,
            properties: [
                "jewerly__list",
                "current_jewerly"
            ]
        })
    }

    setShow = (bool: boolean) => {
        this.show = bool
    }

    setShowModal = (bool: boolean) => {
        this.show_modal = bool
    }

    setIsActive = (bool: boolean) => {
        this.isActive = bool
    }

    setJewerlyList = (list: JewerlyDto[]) => {
        this.jewerly__list = list
    }

    setNavigate = (bool: boolean) => {
        this.navigate = bool
    }

    setCurrentJewerly = (id: number) => {
        const current_jewerly = this.jewerly__list?.find((item) => item.id === id)
        this.current_jewerly = current_jewerly
    }

    handleClickShow = () => {
        this.setShowModal(true)
    }

    handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        this.name = e.target.value
    }

    handleChangePurchasePrice = (value: string) => {
        this.purchase_price = value
    }

    handleChangeEstimatedValue = (value: string) => {
        this.estimated_value = value
    }

    handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.comment = e.target.value
    }

    handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        this.photo = e.target.value
    }

    handleCloseForm = () => {
        this.setShow(false)
        this.name = ''
        this.purchase_price = ''
        this.estimated_value = ''
        this.comment = ''
    }

    handleCloseChangeForm = () => {
        this.setShowModal(false)
        this.name = ''
        this.purchase_price = ''
        this.estimated_value = ''
        this.comment = ''
    }

    handleMouseOver = () => {
        this.setIsActive(true)
    }

    handleMouseOut = () => {
        this.setIsActive(false)
    }

    createValuable(valuable: ValuableRequest){
        return ValuableService.createValuable(valuable)
    }

    changeJewerly(jewerly: ValuableRequest, id: string){
        return ValuableService.changeJewerly(jewerly, id)
    }

    removeJewerly(id: string){
        return ValuableService.removeJewerly(id)
    }

    fetchActives(){
        return AssetsService.fetchActives()
    }
}