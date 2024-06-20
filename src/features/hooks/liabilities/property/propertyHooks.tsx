import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { IInventoryProperty } from '../../../../app/types/assets/property/IProperty'
import { IInventoryDto, IPropertyDTO } from '../../../../app/types/dto/assets/IAssetsLiabilitiesDTO'
import { ILiabilitiesProperty } from '../../../../app/types/liabilities/property/IProperty'

// const url = 'http://127.0.0.1:8000'
const url = 'http://194.87.252.100:80'

export function useProperty() {
  const [properties, setProperties] = useState<ILiabilitiesProperty[]>([])
  const [property, setProperty] = useState<ILiabilitiesProperty>({
    name: '',
    address: '',
    bought_price: 0, //цена покупки
    actual_price: 0,
    // revenue: 0,//доход
    equipment_price: 0,//цена оборудования
    // month_income: 0,
    month_expense: 0,
    average_consumption: 0,
    rent_type: false,//long_rent

    credit_indicator: false,//мое
    
    average_market_price: 0,
    min_market_price: 0,
    max_market_price: 0,
    expenses: [],
    total_expense: 0,
    initial_payment: 0,//первый взнос
    loan_term: 0, // срок кредитования
    percentage: 0, //процентная ставка
    month_payment: 0, // ежемесячный платеж
    owner: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inventoryArr, setInventoryArr] = useState<IInventoryProperty[]>([])

  async function addProperty(propertyItem: ILiabilitiesProperty) {
    let data = {
      user_id: 1,
      ...propertyItem,
      loan: propertyItem.loan_term > 0 ? true : false
    }
    // console.log(propertyItem)
    try {
        const res = await axios.post(`${url}/passives/properties/`, data)
        setProperties(prev=>[...prev, res.data])
        // const elems = await (await axios.get(`${url}/actives/properties/`)).data
        // setProperty(elems)  
    } catch (error) {
        console.log(error)
    }
    
  }

  const getProfit = ()=> {
    if(property.actual_price === 0 || property.bought_price===0) {
      return 0
    }
    let a = property.bought_price>=property!.actual_price?property.bought_price/property.actual_price*100:((-property.actual_price/property.bought_price)*100)
    return a
  }

  async function getProperties() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<ILiabilitiesProperty[]>(`${url}/passives/properties/`)
      setProperties(response.data)
      // console.log(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  async function getProperty(property_id: number) {
    try {
      setError('')
      setLoading(true)
      const response = await ( await axios.get<ILiabilitiesProperty[]>(`${url}/passives/properties/`)).data
      const propertyTmp = response.find(el=>{
        if(el.id! === property_id) {
          return el
        }
      })
      // console.log(propertyTmp)
      setProperty(propertyTmp!)
      // const response = await axios.get<IAssetsProperty>(`${url}/actives/property-asset/${property_id}/`)
      // setProperty(response.data)
      // console.log(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editProperty = async (newDt:IPropertyDTO) => {
    try {
        const res = await axios.patch(`${url}/passives/properties/up/${newDt.id}`, newDt)
        // console.log(res.data)
        // let propertyTmp = property 
        // propertyTmp.name = newDt.name
        // propertyTmp.address = newDt.address
        // propertyTmp.owner = newDt.owner
        // console.log(propertyTmp)
        setProperty(res.data)
    } catch (error) {
        console.log(error)
    }
}

const removeProperty = async (id: number) => {
    try {
        await axios.delete(`${url}/passives/properties/del/${id}`)
        // let newProperties = property.filter(el => el.id !== id)
        // setProperty(newProperties)
    } catch (error) {
        console.log(error)
    }
    
}

const getInventory = async (id: number) => {
  try {
    const response = await axios.get<IInventoryProperty[]>(`${url}/passives/property-asset/${id}`)
    setInventoryArr(response.data)
  } catch (error) {
    console.log(error)
  }
}

const addInventory = async (obj: IInventoryDto, id: number) => {
  try {
    // obj.business_id = inventoryArr[0].business_id
    const newObj = {
      property: id,
      ...obj
    }
    const response = await axios.post(`${url}/passives/property-asset/`, newObj)
    // const elems = await (await axios.get(`${url}/actives/property-asset/`)).data
    // console.log(response.data)
    setInventoryArr(prev=>[...prev, response.data])
    // setInventoryArr(response.data)  
} catch (error) {
    // throw new Error(error.message)
    console.log(error)
}
}

const removeInventory = async (id: number) => {
  try {
    await axios.delete(`${url}/passives/property-asset/del/${id}`)
    let newInventoryArr = inventoryArr.filter(el => el.id !== id)
    setInventoryArr(newInventoryArr)
  } catch (error) {
    console.log(error)
  }
}

const editInventory = async (id: number) => {
  try {
    const res = await axios.put(`${url}/passives/property-asset/up/${id}`, )
    const newArr:IInventoryProperty[] = inventoryArr.map(el=>{
      if(el.id===id) {
        return res.data
      }
      return el
    })
    // newArr.push(res.data)
    // let newInventoryArr = inventoryArr.filter(el => el.id !== id)
    setInventoryArr(newArr)
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    getProperties()
  }, [])

  return { editInventory, getInventory, removeInventory, addInventory, getProfit, inventoryArr, property, properties, error, loading, addProperty, removeProperty, getProperty, getProperties, editProperty }
}