const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      data: newAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addresses = await Address.find({ userId });

    res.status(200).json({ success: true, data: addresses });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id required!",
      });
    }

    const updated = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const deleted = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };