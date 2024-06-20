import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { ITransportDTO } from '../../../../app/types/dto/assets/IAssetsLiabilitiesDTO'
import { ILiabilitiesTransport } from '../../../../app/types/liabilities/transport/ITransport'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

// interface IAssetsTransportDTO {
//     id: number, 
//     name: string,
//     brand: string,
//     owner: string,
//     vin: string,
//     use: string,
//     owner_type: boolean
// }

export function useTransport() {
  const [transports, setTransports] = useState<ILiabilitiesTransport[]>([])
  const [transport, setTransport] = useState<ILiabilitiesTransport | any>({
    mark: '',
    model: '',
    bought_price: 0, //цена покупки
    // revenue: 0,//доход
    // month_income: 0,
    month_expense: 0,
    average_consumption: 0,
    owner_type: false,//физическое лицо

    credit_indicator: false,//мое
    
    average_market_price: 0,
    min_market_price: 0,
    max_market_price: 0,
    images: [],
    expenses: [],
    total_expense: 0,
    initial_payment: 0,//первый взнос
    loan_term: 0, // срок кредитования
    percentage: 0, //процентная ставка
    month_payment: 0, // ежемесячный платеж
    use: '', // назначение
    vin: '',
    owner: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function addTransport(transportItem: ILiabilitiesTransport) {
    let data = {
      user_id: 1,
      ...transportItem,
      loan: transportItem.loan_term > 0 ? true : false
    }
    try {
        // console.log(transport)
        const res = await axios.post(`${API_URL}/passives/transport/`, data)
        setTransports(prev=>[...prev, res.data])
        // const elems = await (await axios.get(`${url}/actives/transport/`)).data
        // setTransports(elems)  
    } catch (error) {
        // throw new Error(error.message)
        console.log(error)
    }
    
  }

  // const getProfit = ()=> {
  //   if(transport.actual_price === 0 || transport.bought_price===0) {
  //     return 0
  //   }
  //   let a = property.bought_price>=property!.actual_price?property.bought_price/property.actual_price*100:((-property.actual_price/property.bought_price)*100)
  //   return a
  // }

  async function getTransports() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<ILiabilitiesTransport[]>(`${API_URL}/passives/transport/`)
      setTransports(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editTransport = async (newDt:ITransportDTO) => {
    console.log(newDt)
    try {
        const res = await axios.patch(`${API_URL}/passives/transport/up/${newDt.id}`, newDt)
        // let transoprtsTmp = transoprts.map((el)=>{
        //     if(el.id === newDt.id) {
        //         // el.brand = newDt.brand
        //         // el.name = newDt.name
        //         el.owner = newDt.owner
        //         el.owner_type = newDt.owner_type
        //         el.use = newDt.use
        //         el.vin = newDt.vin
        //     }
        //     return el
        // })
        setTransport(res.data)
    } catch (error) {
        console.log(error)
    }
}

const removeTransport = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/passives/transport/del/${id}`)
        // let newTransports = transoprts.filter(el => el.id !== id)
        // setTransports(newTransports)
    } catch (error) {
        console.log(error)
    }
    
}

async function getTransport(transport_id: number) {
  try {
    setError('')
    setLoading(true)
    const response = await ( await axios.get<ILiabilitiesTransport[]>(`${API_URL}/passives/transport/`)).data
    const transportTmp = response.find(el=>{
      if(el.id! === transport_id) {
        return el
      }
    })

    setTransport(transportTmp!)

    setLoading(false)
  } catch (e: unknown) {
    const error = e as AxiosError
    setLoading(false)
    setError(error.message)
  }
}

  useEffect(() => {
    getTransports()
  }, [])

  return { getTransport, getTransports, transport, transports, error, loading, addTransport, editTransport, removeTransport }
}