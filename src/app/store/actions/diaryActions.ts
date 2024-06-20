import $api from "../../../shared/http/api"
import { IPlannerTaskAdd } from "../../types/planner/IPlanner"

export const setDate = (type: string, date: Date) => {
    return {
        type,
        payload: {
            date: date
        }
    }
}

export const addTaskPlanner = async (type: string, task: IPlannerTaskAdd) => {
    console.log(task)
    // delete task.task
    const response = await $api.post(`/planner/tasks/`, task.task)
    console.log(response.data)
    return {
        type,
        payload: {
            task: task
        }
    }
}

export const setTaskForAdd = (type: string, task: IPlannerTaskAdd) => {
    return {
        type,
        payload: {
            task: task
        }
    }
}

export const setTasks = async (type: string, dateStart: string, dateEnd: string) => {
    try {
        // console.log('aaaa')
        const response = await $api.get(`/planner/calendar/?timedelta=${dateStart},${dateEnd}`)
        // console.log(response.data)
        // console.log('aaaa')
        return ({
            type,
            payload: {
                tasks: response.data.tasks
            }
        })
    } catch (error) {
        
    }
}

export const editDawTask = async (type: string, id: number) => {
    try {
        // const res = await axios.put(`${url}/planner/tasks/${id}/`)
        return {
            type,
            payload: {
                id: id
            }
        }
    } catch (error) {
        
    }
}

export const editDawInnerTask = async (type: string, id: number, idInner: number) => {
    try {
        // const res = await axios.put(`${url}/planner/tasks/${id}/`)
        return {
            type,
            payload: {
                id: id,
                idInner: idInner
            }
        }
    } catch (error) {
        
    }
}

export const removePlannerTask = async (type: string, id: number) => {
    try {
        // await axios.delete(`${url}/planner/tasks/del/${id}/`)
        return {
            type,
            payload: {
                id: id
            }
        }
    } catch (error) {
        
    }
}

export const getTasksByDate = (type: string, date: Date) => {
    return {
        type,
        payload: {
            date: date
        }
    }
}
