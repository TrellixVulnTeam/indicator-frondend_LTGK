export class OrderDetail {
    id: number | undefined
    headerId: number | undefined
    carInformationId: number | undefined
    carInformationChassis: string = ""
    customerId: number | undefined
    customerName: string = ""
    rowNo: number | undefined
    reagentName: string = ""
    insertDateTime: Date = new Date()

    constructor(id?: number, headerId?: number, carInformationId?: number, rowNo?: number, reagentName: string = "") {
        this.id = id
        this.headerId = headerId
        this.carInformationId = carInformationId
        this.rowNo = rowNo
        this.reagentName = reagentName
    }
}