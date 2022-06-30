export class CarInformation {
    id: number | undefined
    chassisNumber: string = ""
    engineNumber: string = ""
    carYearModel: string = ""
    arriveBoarderDate: Date = new Date()
    location: string = ""
    arriveDocumentsDate: Date = new Date()
    insertDateTime: Date = new Date()

    constructor(id?: number,
        chassisNumber: string = "",
        engineNumber: string = "",
        carYearModel: string = "",
        arriveBoarderDate: Date = new Date(),
        location: string = "",
        arriveDocumentsDate: Date = new Date()) {

            this.id = id
            this.chassisNumber = chassisNumber
            this.engineNumber = engineNumber
            this.carYearModel = carYearModel
            this.arriveBoarderDate = arriveBoarderDate
            this.arriveDocumentsDate = arriveDocumentsDate
            this.location = location
    }
}