
export class OrderItm {
    id?: number 
    seq?: number 
    orderHdrId?: number 
    carInformationChassisNumber: string = ""
    customerName: string = ""
    agentName: string = ""
    customerId: string =""    
    agentId: string =""    
    carInformationId: string =""    
 
    public constructor(init?: Partial<OrderItm>) {
        Object.assign(this, init);
    }
}