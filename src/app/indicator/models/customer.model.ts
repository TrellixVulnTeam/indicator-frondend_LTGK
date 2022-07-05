
export class Customer {
    id?: number 
    firstName: string = ""
    lastName: string = ""
    phone: string = ""
    address: string = "" 
 

    public constructor(init?: Partial<Customer>) {
        Object.assign(this, init);
    }

     
}