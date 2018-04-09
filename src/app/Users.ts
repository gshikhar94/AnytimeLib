export class Users {
    phone: string;
    DateOfBirth: string;
    userName: string;
    password: string;
    id: string;
    email: string;
    photoUrl:string;
    issuedBookId:number;
    

    constructor(phone?: string, dob?: string, username?: string, password?: string, id?: string, email?: string,photoUrl?:string) {
        this.phone = phone;
        this.DateOfBirth = dob;
        this.userName = username;
        this.password = password;
        this.id = id;
        this.email = email;
        this.photoUrl = photoUrl;
    }
    
    // toString():string{

    //     return (console.log("Username : "+user.userName+"Password : "+ password+"Date of birth : "+));
    // }
}