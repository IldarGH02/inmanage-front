import { IStep, Status } from "../../../app/types/steps";

interface IStepItem {
    step: IStep
}

export function StepItem({step}: IStepItem) {

    function getClassActive(status: Status) {
        let res: string = ''
        switch (status) {
            case Status.active: {
                res = 'active'
                break;
            }
            case Status.inactive: {
                res = 'inactive'
                break;
            }
            default:
                break;
        }
        return res
    }
    
    return (
        <div className="new-step">
            <div className="new-step__header">{step.header}</div>
            <div className={`${getClassActive(step.status)} new-step__point`}>
                <div className={`new-step__point${step.status===Status.active?'--active':''}`}></div>
            </div>
        </div>
    )
}