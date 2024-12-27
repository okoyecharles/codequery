import mongoose, { InferSchemaType } from "mongoose";

const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
},
  {
    timestamps: true
  });

export type QuestionType = InferSchemaType<typeof QuestionSchema>;

const Question = mongoose.model("Question", QuestionSchema);
export default Question;