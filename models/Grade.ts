import { model, Schema, Document, Model, models } from "mongoose";
import { User, UserSchema } from "./User";

export interface Grade extends Document {
  name: string;
  power: number;
}

export const GradeSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  power: Number,
});

interface GradeModel extends Model<Grade> {}

export default models.Grade
  ? (models.Grade as GradeModel)
  : model<Grade, GradeModel>("Grade", GradeSchema);
