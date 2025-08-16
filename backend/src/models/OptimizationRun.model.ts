import { Schema, model } from 'mongoose';

const OptimizationRunSchema = new Schema(
  {
    input: { type: Object, required: true },
    result: { type: Object, required: true }
  },
  { timestamps: true }
);

export default model('OptimizationRun', OptimizationRunSchema);