import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Team>;

@Schema()
export class memberSubSchema {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

@Schema()
export class Grades {
  @Prop()
  currentPhase: string;

  @Prop()
  grade: number;
}

@Schema()
export class Phases {
  @Prop({ default: 'Sem fase atual' })
  currentPhase: string;

  @Prop({ default: 'Sem data de entrega' })
  deadline: string;

  @Prop({ default: ['Sem entregas a serem feitas'] })
  issues: string[];
}

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true, unique: true })
  number: string;

  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: false, unique: false })
  members: memberSubSchema[];

  @Prop({ required: true, unique: false })
  advisorName: string;

  @Prop({ required: true, unique: false })
  advisorEmail: string;

  @Prop({ required: false, unique: false })
  status: string;

  @Prop({ required: false, unique: false })
  extraActivities: string[];

  @Prop()
  phases: Phases[];

  @Prop()
  grades: Grades[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
