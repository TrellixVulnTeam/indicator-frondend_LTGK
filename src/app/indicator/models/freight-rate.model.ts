
export class FreightRate {
    id?: number 
    freigtRateNo: string = ""
    freigtRateDate: Date = new Date() 
    importExport: boolean
    paymentMethod: string = "" 
    sendDate: Date = new Date() 
    hasGreenCard: boolean
    sataCode: string = "" 
    contractNo: string = "" 
    contractDate: Date = new Date()
    taxAndDutyValue:number
    isPaidTaxAndDuty: boolean
    cutomerPayableValue:number
    firstInstallmentValue:number
    secondInstallmentValue:number
    amorizedFreigtRateValue:number
    tollMailDate: Date = new Date()

    amorizedFreigtRateNo: string = "" 
    hasMailToVanak: boolean
    inspector: string = "" 
    vanakTollNo: string = "" 
    tollStandardMailNo: string = "" 
    isDoneStandardInspecting: boolean
    isDoneInspectingResult: boolean
    hasVanakInvoiceRequest: boolean
    isVanakPaid: boolean
    hasTollStandardMail: boolean
    isEnviroimentPaid: boolean
    isPolutionPaid: boolean
    isDonePolutionInspecting: boolean
    standardInspectingDateDate: Date = new Date()
    inspectingInquiryDate: Date = new Date()
    modelInquiry: Date = new Date()
    enviroimentIspectingMailDate: Date = new Date()
    enviroimentInspectingDate: Date = new Date()
    clearanceCodeDate: Date = new Date()
    enviroPolutionMailNo: string = "" 
    enviromentMailNo: string = "" 
    companyToTollMailNo: string = ""
     
    orderItmId: number 
    orderHdrNo: string = ""
     
 

    public constructor(init?: Partial<FreightRate>) {
        Object.assign(this, init);
    }

     
}