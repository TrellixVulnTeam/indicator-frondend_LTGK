
export class TotalReport {
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
      
     //carInfo
     carChassisNumber: string = ""
     carEngineNumber: string = ""
     carYearModel: string = ""
     carArriveBoarderDate: string = ""
     carLocation: string = ""
     carArriveDocumentsDate: string = ""

    //Customer
     customerFullName: string = ""

    //agent
     agentFullName: string = ""

    //orderHdr
     orderHdrOrderNo: string = ""
     orderHdrInvoiceNo: string = ""
     orderHdrInvoiceValue: string = ""
     orderHdrVchDate: string = ""

    //Preinvoice
     preinvoiceDocumentNo: string = ""
     preinvoiceFileNo: string = ""
     preinvoicePreOrderUnitValue: string = ""
     preinvoiceVchDate: string = ""
 

    public constructor(init?: Partial<TotalReport>) {
        Object.assign(this, init);
    }

     
}