export class Customer {
    id: number | undefined
    firstName: string = ""
    lastName: string = ""
    phone: string = ""
    address: string = ""
    insertDateTime: Date = new Date()


    constructor(
        id?: number,
        firstName: string = "",
        lastName: string = "",
        phone: string = "",
        address: string = "",
    ) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.phone = phone
        this.address = address
    }

}