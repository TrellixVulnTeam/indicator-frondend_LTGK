
export class CarInfo {
    id?: number 
    chassisNumber: string = ""
    engineNumber: string = ""
    carYearModel: string = ""
    location: string = ""
    arriveDocumentsDate: Date = new Date()
    arriveBoarderDate: Date = new Date()

    public constructor(init?: Partial<CarInfo>) {
        Object.assign(this, init);
    }

     
}