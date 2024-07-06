const express = require('express')
const router = express.Router()
const razorpay = require('razorpay')

//Route to create an order
router.post('/order',async(req, res)=> {
    const{amount, currency, receipt} = req.body;
    const options ={
        amount: amount * 100,
        currency,
        receipt
    }

    try{
        const order = await razorpay.orders.create(options)
        res.json(order);
    }
catch (error){
    res.status(500).send(error)
}
})
module.exports = router;