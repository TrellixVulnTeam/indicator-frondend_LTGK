
export class OrderItm {
    id?: number 
    chassiNo: string = ""
    customerName: string = ""
    agentName: string = ""
    customerId: string =""    
    agentId: string =""    
    chassiId: string =""    

 
    public constructor(init?: Partial<OrderItm>) {
        Object.assign(this, init);
    }
}