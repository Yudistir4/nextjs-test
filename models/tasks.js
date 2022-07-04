import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TaskSchema = new Schema(
  { task: String },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

TaskSchema.plugin(mongoosePaginate);

// const Task = model("Task", TaskSchema);
const Task = models.Task || model("Task", TaskSchema);

export default Task;
