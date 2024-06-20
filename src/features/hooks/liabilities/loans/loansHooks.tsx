import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { ILoansDTO } from '../../../../app/types/dto/assets/IAssetsLiabilitiesDTO'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

// let data:ILiabilitiesLoans[] = [
//   {
//     id: 1,
//     user_id: 1,
//     name: 'какое-то',
//     // date: '19.04.2023',
//     insurance: false, // страховка
//     insurance_sum: 0, // стоимость страховки
//     remainder: 120000,//остаток
   



//     sum: 120000,//сумма кредита
//     loan_term: 5, // срок кредитования
//     percentage: 4.5, //процентная ставка
//     month_payment: 25000, // ежемесячный платеж
//     maintenance_cost: 1000 // стоимость обслуживания
//   },
//   {
//     id: 2,
//     user_id: 1,
//     name: 'какое-то',
//     // date: '19.04.2023',
//     insurance: false, // страховка
//     insurance_sum: 0, // стоимость страховки
//     remainder: 120000,//остаток



//     sum: 120000,//сумма кредита
//     loan_term: 5, // срок кредитования
//     percentage: 4.5, //процентная ставка
//     month_payment: 25000, // ежемесячный платеж
//     maintenance_cost: 1000 // стоимость обслуживания
//   }
// ]

export function useLoans() {
  const [loans, setLoans] = useState<any>([])
  const [loan, setLoan] = useState<any>({
    name: '',
    date: '',
    insurance: false, // страховка
    insurance_sum: 0, // стоимость страховки
    remainder: 0,//остаток

    sum: 0,//сумма кредита
    loan_term: 0, // срок кредитования
    percentage: 0, //процентная ставка
    month_payment: 0, // ежемесячный платеж
    maintenance_cost: 0 // стоимость обслуживания
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function addLoan() {
    // let data = {
    //   user_id: 1,
    //   ...loan,
    //   // loan: transportItem.loan_term > 0 ? true : false
    // }
    try {
        // setLoans(prev=>[...prev, loan])
        // const res = await axios.post(`${API_URL}/passives/loans/`, data)
        // const elems = await (await axios.get(`${url}/passives/loans/`)).data
        // setLoans(prev=>[...prev, res.data])
    } catch (error) {
        // throw new Error(error.message)
        console.log(error)
    }
    
  }

  async function getLoans() {
    try {
        // setLoans(data)
      setError('')
      setLoading(true)
      const response = await axios.get<any>(`${API_URL}/passives/loans/`)
      setLoans(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  async function getLoan(loan_id: number) {
    try {
        // setLoans(data)
      setError('')
      setLoading(true)
      const response = await axios.get<any>(`${API_URL}/passives/loans/`)
      const loan = response.data.find((el: any)=>{
        if(el.id! === loan_id) {
          return el
        }
      })
      setLoan(loan!)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editLoan = async (newDt:ILoansDTO) => {
    // console.log(newDt)
    try {
        const res = await axios.patch(`${API_URL}/passives/loans/up/${newDt.id}`, newDt)
        setLoan(res.data)
    } catch (error) {
        console.log(error)
    }
  }

    const removeLoan = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/passives/loans/del/${id}`)
            // let newLoans = loans.filter(el => el.id !== id)
            // setLoans(newLoans)
        } catch (error) {
            console.log(error)
        }
        
    }

  useEffect(() => {
    getLoans()
  }, [])

  return { loan, getLoan, editLoan, loans, error, loading, addLoan, removeLoan, getLoans }
}