import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from '../../../dto/user.dto';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../authGuard/jwtAuthGuard';
import { LocalAuthGuard } from '../authGuard/localAuthGuard';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post()
  async create(@Body() createUser: UserDTO) {
    return this.userService.create(createUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string) {
    return this.userService.findbyId(id);
  }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (
      id.toLowerCase() === 'id' ||
      id.toLowerCase() === 'lastname' ||
      id.toLowerCase() === 'username' ||
      id.toLowerCase() === 'dob' ||
      id.toLowerCase() === 'email' ||
      id.toLowerCase() === 'phoneNo' ||
      id.toLowerCase() === 'image'
    ) {
      return this.userService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: UserDTO) {
    return this.userService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    
    return this.userService.delete(_Id);
  }
}
