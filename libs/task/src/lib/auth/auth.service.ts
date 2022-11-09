import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService){}

  async validateUser(username: string,password: string): Promise<any>{
    let user 
    if(username.includes('@')){
      user =await this.usersService.findbyAny('email',username)
    } else   user =await this.usersService.findbyAny('username',username)
     
    if(user[0] && user[0].password === password){
    
      return user[0]
    }
    
    return null
  }

  async login(user:any){
    const payload ={username:user.username,sub:user._id}
    return {access_token: this.jwtService.sign(payload), id:user._id}
  }
}
