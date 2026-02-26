import { model, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
    },
  },
  { timestamps: true },
);

export const Booking = model('Booking', bookingSchema);
