/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategorieDocument = Categorie & Document;


@Schema({
  toJSON: {
    virtuals: true,
  },

})
export class Categorie {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  code: string;

  @Prop({ type: String })
  absolutePath: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' })
  Parent: Categorie;

}

const CategorieSchema = SchemaFactory.createForClass(Categorie);

CategorieSchema.set('toObject', { virtuals: true })
CategorieSchema.set('toJSON', { virtuals: true })

CategorieSchema.virtual('childrens', {
  ref: 'Categorie',
  localField: '_id',
  foreignField: 'Parent'
})


export { CategorieSchema };