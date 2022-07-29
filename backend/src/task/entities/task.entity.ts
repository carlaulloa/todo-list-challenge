import { modelOptions, defaultClasses, prop } from '@typegoose/typegoose';

class TaskStateEmbebed {

  @prop({ required: true, type: String })
  id: string;

  @prop({ required: true, type: String })
  name: string;

}

@modelOptions({
  schemaOptions: {
    collection: 'tasks',
    timestamps: true
  }
})
export class Task extends defaultClasses.TimeStamps {

  @prop({ required: true, type: String })
  description: string;

  @prop({ required: false })
  startDate: Date;

  @prop({ required: false })
  endDate: Date;
  
  @prop({ required: true, type: TaskStateEmbebed, _id: false })
  state: TaskStateEmbebed;
  
  @prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @prop({ type: Date })
  deletedAt: Date;

}