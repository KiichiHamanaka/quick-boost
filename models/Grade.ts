import { Schema, model } from "mongoose";

export const GradeSchema: Schema = new Schema({
  name: String,
});

const Grade = model("Grade", GradeSchema);

export default Grade;
