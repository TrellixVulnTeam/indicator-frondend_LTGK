export class CarInformation {
    id: number | undefined
    chassisNumber: string = ""
    engineNumber: string = ""
    carYearModel: string = ""
    arriveBoarderDate: Date = new Date()
    arriveBoarderDateDisplay: string = ""
    location: string = ""
    arriveDocumentsDate: Date = new Date()
    arriveDocumentsDateDisplay: string = ""
    insertDateTime: Date = new Date()

    constructor(id?: number,
        chassisNumber: string = "",
        engineNumber: string = "",
        carYearModel: string = "",
        arriveBoarderDate: Date = new Date(),
        arriveDocumentsDate: Date = new Date(),
        location: string = "",) {

        this.id = id
        this.chassisNumber = chassisNumber
        this.engineNumber = engineNumber
        this.carYearModel = carYearModel
        this.arriveBoarderDate = arriveBoarderDate
        this.arriveDocumentsDate = arriveDocumentsDate
        this.location = location
    }
}