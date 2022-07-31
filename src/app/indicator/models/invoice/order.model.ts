import { OrderDetail } from "./orderDetail.model"
import { OrderHeader } from "./orderHeader.model"

export class Order {
    orderHeaderVM: OrderHeader = new OrderHeader()
    orderDetailVM: Array<OrderDetail> = new Array<OrderDetail>()

    constructor(orderHeader?: OrderHeader,orderDetails?: Array<OrderDetail>) {
       this.orderHeaderVM = orderHeader
       this.orderDetailVM = orderDetails
    }
}