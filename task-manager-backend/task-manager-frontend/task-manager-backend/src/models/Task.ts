import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  userId: mongoose.Types.ObjectId;
  tags: string[]; // ✅ added tags support
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: {
      type: [String], // ✅ ensure it’s always an array
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
