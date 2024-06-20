export interface IStep {
    header: string,
    id: number,
    status: Status
}

export enum Status {
    inactive,
    active,
    done
}
