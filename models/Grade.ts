import { model, Schema, Document, Model, models } from "mongoose";

export interface Grade extends Document {
  power: string;
  name: string;
}

export const GradeSchema: Schema = new Schema({
  power: Number,
  name: String,
});

interface GradeModel extends Model<Grade> {}

export default models.Grade
  ? (models.Grade as GradeModel)
  : model<Grade, GradeModel>("Grade", GradeSchema);
