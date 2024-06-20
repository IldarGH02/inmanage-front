import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { IAssetsBusiness, IInventoryBusiness } from '../../../../app/types/assets/business/IBusiness'
import { IBusinessDTO, IInventoryDto } from '../../../../app/types/dto/assets/IAssetsLiabilitiesDTO'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

export function useBusiness() {
  const [businessArr, setBusinessArr] = useState<IAssetsBusiness[]>([])
  const [business, setBusiness] = useState<IAssetsBusiness | any>(
    {
      address:'',
      name: '',
      direction: '',
      month_income: 0,
      month_expense: 0,
      average_profit: 0,
      revenue: 0,
      own_funds: 0,
      third_party_tools: 0,
      third_party_tools_percentage: 0,
      creditor: '',
      loan_term: 0,
      percentage: 0,
      loan_sum: 0,
      month_payment: 0,
      type: false,
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inventoryArr, setInventoryArr] = useState<IInventoryBusiness[]>([])

  async function addBusiness(busItem: IAssetsBusiness | any) {
    let data = {
      user_id: 1,
      ...busItem,
      loan: busItem.loan_sum > 0 ? true : false
    }
    try {
      const res = await axios.post(`${API_URL}/actives/business/`, data)
      setBusinessArr(prev=>[...prev, res.data])
    } catch (error) {
        // throw new Error(error.message)
        console.log(error)
    }
    
  }

  async function getBusinessArr() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IAssetsBusiness[]>(`${API_URL}/actives/business/`)
      setBusinessArr(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  async function getBusiness(business_id: number) {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IAssetsBusiness[]>(`${API_URL}/actives/business/`)
      const businessTmp = response.data.find(el => {
        if(el.id! === business_id) {
          return el
        }
      })
      setBusiness(businessTmp!)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editBusiness = async (newDt:IBusinessDTO) => {
    try {
        const res = await axios.patch(`${API_URL}/actives/business/up/${newDt.id}`, newDt)
        // let transoprtsTmp = business.map((el)=>{
        //     if(el.id === newDt.id) {
        //         el.name = newDt.name
        //         el.address = newDt.address
        //         el.direction = newDt.direction
        //         el.type = newDt.type
        //     }
        //     return el
        // })
        setBusiness(res.data)
    } catch (error) {
        console.log(error)
    }
}

const removeBusiness = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/actives/business/del/${id}`)
        // let newTransports = business.filter(el => el.id !== id)
        // setBusiness(newTransports)
    } catch (error) {
        console.log(error)
    }
    
}

const getInventory = async (id: number) => {
  try {
    const response = await axios.get<IInventoryBusiness[]>(`${API_URL}/actives/business-asset/${id}`)
    setInventoryArr(response.data)
  } catch (error) {
    console.log(error)
  }
}

const addInventory = async (obj: IInventoryDto, id: number) => {
  try {
    // obj.business_id = inventoryArr[0].business_id
    const newObj = {
      business: id,
      ...obj
    }
    const response = await axios.post(`${API_URL}/actives/business-asset/`, newObj)
    // const elems = await (await axios.get(`${API_URL}/actives/property-asset/`)).data
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
    await axios.delete(`${API_URL}/actives/business-asset/del/${id}`)
    let newInventoryArr = inventoryArr.filter(el => el.id !== id)
    setInventoryArr(newInventoryArr)
  } catch (error) {
    console.log(error)
  }
}

const editInventory = async (id: number) => {
  try {
    const res = await axios.put(`${API_URL}/actives/business-asset/up/${id}`, )
    const newArr:IInventoryBusiness[] = inventoryArr.map(el=>{
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
    getBusinessArr()
  }, [])

  return { getBusinessArr, editInventory, getBusiness, businessArr, business, error, loading, addBusiness, editBusiness, removeBusiness, getInventory, inventoryArr, addInventory, removeInventory }
}