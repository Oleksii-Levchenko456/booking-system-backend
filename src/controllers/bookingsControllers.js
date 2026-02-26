import { Booking } from '../models/booking.js';

export const getAllReservations = async (req, res) => {
  const bookings = await Booking.find();
  if (bookings.length === 0) {
    return res.status(200).json({ message: 'No reservations yet' });
  }
  res.status(200).json(bookings);
};

export const getClientReservations = async (req, res) => {
  const id = req.user.id;
  const bookings = await Booking.find({ clientId: id });
  if (bookings.length === 0) {
    return res.status(204).json({ message: 'No reservations yet' });
  }
  res.status(200).json(bookings);
};

// Не завершений контроллер
export const createReservation = async (req, res) => {
  const reservation = await Booking.create(req.body);
  res.status(201).json(reservation);
};

export const updateReservation = async (req, res) => {
  const { id } = req.params;
  const updatedRes = await Booking.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedRes) {
    return res.status(404).json({ message: 'Reservation not found' });
  }
  res.status(200).json(updatedRes);
};

export const cancelReservation = async (req, res) => {
  const { id } = req.params;
  const deletedRes = await Booking.findByIdAndUpdate(
    id,
    { status: 'cancelled' },
    { new: true },
  );

  if (!deletedRes) {
    return res.status(404).json({ message: 'Reservation not found' });
  }
  res
    .status(200)
    .json({ message: 'Reservation cancelled successfully', deletedRes });
};
