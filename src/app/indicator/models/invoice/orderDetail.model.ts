export class OrderDetail {
    id: number | undefined
    headerId: number | undefined
    carInformationId: number | undefined
    carInformationChassis: string = ""
    customerId: number | undefined
    customerName: string = ""
    rowNo: number | undefined
    insertDateTime: Date = new Date()

    constructor(id?: number, headerId?: number, carInformationId?: number, rowNo?: number) {
        this.id = id
        this.headerId = headerId
        this.carInformationId = carInformationId
        this.rowNo = rowNo
    }
}