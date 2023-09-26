const mongoose = require("mongoose");
const Order = require("./order");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((p) => {
    return p.product.toString() === product._id.toString();
  });
  if (cartProductIndex >= 0) {
    this.cart.items[cartProductIndex] = {
      product: product._id,
      quantity: this.cart.items[cartProductIndex].quantity + 1,
    };
  } else {
    this.cart.items.push({ product: product._id, quantity: 1 });
  }
  return this.save();
};

userSchema.methods.deleteProductFromCart = function (productId) {
  this.cart = {
    items: this.cart.items.filter((p) => {
      return p.product.toString() !== productId.toString();
    }),
  };
  return this.save()
    .then((result) => {
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

userSchema.methods.addOrder = function () {
  return this.populate("cart.items.product")
    .then((user) => {
      console.log("cart:", user.cart.items);
      const order = new Order({
        user: this._id,
        items: user.cart.items,
      });
      console.log("order:", order.items);
      return order.save().then((result) => {
        this.cart = { items: [] };
        return this.save();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoose.model("User", userSchema);
