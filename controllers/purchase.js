const Purchase = require("../models/Purchase");
const Painting = require("../models/Painting");
const User = require("../models/User");
const Cart = require("../models/Cart");

const purchase = async (req, res) => {
    let totalCost = 0;
    let paintingsErrors = [];
    let paintingQnt_updated = false;

    const user_id = req.user.id;
    const findPaintings = await Cart.findOne({ user_id: user_id });
    const findUser = await User.findById(user_id);
    const userMoney = findUser.money;

    // validating cart's paintings quantity and existence
    for (const painting of findPaintings.paintings) {
        const painting_id = painting.painting_id;
        const qnt = painting.quantity;

        const findPainting = await Painting.findById(painting_id);
        // alert user if ordered painting not found.
        if(!findPainting)
            paintingsErrors.push({ error: "Painting not found!", painting: painting_id });
        else {
            // alert if ordered painting already out of stock.
            if(findPainting.quantity == 0) {
                paintingsErrors.push({ error: `Painting '${findPainting.title}' is out of stock!`, painting: findPainting });
            }
            // if another user ordered the same painting, it's quantity will decrease then,
            // if current user ordered it with quantity more than the stored painting's quantity, then
            // alrert the user and modify his cart with the new stored paitning's quantity.
            else if(painting.quantity > findPainting.quantity) {
                paintingsErrors.push({ error: `Painting ${findPainting.title} has only '${findPainting.quantity}' left in stock!`, painting: findPainting });
                painting.quantity = findPainting.quantity;
                paintingQnt_updated = true;
            }
            else {
                totalCost += painting.quantity * findPainting.price;
            }
        }
    }
    // incase we modified user's cart
    if(paintingQnt_updated)
        await findPaintings.save();
    // aert user if calculated cost is bigger than the amount of money that he has.
    if(totalCost > userMoney)
        paintingsErrors.push({ error: `User doens't have enough money of total ${totalCost}!`});
    // if there is an validation errors
    if(paintingsErrors.length > 0)
    {
        const failurePurchase = {
            cart_id: findPaintings._id,
            success: false,
            failureCause: paintingsErrors,
            total_cash: 0
        }
       const purchase = new Purchase(failurePurchase);
       purchase.save();
       return res.status(200).send({ status: "error",  message: purchase});
    }
    // no validation errors
    else
    {
        // updating stored painting's quantity.
        for (const painting of findPaintings.paintings) {
            const painting_id = painting.painting_id;
            const findPainting = await Painting.findById(painting_id);
            findPainting.quantity-= painting.quantity;
            findPainting.save();
        }
        // deleteing user's cart.
        findPaintings.delete();
        // withdrawing money from customer and updating it.
        findUser.money-= totalCost;
        findUser.save();
        // preparing purchase object.
        const successPurchase = {
            cart_id: findPaintings._id,
            success: true,
            total_cash: totalCost
        }
        const purchase = new Purchase(successPurchase);
        purchase.save();
        return res.status(200).send({ status: "ok",  message: purchase});
    }
}

module.exports = purchase;