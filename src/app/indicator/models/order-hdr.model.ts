import { NumberSymbol } from "@angular/common"
import { FormGroup } from "@angular/forms"

export class OrderHdr {
    id?: number 
    documentNo: string = ""
    invoiceNo: string = ""
    reagentName: string = ""
    customerName: string = ""
    customerId: number | undefined
    invoiceValue: number | undefined
    preInvoiceNo: string =""    
    preInvoiceId: number | undefined
    vchDate: Date = new Date()


    public constructor(init?: Partial<OrderHdr>) {
        Object.assign(this, init);
    }

     
}