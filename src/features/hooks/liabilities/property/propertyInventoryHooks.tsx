import {useEffect, useState} from 'react'
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
  const [count, setCount] = useState(0)
    const [generalPrice, setGeneralPrice] = useState(0)

const getInventory = async (id: number) => {
  try {
    const response = await axios.get<IInventoryProperty[]>(`${API_URL}/actives/property-asset/${id}`)
    setInventoryArr(response.data)
    setCount(response.data.length)
    setGeneralPrice(response.data.reduce((sum, el) => sum+el.price,0))
  } catch (error) {
    console.log(error)
  }
}

const addInventory = async (obj: IInventoryDto, id: number) => {
  try {
    await axios.post(`${API_URL}/actives/property-asset/`, obj)
    const elems = await (await axios.get(`${API_URL}/actives/property-asset/${id}`)).data
    setInventoryArr(elems)  
    setCount(count+1)
    setGeneralPrice(generalPrice + obj.price)
} catch (error) {
    // throw new Error(error.message)
    console.log(error)
}
}

const removeInventory = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/actives/property-asset/del/${id}`)
    let newInventoryArr = inventoryArr.filter(el => {
      if(el.id!==id) {
        return el
      }
      else {
        setGeneralPrice(generalPrice-el.price)
        setCount(count-1)
      }
    })
    setInventoryArr(newInventoryArr)
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    // getBusiness()
  }, [])

  return { getInventory, inventoryArr, addInventory, removeInventory, count, generalPrice }
}