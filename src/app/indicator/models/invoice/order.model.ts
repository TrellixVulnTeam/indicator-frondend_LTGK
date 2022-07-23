import { OrderDetail } from "./orderDetail.model"
import { OrderHeader } from "./orderHeader.model"

export class Order {
    orderHeader: OrderHeader = new OrderHeader()
    orderDetails: Array<OrderDetail> = new Array<OrderDetail>()

    constructor(orderHeader?: OrderHeader,orderDetails?: Array<OrderDetail>) {
       this.orderHeader = orderHeader
       this.orderDetails = orderDetails
    }
}