
export class Agent {
    id?: number 
    firstName: string = ""
    lastName: string = ""
    phone: string = ""
    address: string = "" 
 

    public constructor(init?: Partial<Agent>) {
        Object.assign(this, init);
    }

     
}