import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPrayer extends Document {
  name: string;
  qazaCount: number;
  lastUpdated: Date;
}

const PrayerSchema: Schema<IPrayer> = new Schema({
  name: { type: String, required: true },
  qazaCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const Prayer: Model<IPrayer> = mongoose.models.Prayer || mongoose.model<IPrayer>('Prayer', PrayerSchema);

export default Prayer;
