import { makeAutoObservable } from 'mobx'

export default class PassivesStore {
    constructor() {
        makeAutoObservable(this)
    }
}