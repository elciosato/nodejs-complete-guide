const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  items: [
    {
      product: {
        type: Object,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
