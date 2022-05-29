import { modelOptions, defaultClasses, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})
export class User extends defaultClasses.TimeStamps {
  _id: string;
  id: string;

  @prop({ required: true, type: String })
  firstName?: string;
  
  @prop({ required: true, type: String })
  lastName: string;
  
  @prop({ required: true, type: String, unique: true })
  email: string;
  
  @prop({ required: true, type: String })
  password: string;
  
  @prop({ required: false, type: [String], default: [] })
  roles: string[];

  @prop({ required: true, type: String })
  refreshToken: string;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}