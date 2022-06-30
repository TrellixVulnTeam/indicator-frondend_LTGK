export class Customer {
    firstName: string = ""
    lastName: string = ""
    phone: string = ""
    address: string = ""
    insertDateTime: Date = new Date()


  constructor(
    firstName: string ="", 
    lastName: string ="", 
    phone: string ="", 
    address: string ="", 
) {
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.address = address
  }

}