export class OrderHeader {
    id: number | undefined
    preInvoiceId: number | undefined
    documentNo: string = ""
    invoiceNo: string = ""
    invoiceValue: number | undefined
    customerName: string = ""
    insertDateTime: Date = new Date()

    constructor(id?: number, preInvoiceId?: number, documentNo: string = "", invoiceNo: string = "", invoiceValue?: number, customerName: string = "") {
        this.id = id
        this.preInvoiceId = preInvoiceId
        this.documentNo = documentNo
        this.invoiceNo = invoiceNo
        this.invoiceValue = invoiceValue
        
        this.customerName = customerName
    }
}