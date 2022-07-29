import { modelOptions, defaultClasses, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'task-states',
    timestamps: true
  }
})
export class TaskState extends defaultClasses.TimeStamps {
  _id: string;
  id: string;
  
  @prop({ required: true, type: String })
  name: string;

  @prop({ required: true })
  alias: string;
  
  @prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @prop({ type: Date })
  deletedAt: Date;

}