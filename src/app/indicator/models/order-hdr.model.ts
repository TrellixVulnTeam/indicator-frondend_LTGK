
export class OrderHdr {
    id?: number 
    orderNo: string = ""
    invoiceNo: string = ""
    invoiceValue: string = ""
    preInvoiceNo: string =""    
    preInvoiceId: number | undefined
    vchDate: Date = new Date()


    public constructor(init?: Partial<OrderHdr>) {
        Object.assign(this, init);
    }
}