import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { StudyRecordDomain } from '../../../core/study-record';

export type StudyRecordDocument = mongoose.HydratedDocument<StudyRecordModel>;

@Schema({
  collection: 'studyRecords',
  autoIndex: process.env.NODE_ENV !== 'production',
  autoCreate: process.env.NODE_ENV !== 'production',
  timestamps: true,
})
export class StudyRecordModel extends Document implements StudyRecordDomain {
  @Virtual({
    get: function (this: StudyRecordModel) {
      return this._id;
    },
  })
  studyRecordId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.BigInt,
  })
  userId: bigint;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: false, type: Number, default: null })
  goalDuration: number | null;

  @Prop({ required: true, type: Number })
  totalDuration: number;

  @Prop({
    type: [
      {
        title: { type: String, required: true },
        color: { type: String, required: true },
        order: { type: Number, required: true },
        duration: { type: Number, required: true },
        totalBreak: { type: Number, required: true },
        startAt: { type: Number, required: true },
        endAt: { type: Number, required: true },
      },
    ],
    required: true,
    _id: false,
  })
  studies: {
    title: string;
    color: string;
    order: number;
    duration: number;
    totalBreak: number;
    startAt: number;
    endAt: number;
  }[];
}

export const StudyRecordSchema = SchemaFactory.createForClass(StudyRecordModel);

StudyRecordSchema.index({ userId: 1, date: 1 }, { unique: true });
StudyRecordSchema.index({ date: 1 });
