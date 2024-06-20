import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { IProject } from '../../../../app/types/planner/IPlanner'
import { IProjectItemDTO } from '../../../../app/types/dto/planner/projects/IProject'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

export function useProject() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function addProject(project: IProjectItemDTO) {
    let projectTmp = {
      // id: Number(new Date()),
      user_id: 1,
      spent_sum: 0,
      ...project,
      tasks_list: []
      // done:false
    }
  
    // setProjects(prev=>[...prev, projectTmp])
    console.log(projectTmp)
    try {
        await axios.post(`${API_URL}/planner/projects/`, projectTmp)
        const elems = await (await axios.get(`${API_URL}/planner/projects/`)).data
        setProjects(elems)  
    } catch (error) {
        // throw new Error(error.message)
        console.log(error)
    }
    
  }

  async function getProjects() {
    // setProjects(data)
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IProject[]>(`${API_URL}/planner/projects/`)
      console.log(response)
      setProjects(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editProject = async (newDt: IProjectItemDTO) => {
    // let projectsTmp = projects.map((el)=>{
    //     if(el.id === newDt.id) {
    //         el.name = newDt.name
    //         el.date_start = newDt.date_start
    //         el.date_end = newDt.date_end
    //         el.description = newDt.description
    //     }
    //     return el
    // })
    // setProjects(projectsTmp)
    // console.log(newDt)
    try {
        // const res = await axios.patch(`${API_URL}/planner/projects/${newDt.id}/`, newDt)
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
    } catch (error) {
        console.log(error)
    }
}

const removeProject = async (id: number) => {
    // let newProjects = projects.filter(el => el.id !== id)
    // setProjects(newProjects)
    try {
      await axios.delete(`${API_URL}/planner/projects/del/${id}/`)
      let newProjects = projects.filter(el => el.id !== id)
      setProjects(newProjects)
    } catch (error) {
        console.log(error)
    }
    
}

  useEffect(() => {
    getProjects()
  }, [])

  return { projects, error, loading, getProjects, addProject, editProject, removeProject }
}