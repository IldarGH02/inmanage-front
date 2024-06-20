import { useState } from 'react'
import axios from 'axios'
import { IInventoryBusiness } from '../../../../app/types/assets/business/IBusiness'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

interface IInventoryDto {
  name: string,
  price: number,
  business_id?: number
}

export function useBusinessInventory() {
  const [inventoryArr, setInventoryArr] = useState<IInventoryBusiness[]>([])
  const [newData, setNewData] = useState<IInventoryBusiness[]>([])
  const [count, setCount] = useState(0)
  const [generalPrice, setGeneralPrice] = useState(0)

  const getInventory = async (id: number) => {
    try {
      const response = await axios.get<IInventoryBusiness[]>(`${API_URL}/actives/business-asset/${id}`)
      setInventoryArr(response.data)
      setNewData(response.data)
      setCount(response.data.length)
      setGeneralPrice(response.data.reduce((sum, el) => sum+el.price,0))
    } catch (error) {
      console.log(error)
    }
  }

  const addInventory = async (obj: IInventoryDto) => {
    try {
      // await axios.post(`${API_URL}/actives/business-asset/`, obj)
      // const elems = await (await axios.get(`${API_URL}/actives/business-asset/${id}`)).data
      // setInventoryArr(elems)  
      // setNewData(prev=>[{id: Number(new Date()),...obj, business_id: obj.business_id!},...prev])  
      setCount(count+1)
      setGeneralPrice(generalPrice + obj.price)
  } catch (error) {
      // throw new Error(error.message)
      console.log(error)
  }
  }

  const changeInventoryAll = async () => {
    try {
      newData.forEach(async (el: IInventoryBusiness)=>{
        if(!inventoryArr.includes(el)) {
          let obj: IInventoryDto = {
            name: el.name,
            price: el.price,
            business_id: el.business_id
          }
          await axios.post(`${API_URL}/actives/business-asset/`, obj)
        }
        
      })
      inventoryArr.forEach(async (el: IInventoryBusiness)=>{
        if(!newData.includes(el)) {
          await axios.delete(`${API_URL}/actives/business-asset/del/${el.id}`)
        }
      })
  } catch (error) {
      // throw new Error(error.message)
      console.log(error)
  }
  }

  const removeInventory = async (id: number) => {
    try {
      // await axios.delete(`${url}/actives/business-asset/del/${id}`)
      let newInventoryArr = inventoryArr.filter(el => {
        if(el.id!==id) {
          return el
        }
        else {
          setGeneralPrice(generalPrice-el.price)
          setCount(count-1)
        }
      })
      setNewData(newInventoryArr)
    } catch (error) {
      console.log(error)
    }
  }

  return { getInventory, newData, addInventory, removeInventory, changeInventoryAll, count, generalPrice }
}