import { ImEx } from "../../enums/imEx.enum"
import { Inspectors } from "../../enums/inspectors.enum"

export class FreightRate {
    id: number | undefined
    freightRateNo: string = ""
    importExport: ImEx = ImEx.Export
    paymentMethod: string = ""
    hasGreenCard: boolean = false
    sataCode: string = ""
    contractNo: string = ""
    taxAndDutyValue: number | undefined
    isPaidTaxAndDuty: boolean = false
    customerPayableValue: number | undefined
    firstInstallmentValue: number | undefined
    secondInstallmentValue: number | undefined
    amortizedFreightRateNo: string = ""
    amortizedFreightRateValue: number | undefined
    hasMailToVanak: boolean = false
    inspector: Inspectors = Inspectors.HHEe
    isDoneInspectingResult: boolean = false
    hasVanakInvoiceRequest: boolean = false
    isVanakPaid: boolean = false
    vanakTollNo: string = ""
    tollStandardMailNo: string = ""
    hasTollStandardMail: boolean = false
    isEnvironmentPaid: boolean = false
    isPollutionPaid: boolean = false
    isDonePollutionInspecting: boolean = false
    environPollutionMailNo: string = ""
    environmentMailNo: string = ""
    companyToTollMailNo: string = ""
    orderDetailId: number | undefined
    orderDetailRowNo: number | undefined
    orderHeaderDocumentNo: string = ""
    isDoneStandardInspecting: boolean = false
    standardInspectingDateDate: Date = new Date()
    inspectingInquiryDate: Date = new Date()
    modelInquiry: Date = new Date()
    environmentInspectingDate: Date = new Date()
    freightRateDate: Date = new Date()
    sendDate: Date = new Date()
    contractDate: Date = new Date()
    environmentInspectingMailDate: Date = new Date()
    tollMailDate: Date = new Date()
    clearanceCodeDate: Date = new Date()
    insertDateTime: Date = new Date()
    standardInspectingDateDateDisplay: string = ""
    inspectingInquiryDateDisplay: string = ""
    modelInquiryDisplay: string = ""
    environmentInspectingDateDisplay: string = ""
    freightRateDateDisplay: string = ""
    sendDateDisplay: string = ""
    contractDateDisplay: string = ""
    environmentInspectingMailDateDisplay: string = ""
    tollMailDateDisplay: string = ""
    clearanceCodeDateDisplay: string = ""
    
    constructor(
        id?: number,
        freightRateNo: string = "",
        freightRateDate: Date = new Date(),
        importExport: ImEx = ImEx.Export,
        paymentMethod: string = "",
        sendDate: Date = new Date(),
        hasGreenCard: boolean = false,
        sataCode: string = "",
        contractNo: string = "",
        contractDate: Date = new Date(),
        taxAndDutyValue?: number ,
        isPaidTaxAndDuty: boolean = false,
        customerPayableValue?: number ,
        firstInstallmentValue?: number ,
        secondInstallmentValue?: number ,
        amortizedFreightRateNo: string = "",
        amortizedFreightRateValue?: number ,
        tollMailDate: Date = new Date(),
        hasMailToVanak: boolean = false,
        inspector: Inspectors = Inspectors.HHEe,
        standardInspectingDateDate: Date = new Date(),
        isDoneStandardInspecting: boolean = false,
        inspectingInquiryDate: Date = new Date(),
        modelInquiry: Date = new Date(),
        isDoneInspectingResult: boolean = false,
        hasVanakInvoiceRequest: boolean = false,
        isVanakPaid: boolean = false,
        vanakTollNo: string = "",
        tollStandardMailNo: string = "",
        hasTollStandardMail: boolean = false,
        environmentInspectingMailDate: Date = new Date(),
        environmentInspectingDate: Date = new Date(),
        isEnvironmentPaid: boolean = false,
        isPollutionPaid: boolean = false,
        isDonePollutionInspecting: boolean = false,
        environPollutionMailNo: string = "",
        environmentMailNo: string = "",
        companyToTollMailNo: string = "",
        clearanceCodeDate: Date = new Date(),
    ) {
        this.id = id
        this.freightRateNo = freightRateNo
        this.freightRateDate = freightRateDate
        this.importExport = importExport
        this.paymentMethod = paymentMethod
        this.sendDate = sendDate
        this.hasGreenCard = hasGreenCard
        this.sataCode = sataCode
        this.contractNo = contractNo
        this.contractDate = contractDate
        this.taxAndDutyValue = taxAndDutyValue
        this.isPaidTaxAndDuty = isPaidTaxAndDuty
        this.customerPayableValue = customerPayableValue
        this.firstInstallmentValue = firstInstallmentValue
        this.secondInstallmentValue = secondInstallmentValue
        this.amortizedFreightRateNo = amortizedFreightRateNo
        this.amortizedFreightRateValue = amortizedFreightRateValue
        this.tollMailDate = tollMailDate
        this.hasMailToVanak = hasMailToVanak
        this.inspector = inspector
        this.standardInspectingDateDate = standardInspectingDateDate
        this.isDoneStandardInspecting = isDoneStandardInspecting
        this.inspectingInquiryDate = inspectingInquiryDate
        this.modelInquiry = modelInquiry
        this.isDoneInspectingResult = isDoneInspectingResult
        this.hasVanakInvoiceRequest = hasVanakInvoiceRequest
        this.isVanakPaid = isVanakPaid
        this.vanakTollNo = vanakTollNo
        this.tollStandardMailNo = tollStandardMailNo
        this.hasTollStandardMail = hasTollStandardMail
        this.environmentInspectingMailDate = environmentInspectingMailDate
        this.environmentInspectingDate = environmentInspectingDate
        this.isEnvironmentPaid = isEnvironmentPaid
        this.isPollutionPaid = isPollutionPaid
        this.isDonePollutionInspecting = isDonePollutionInspecting
        this.environPollutionMailNo = environPollutionMailNo
        this.environmentMailNo = environmentMailNo
        this.companyToTollMailNo = companyToTollMailNo
        this.clearanceCodeDate = clearanceCodeDate
    }
}