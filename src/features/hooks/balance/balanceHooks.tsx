import {useEffect, useState} from 'react'
import {AxiosError} from 'axios'
import { IBalance } from '../../../app/types/balance/IBalance'

// const API_URL = process.env.REACT_APP_PRIVATE_API_URL

let data:any = [
  { 
    id: 1,
    user_id: 1,
    name: 'Карта сбера',
    sum: 30250, 
    numbers: '4872 4872 4872 4872', //последние 4 цифры карты
    month_income: 34489.5,
    month_expense: 5489.2
  },
  { 
    id: 2,
    user_id: 1,
    name: 'Карта сбера',
    sum: 250, 
    numbers: '4872 4872 4872 4872', //последние 4 цифры карты
    month_income: 34489.1,
    month_expense: 500489.9
  }
]

export function useBalance() {
  const [balanceItems, setBalanceItems] = useState<IBalance[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function addBalanceItem(transport: IBalance) {
    try {
      setBalanceItems(prev=>[...prev, transport])
    } catch (error) {
        console.log(error)
    }
    
  }

  async function getBalanceItems() {
    try {
      setBalanceItems(data)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

const removeBalanceItem = async (id: number) => {
    try {
        // await axios.delete(`${url}/actives/transport/del/${id}`)
        let newTransports = balanceItems.filter(el => el.id !== id)
        setBalanceItems(newTransports)
    } catch (error) {
        console.log(error)
    }
    
}

  useEffect(() => {
    getBalanceItems()
  }, [])

  return { balanceItems, error, loading, addBalanceItem, removeBalanceItem }
}