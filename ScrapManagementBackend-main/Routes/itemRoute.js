const express = require('express');
var router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserModel = require('../Models/userModel');
const TokenModel = require('../Models/tokenModel');
const itemModel = require('../Models/itemModel');

router.post('seller/page',userAuth, async (req, res) => {
    try {
        var { token,category,quantity,description} = req.body;
        

        if (token == undefined || token== null) {
            res.status(200).json
                (
                    {
                        status: false,
                        msg: "token is not given"

                    }
                )
            return
        }

    

        // if (photo == undefined || photo == null) {
        //     res.status(200).json
        //         (
        //             {
        //                 status: false,
        //                 msg: "Photo is not given"

        //             }
        //         )
        //     return
        // }
        if (category == undefined || category == null) {
            res.status(200).json
                (
                    {
                        status: false,
                        msg: "category is not given"

                    }
                )
            return
        }
        if (quantity == undefined || quantity == null) {
            res.status(200).json
                (
                    {
                        status: false,
                        msg: "quantity is not given"

                    }
                )
            return
        }

        if (description == undefined || description == null) {
            res.status(200).json
                (
                    {
                        status: false,
                        msg: "description is not given"

                    }
                )
            return
        }
       
       
        var sellerItem = new itemModel()

        sellerItem.category=category,
        sellerItem.quantity=quantity,
        sellerItem.description=description,
        
       
        await sellerItem.save()

        res.status(200).json({

            status: true,
            output: sellerItem

        })
        return

    }
    catch (e) {
        console.log(e)
    }

    
})
router.post('/buyer/view',userAuth, async (req, res) => { 
    
    try {
        var {id} = req.body;
        if (id == null || id == undefined) {
            res.status(200).json({
                status: false,
                msg: "id not given "
            })
            return;
        }
        var itemVeiw = await itemModel.findOne({_id:id})
        
        
        res.status(200).json
                (
                    {
                        status: true,
                        output:itemVeiw
                    }
                )
            return
    }
    catch (e) {
        console.log(e)
    }
})
module.exports = router;
