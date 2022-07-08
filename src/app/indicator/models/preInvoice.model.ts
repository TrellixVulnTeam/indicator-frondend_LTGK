
export class Preinvoice {
    id?: number 
    documentNo: string = ""
    fileNo: string = ""
    preOrderUnitValue: number | undefined
    vchDate: Date = new Date()

    public constructor(init?: Partial<Preinvoice>) {
        Object.assign(this, init);
    }

     
}