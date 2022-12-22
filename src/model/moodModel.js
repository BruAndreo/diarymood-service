import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const SCHEMA = new Schema({
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
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
    required: true
  }
}, {
  timestamps: true,
  collection: 'moods'
});

export default class MoodModel {

  static load(conn) {
    return conn.model('Mood', SCHEMA);
  }

}
