import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { ValuableRequest } from "../../../app/types/request/requestTypes";
import { ValuableService } from "../../http/actives/valuable";
import { JewelryDto } from "../../../app/types/dto/DtoTypes";
import { AssetsService } from "../../http/actives";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import localforage from "localforage"

export class JewelryStore {
    name: string = ''
    purchase_price: string = ''
    estimated_value: string = ''
    comment: string = ''
    photo: string = ''
    current_jewelry: JewelryDto | undefined = undefined
    jewelry__list: JewelryDto[] | undefined = undefined
    show: boolean = false
    show_modal: boolean = false
    isActive: boolean = false
    navigate: boolean = false

    constructor(){
        makeAutoObservable(this)
        makePersistable(this, {
            name: "JewelryStore",
            storage: localforage,
            properties: [
                "jewelry__list",
                "current_jewelry"
            ]
        })
        stopPersisting(this)
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

    setJewelryList = (list: JewelryDto[]) => {
        this.jewelry__list = list
    }

    setNavigate = (bool: boolean) => {
        this.navigate = bool
    }

    setCurrentJewelry = (id: number) => {
        const current_jewelry = this.jewelry__list?.find((item) => item.id === id)
        this.current_jewelry = current_jewelry
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

    async changeJewelry(jewelry: ValuableRequest, id: string){
        return await ValuableService.changeJewelry(jewelry, id)
    }

    removeJewelry(id: string){
        return ValuableService.removeJewelry(id)
    }

    fetchActives(){
        return AssetsService.fetchActives()
    }
}