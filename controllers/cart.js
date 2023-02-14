const Painting = require("../models/Painting");
const Cart = require("../models/Cart");
const User = require("../models/User");

const AddToCart = async (req, res) => {
    const painting_id = req.params.id;
    let painting_qnt = req.body.qnt;
    let findPainting;
    // error if user entered non-integer quantity value.
    if(isNaN(painting_qnt))
        return res.status(500).send({ status: "error", message: "Quantity must be a number!"});
        
    try {
        findPainting = await Painting.findById(painting_id);
    } catch (error) {
        const err = error.message;
        return res.status(501).send({ status: "error", message: err});
    }

    // if painting not found.
    if(!findPainting)
        return res.status(404).send({ status: "error", message: "Painting not found!"});
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

module.exports = AddToCart;