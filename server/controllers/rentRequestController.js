import RentRequest from '../models/RentRequest.js';

export const createRentRequest = async (req, res) => {
  const { productId, ownerId } = req.body;
  const renterId = req.user.id;

  try {
    const newRequest = new RentRequest({
      product: productId,
      renter: renterId,
      owner: ownerId
    });

    await newRequest.save();
    res.status(201).json({ msg: 'Rent request sent successfully.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error sending rent request.', error: err.message });
  }
};
