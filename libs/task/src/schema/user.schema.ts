import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import  { HydratedDocument,  } from 'mongoose';

export type UserDoc = HydratedDocument<User>;

@Schema({ timestamps: true, autoIndex: true })
export class User {

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true, required: true, index: true })
  username: string;

  @Prop()
  dob: string;

  @Prop({ unique: true, required: true, index: true })
  email: string;

  @Prop()
  phoneNo: string;

  @Prop()
  image: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// eslint-disable-next-line @typescript-eslint/no-var-requires
UserSchema.plugin(require('mongoose-unique-validator'),{message: 'User exist'});
