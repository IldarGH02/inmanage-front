import "./newSteps.css"
// import { steps } from "./stepsData"
// import { StepContext } from "../context/stepContext/stepContext";
import { StepItem } from "./NewStepItem";
import { IStep } from "../../../app/types/steps";

interface NewSteps {
    data: IStep[]
}

export default function NewSteps({data}: NewSteps) {

    return (
        <div className="new-steps">
            {data.map((step: IStep) => {
                return (
                    <StepItem step={step} key={step.id}></StepItem>
                )
            })}
        </div>
    )
}
