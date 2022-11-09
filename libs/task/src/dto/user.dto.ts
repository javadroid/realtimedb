import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDTO{

    firstname:string
    lastname:string 
   
    username:string
    dob:string
    email:string
    phoneNo:string
    image:string
    password:string
}

