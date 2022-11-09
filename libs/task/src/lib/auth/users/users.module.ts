import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),PassportModule,
  JwtModule.register({
  secret:process.env.JWT_CONSTANT,
  signOptions:{expiresIn:'120s'}
}),
],
  

  providers: [UsersService,AuthService,LocalStrategy,JwtStrategy],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
