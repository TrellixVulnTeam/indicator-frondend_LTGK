export class OrderDetailModal {
    orderDetailId: number | undefined
    orderDetailRowNo: number | undefined
    orderHeaderDocumentNo: string = ""

    constructor(orderDetailId?: number, orderDetailRowNo?: number, orderHeaderDocumentNo: string = "") {
        this.orderDetailId = orderDetailId
        this.orderDetailRowNo = orderDetailRowNo
        this.orderHeaderDocumentNo = orderHeaderDocumentNo
    }
}