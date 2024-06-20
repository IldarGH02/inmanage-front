import {useEffect, useState} from 'react'
import { IProject } from '../../../../app/types/planner/IPlanner'
import { IProjectItemDTO } from '../../../../app/types/dto/planner/projects/IProject'

// const API_URL = process.env.REACT_APP_PRIVATE_API_URL

let data: IProject[] = [
    {
        id: 1, 
        user_id: 1,
        name: 'какое-то',
        date_start: new Date(2024, 4, 16, 15, 24),
        date_end: new Date(2024, 4, 16, 15, 24),
        description: 'sadasdsad',
        planned_sum: 1500000,
        spent_sum: 1000000,
        reserved_sum: 500000,
        writeoff_account: "какой-то"//счет списания
    }
]

export function useProject() {
  const [projects, setProjects] = useState<IProject[]>([])


  async function addProject(project: IProjectItemDTO) {
    let projectTmp: any = {
      // id: Number(new Date()),
      user_id: 1,
      spent_sum: 0,
      ...project
    }
    setProjects(prev=>[...prev, projectTmp])
    // try {
    //     await axios.post(`${url}/actives/transport/`, transport)
    //     const elems = await (await axios.get(`${url}/actives/transport/`)).data
    //     setTransports(elems)  
    // } catch (error) {
    //     // throw new Error(error.message)
    //     console.log(error)
    // }
    
  }

  async function getProjects() {
    setProjects(data)
    // try {
    //   setError('')
    //   setLoading(true)
    //   const response = await axios.get<IAssetsTransport[]>(`${url}/actives/transport/`)
    //   setTransports(response.data)
    //   setLoading(false)
    // } catch (e: unknown) {
    //   const error = e as AxiosError
    //   setLoading(false)
    //   setError(error.message)
    // }
  }

  const editProject = async (newDt: IProjectItemDTO) => {
    let projectsTmp = projects.map((el)=>{
        if(el.id === newDt.id) {
            el.name = newDt.name
            el.date_start = newDt.date_start
            el.date_end = newDt.date_end
            el.description = newDt.description
        }
        return el
    })
    setProjects(projectsTmp)
    // console.log(newDt)
    // try {
    //     const res = await axios.patch(`${url}/actives/transport/up/${newDt.id}`, newDt)
    //     let transoprtsTmp = transoprts.map((el)=>{
    //         if(el.id === newDt.id) {
    //             el.brand = newDt.brand
    //             el.name = newDt.name
    //             el.owner = newDt.owner
    //             el.owner_type = newDt.owner_type
    //             el.use = newDt.use
    //             el.vin = newDt.vin
    //         }
    //         return el
    //     })
    //     setTransports(transoprtsTmp)
    // } catch (error) {
    //     console.log(error)
    // }
}

const removeProject = async (id: number) => {
      let newProjects = projects.filter(el => el.id !== id)
      setProjects(newProjects)
    // try {
    //     await axios.delete(`${url}/actives/transport/del/${id}`)
    //     let newTransports = transoprts.filter(el => el.id !== id)
    //     setTransports(newTransports)
    // } catch (error) {
    //     console.log(error)
    // }
    
}

  useEffect(() => {
    getProjects()
  }, [])

  return { projects, getProjects, addProject, editProject, removeProject }
}