const Painting = require("../models/Painting");
const Cart = require("../models/Cart");
const User = require("../models/User");


/*
   returns (created/modified) cart.
   @param {painting id} painting id that user want to (add/modify) to his cart.
   @param {painting quantity} the quantity that user want to (add/modify) to his cart.
*/
const AddToCart = async (req, res) => {
    const painting_id = req.params.id;
    let painting_qnt = req.body.qnt;
    let findPainting;
    // error if user entered non-integer quantity value.
    if(isNaN(painting_qnt))
        return res.status(500).send({ status: "error", message: "Quantity must be a number!"});
        
    try {
        findPainting = await Painting.findById(painting_id);
        if(!findPainting)
            return res.status(404).send({ status: "error", message: "Painting not found!"});
    } catch (error) {
        const err = error.message;
        return res.status(501).send({ status: "error", message: err});
    }

    // validating requested 'quantitiy' value.
    if(painting_qnt < 1)
        return res.status(500).send( {status: "error", message: "Coudn't add painting to cart!"});
    if(painting_qnt > findPainting.quantity)
        painting_qnt = findPainting.quantity;
    
    // preparing painting object to add it to user cart.
    const painting = {
        painting_id: findPainting._id,
        quantity: painting_qnt
    };
    const cart = {
        user_id: req.user.id,
        paintings: painting
    }

    const findUserCart = await Cart.findOne({ user_id: req.user.id });
    // if user already has a cart, then we push the requested painting into it.
    if(findUserCart) {
        let cartPaintings = findUserCart.paintings; // array of user's paintings
        let paintingFound = false;
        // looping through each painting, if the requested painting already in user's cart then,
        // we only modify the requested quantity of that painting
        cartPaintings.forEach( painting => {
            if(painting.painting_id == painting_id) {
                painting.quantity = painting_qnt;
                paintingFound = true;
            }
        });
        // else user requested a painting that isn't in his cart.
        if(!paintingFound)
        {
            cartPaintings.push(painting);
            findUserCart.paintings = cartPaintings;
        }
        await findUserCart.save();
        res.status(200).send({ status: "ok", message: findUserCart});
    }
    // if user doesn't have a cart yet, we create a new one and
    // add the requested painting to it.
    else {
        const addToCart = new Cart(cart);
        await addToCart.save();
        res.status(200).send({ status: "ok", message: addToCart});
    }
}

const deleteFromCart = async (req, res) => {
    const painting_id = req.params.id;
    const user_id = req.user.id;
    try {
        const findPainting = await Painting.findById(painting_id);
        if(!findPainting)
            return res.status(404).send({ status: "error", message: "Painting not found!"});
        const deletePainting = await Cart.updateOne({ user_id: user_id, $pull: { paintings: { painting_id: painting_id }} });
        if(deletePainting.modifiedCount == 1)
            res.status(200).send({ status: "ok", message: deletePainting });
        else
            res.status(501).send({ status: "error", message: "Couldn't delete painting from cart!" });
    } catch (error) {
        const err = error.message;
        return res.status(501).send({ status: "error", message: err});
    }
}

// returns current user's cart.
const getCart = async (req, res) => {
    const user_id = req.user.id;
    const findCart = await Cart.findOne({ user_id: user_id });
    if(!findCart)
        res.status(200).send({ status: "ok", message: "Your cart is empty" });
    else
        res.status(200).send({ status: "ok", message: findCart.paintings });
}

/*
   returns given user's cart.
   @param {user_id} user_id you want to get his cart.
*/
const getUserCart = async (req, res) => {
    const user_id = req.body.user_id;
    try {
        const findUserCart = await Cart.findOne({ user_id: user_id });
        if(!findUserCart)
            res.status(200).send({ status: "ok", message: "User's cart is empty!" });
        else
            res.status(200).send({ status: "ok", message: findUserCart.paintings });
    } catch (error) {
        const err = error.message;
        return res.status(501).send({ status: "error", message: err });
    }
}

const getAllCarts = async (req, res) => {
    const findAllCarts = await Cart.find();
    res.status(200).send({ status: "ok", message: findAllCarts });
}

module.exports = {
    deleteFromCart,
    getUserCart,
    getAllCarts,
    AddToCart,
    getCart
};