import { IPlannerTask } from "../../../../app/types/planner/IPlanner";

export const dataTasks: IPlannerTask[] = [
    {
        id: 1,
        title: 'Task 1',
        description: 'desc 1',
        date_start: new Date(2023, 10, 3, 0, 0),
        date_end: new Date(2023, 10, 3, 1, 30),
        desc_list: [{
            id: 1, 
            text: 'asdasd',
            done: false
        }],
        expenses: null,
        color: 'rgb(103, 157, 244)',
        done: false
    }, 
    {
        id: 2,
        title: 'Task 2',
        description: 'desc 2',
        date_start: new Date(2023, 10, 3, 1, 30),
        date_end: new Date(2023, 10, 3, 2, 0),
        desc_list: [{
            id: 1, 
            text: 'asdasd',
            done: false
        }],
        expenses: null,
        color: 'rgb(103, 157, 244)',
        done: false
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'desc 3',
        date_start: new Date(2023, 10, 3, 3, 0),
        date_end: new Date(2023, 10, 3, 4, 20),
        desc_list: [{
            id: 1, 
            text: 'asdasd',
            done: false
        }],
        expenses: null,
        color: 'rgb(103, 157, 244)',
        done: false
    }
]


// const arrTimeTmp: IPlannerTime[] = [
//     {
//         active: false,
//         time: '00',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '01',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '02',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '03',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '04',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '05',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '06',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '07',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '08',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '09',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '10',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '11',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '12',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '13',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '14',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '15',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '16',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '17',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '18',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '19',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '20',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '21',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '22',
//         arrTasks: []
//     },
//     {
//         active: false,
//         time: '23',
//         arrTasks: []
//     },
// ]