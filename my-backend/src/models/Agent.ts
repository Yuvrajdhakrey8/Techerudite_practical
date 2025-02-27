import mongoose, { Schema, Document } from "mongoose";

export interface IAgent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "customer" | "admin";
}

const AgentSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAgent>("Agent", AgentSchema);
