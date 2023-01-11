import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const MOOD_SCHEMA = new Schema({
  idMood: {
    type: String,
    required: true,
    default: uuidv4(),
    auto: true,
    unique: true,
    index: true
  },
  mood: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  goods: {
    type: [String],
    required: false
  },
  bads: {
    type: [String],
    required: false
  },
  moodtime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
    required: true
  }
}, {
  timestamps: true,
  collection: 'moods'
});

export default mongoose.model('Mood', MOOD_SCHEMA);
