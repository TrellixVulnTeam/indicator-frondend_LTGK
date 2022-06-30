import { ImEx } from "../../enums/imEx.enum"
import { Inspectors } from "../../enums/inspectors.enum"

export class FreightRate {
    id: number | undefined
    freigtRateNo: string = ""
    freigtRateDate: Date = new Date()
    importExport: ImEx = ImEx.Export
    paymentMethod: string = ""
    sendDate: Date = new Date()
    hasGreenCard: boolean = false
    sataCode: string = ""
    contractNo: string = ""
    contractDate: Date = new Date()
    taxAndDutyValue: number | undefined
    isPaidTaxAndDuty: boolean = false
    cutomerPayableValue: number | undefined
    firstInstallmentValue: number | undefined
    secondInstallmentValue: number | undefined
    amorizedFreigtRateNo: string = ""
    amorizedFreigtRateValue: number | undefined
    tollMailDate: Date = new Date()
    hasMailToVanak: boolean = false
    inspector: Inspectors = Inspectors.HHEe
    standardInspectingDateDate: Date = new Date()
    isDoneStandardInspecting: boolean = false
    inspectingInquiryDate: Date = new Date()
    modelInquiry: Date = new Date()
    isDoneInspectingResult: boolean = false
    hasVanakInvoiceRequest: boolean = false
    isVanakPaid: boolean = false
    vanakTollNo: string = ""
    tollStandardMailNo: string = ""
    hasTollStandardMail: boolean = false
    enviroimentIspectingMailDate: Date = new Date()
    enviroimentInspectingDate: Date = new Date()
    isEnviroimentPaid: boolean = false
    isPolutionPaid: boolean = false
    isDonePolutionInspecting: boolean = false
    enviroPolutionMailNo: string = ""
    enviromentMailNo: string = ""
    companyToTollMailNo: string = ""
    clearanceCodeDate: Date = new Date()
    insertDateTime: Date = new Date()

    constructor(
        id?: number,
        freigtRateNo: string = "",
        freigtRateDate: Date = new Date(),
        importExport: ImEx = ImEx.Export,
        paymentMethod: string = "",
        sendDate: Date = new Date(),
        hasGreenCard: boolean = false,
        sataCode: string = "",
        contractNo: string = "",
        contractDate: Date = new Date(),
        taxAndDutyValue?: number,
        isPaidTaxAndDuty: boolean = false,
        cutomerPayableValue?: number,
        firstInstallmentValue?: number,
        secondInstallmentValue?: number,
        amorizedFreigtRateNo: string = "",
        amorizedFreigtRateValue?: number,
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
        enviroimentIspectingMailDate: Date = new Date(),
        enviroimentInspectingDate: Date = new Date(),
        isEnviroimentPaid: boolean = false,
        isPolutionPaid: boolean = false,
        isDonePolutionInspecting: boolean = false,
        enviroPolutionMailNo: string = "",
        enviromentMailNo: string = "",
        companyToTollMailNo: string = "",
        clearanceCodeDate: Date = new Date()
    ) {
        this.id = id
        this.freigtRateNo = freigtRateNo
        this.freigtRateDate = freigtRateDate
        this.importExport = importExport
        this.paymentMethod = paymentMethod
        this.sendDate = sendDate
        this.hasGreenCard = hasGreenCard
        this.sataCode = sataCode
        this.contractNo = contractNo
        this.contractDate = contractDate
        this.taxAndDutyValue = taxAndDutyValue
        this.isPaidTaxAndDuty = isPaidTaxAndDuty
        this.cutomerPayableValue = cutomerPayableValue
        this.firstInstallmentValue = firstInstallmentValue
        this.secondInstallmentValue = secondInstallmentValue
        this.amorizedFreigtRateNo = amorizedFreigtRateNo
        this.amorizedFreigtRateValue = amorizedFreigtRateValue
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
        this.enviroimentIspectingMailDate = enviroimentIspectingMailDate
        this.enviroimentInspectingDate = enviroimentInspectingDate
        this.isEnviroimentPaid = isEnviroimentPaid
        this.isPolutionPaid = isPolutionPaid
        this.isDonePolutionInspecting = isDonePolutionInspecting
        this.enviroPolutionMailNo = enviroPolutionMailNo
        this.enviromentMailNo = enviromentMailNo
        this.companyToTollMailNo = companyToTollMailNo
        this.clearanceCodeDate = clearanceCodeDate
    }
}