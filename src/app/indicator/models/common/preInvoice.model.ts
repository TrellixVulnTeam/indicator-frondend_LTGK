import { NumberSymbol } from "@angular/common"

export class Preinvoice {
    id: number | undefined |any
    documentNo: string = ""
    fileNo: string = ""
    preOrderUnitValue: number | undefined
    insertDateTime: Date = new Date()

    constructor(id?: number, documentNo: string = "", fileNo: string = "", preOrderUnitValue?: number){
        this.id = id;
        this.documentNo = documentNo;
        this.fileNo = fileNo;
        this.preOrderUnitValue = preOrderUnitValue;
    }
}