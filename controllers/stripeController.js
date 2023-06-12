const stripe = require('stripe')(process.env.STRIPE_KEY);
const stripeController = async (req, res) => {
  console.log(req.body);
  const { total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd'
  });

  res.json({ clientSecret: paymentIntent.clientSecret });
};

module.exports = stripeController;
