import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { IAssetsProperty, IInventoryProperty } from '../../../../app/types/assets/property/IProperty'
import { IInventoryDto, IPropertyDTO } from '../../../../app/types/dto/assets/IAssetsLiabilitiesDTO'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

export function useProperty() {
  const [properties, setProperties] = useState<IAssetsProperty[]>([])
  const [property, setProperty] = useState<IAssetsProperty>({
    name: '',
    address: '',
    bought_price: 0, //цена покупки
    actual_price: 0,
    revenue: 0,//доход
    equipment_price: 0,//цена оборудования
    month_income: 0,
    month_expense: 0,
    average_profit: 0,
    rent_type: false,//long_rent

    credit_indicator: false,//мое
    
    income: [],
    expenses: [],
    total_income: 0,
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

  async function addProperty(propertyItem: IAssetsProperty) {
    let data = {
      user_id: 1,
      ...propertyItem,
      loan: propertyItem.credit_indicator
    }
    try {
        const res = await axios.post(`${API_URL}/actives/properties/`, data)
        setProperties(prev=>[...prev, res.data]) 
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
      const response = await axios.get<IAssetsProperty[]>(`${API_URL}/actives/properties/`)
      setProperties(response.data)
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
      // const response = await ( await axios.get<IAssetsProperty>(`${url}/actives/property-asset/${property_id}/`)).data
      const response = await ( await axios.get<IAssetsProperty[]>(`${API_URL}/actives/properties/`)).data
      const propertyTmp = response.find(el=>{
        if(el.id! === property_id) {
          return el
        }
      })
      setProperty(propertyTmp!)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editProperty = async (newDt:IPropertyDTO) => {
    try {
        const res = await axios.patch(`${API_URL}/actives/properties/up/${newDt.id}`, newDt)
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
        await axios.delete(`${API_URL}/actives/properties/del/${id}`)
        // let newProperties = property.filter(el => el.id !== id)
        // setProperty(newProperties)
    } catch (error) {
        console.log(error)
    }
    
}

const getInventory = async (id: number) => {
  try {
    const response = await axios.get<IInventoryProperty[]>(`${API_URL}/actives/property-asset/${id}`)
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
    const response = await axios.post(`${API_URL}/actives/property-asset/`, newObj)
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
    await axios.delete(`${API_URL}/actives/property-asset/del/${id}`)
    let newInventoryArr = inventoryArr.filter(el => el.id !== id)
    setInventoryArr(newInventoryArr)
  } catch (error) {
    console.log(error)
  }
}

const editInventory = async (id: number) => {
  try {
    // console.log(id)
    const res = await axios.put(`${API_URL}/actives/property-asset/up/${id}`, )
    // console.log(res.data)
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

  return { 
    editInventory,
    getInventory, 
    removeInventory, 
    addInventory, 
    getProfit, 
    inventoryArr,
    property, 
    properties, 
    error, 
    loading, 
    addProperty, 
    removeProperty, 
    getProperty, 
    getProperties, 
    editProperty 
  }
}