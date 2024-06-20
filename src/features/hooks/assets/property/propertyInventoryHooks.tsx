import { useEffect, useState } from 'react'
import axios from 'axios'
import { IInventoryProperty } from '../../../../app/types/assets/property/IProperty'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

interface IInventoryDto {
  name: string,
  price: number,
  property_id?: number
}

export function usePropertyInventory() {
  const [inventoryArr, setInventoryArr] = useState<IInventoryProperty[]>([])
  const [newData, setNewData] = useState<IInventoryProperty[]>([])
  const [count, setCount] = useState(0)
    const [generalPrice, setGeneralPrice] = useState(0)

const getInventory = async (id: number) => {
  try {
    const response = await axios.get<IInventoryProperty[]>(`${API_URL}/actives/property-asset/${id}`)
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
    // await axios.post(`${url}/actives/property-asset/`, obj)
    // const elems = await (await axios.get(`${url}/actives/property-asset/${id}`)).data
    // setNewData(prev=>[{id: Number(new Date()),...obj, property_id: obj.property_id!},...prev])  
    setCount(count+1)
    setGeneralPrice(generalPrice + obj.price)
} catch (error) {
    // throw new Error(error.message)
    console.log(error)
}
}

const changeInventoryAll = async () => {
  console.log(newData)
  try {
    newData.forEach(async (el: IInventoryProperty)=>{
      if(!inventoryArr.includes(el)) {
        let obj: IInventoryDto = {
          name: el.name,
          price: el.price,
          property_id: el.property_id
        }
        await axios.post(`${API_URL}/actives/property-asset/`, obj)
      }
      
    })
    inventoryArr.forEach(async (el: IInventoryProperty)=>{
      if(!newData.includes(el)) {
        await axios.delete(`${API_URL}/actives/property-asset/del/${el.id}`)
      }
    })
} catch (error) {
    // throw new Error(error.message)
    console.log(error)
}
}

const removeInventory = async (id: number) => {
  try {
    // await axios.delete(`${url}/actives/property-asset/del/${id}`)
    let newInventoryArr = newData.filter(el => {
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

  useEffect(() => {
    // getBusiness()
  }, [])

  return { getInventory, newData, addInventory, removeInventory, changeInventoryAll, count, generalPrice }
}