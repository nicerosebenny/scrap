const express = require('express');
var router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserModel = require('../Models/userModel');
const TokenModel = require('../Models/tokenModel');


router.post('/user/registration',async(req,res)=>{
    try{
        var {name,phone,email,password,district,town,street,buildingNo,houseNo,landmark,pincode,place} = req.body;
       
        if(isnullorempty(name)){
            res.status(200).json({
                status:false,
                msg:"Invalid name."
            });
            return;
        }
        if(isnullorempty(phone)){
            res.status(200).json({
                status:false,
                msg:"Invalid phone."
            });
            return;
        }
        if(isnullorempty(email)){
            res.status(200).json({
                status:false,
                msg:"Invalid email."
            });
            return;
        }
        if(isnullorempty(password)){
            res.status(200).json({
                status:false,
                msg:"Invalid password."
            });
            return;
        }
        if(isnullorempty(district)){
            res.status(200).json({
                status:false,
                msg:"Invalid district."
            });
            return;
        }
        if(isnullorempty(town)){
            res.status(200).json({
                status:false,
                msg:"Invalid town."
            });
            return;
        }
        if(isnullorempty(street)){
            res.status(200).json({
                status:false,
                msg:"Invalid street."
            });
            return;
        }
        if(isnullorempty(buildingNo)){
            res.status(200).json({
                status:false,
                msg:"Invalid buildingNo."
            });
            return;
        }
        if(isnullorempty(houseNo)){
            res.status(200).json({
                status:false,
                msg:"Invalid house no."
            });
            return;
        }
        if(isnullorempty(landmark)){
            res.status(200).json({
                status:false,
                msg:"Invalid landmark."
            });
            return;
        }
        if(isnullorempty(pincode)){
            res.status(200).json({
                status:false,
                msg:"Invalid Pincode."
            });
            return;
        }
        //validate if already this phone and email is already registered
        var userExists = await UserModel.findOne({$or:[{phone:phone},{email:email}],status:{$ne:"Deleted"}});
        if(!isnullorempty(userExists)){
            res.status(200).json({
                status:false,
                msg:"This Phone Number or Email Address is already registered."
            });
            return;
        }
        var hashedPassword = await bcrypt.hash(password, 10);
        var user = new UserModel()
        user.name = name;
        user.phone = phone;
        user.email = email;
        user.password = hashedPassword;
        user.place = place;
        user.district = district;
        user.town = town;
        user.street = street;
        user.buildingNo = buildingNo;
        user.houseNo = houseNo;
        user.landmark = landmark;
        user.pincode = pincode;
        await user.save()
        res.status(200).json({
            status:true,
            msg:"User Added Sucessfully."
        });
        return;
    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!'
        });
    }
})

router.post('/buyer/registration',async(req,res)=>{
    try{
        var { name,phone,email,password,district,town,orgaisation,pincode,place } = req.body;
       
        if(isnullorempty(name)){
            res.status(200).json({
                status:false,
                msg:"Invalid name."
            });
            return;
        }
        if(isnullorempty(phone)){
            res.status(200).json({
                status:false,
                msg:"Invalid phone."
            });
            return;
        }
        if(isnullorempty(email)){
            res.status(200).json({
                status:false,
                msg:"Invalid email."
            });
            return;
        }
        if(isnullorempty(password)){
            res.status(200).json({
                status:false,
                msg:"Invalid password."
            });
            return;
        }
        if(isnullorempty(district)){
            res.status(200).json({
                status:false,
                msg:"Invalid district."
            });
            return;
        }
        if(isnullorempty(town)){
            res.status(200).json({
                status:false,
                msg:"Invalid town."
            });
            return;
        }
        if(isnullorempty(orgaisation)){
            res.status(200).json({
                status:false,
                msg:"Invalid orgaisation."
            });
            return;
        }
        if(isnullorempty(pincode)){
            res.status(200).json({
                status:false,
                msg:"Invalid pincode."
            });
            return;
        }
        //validate if already this phone and email is already registered
        var userExists = await UserModel.findOne({$or:[{phone:phone},{email:email}],status:{$ne:"Deleted"}});
        if(!isnullorempty(userExists)){
            res.status(200).json({
                status:false,
                msg:"This Phone Number or Email Address is already registered."
            });
            return;
        }
        var hashedPassword = await bcrypt.hash(password, 10);
        var user = new UserModel()
        user.role = "Buyer"
        user.name = name;
        user.phone = phone;
        user.email = email;
        user.password = hashedPassword;
        user.place = place;
        user.district = district;
        user.pincode = pincode;
        user.orgaisation = orgaisation;
        await user.save()
        res.status(200).json({
            status:true,
            msg:"Buyer Added Sucessfully."
        });
        return;
    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!'
        });
    }
})


function isnullorempty(val) {
    if (val === false || val === true) {
        return false;
    }
    if (val === 0) {
        return false;
    }
    if (val === undefined || val === null || val === "undefined" || val === "null" || val === "" || (!val)) {
        return true;
    }
    else
    if(typeof val==="number" )
    {
        return false;
    }
    else {
        if (val.length > 0) {
            return false;
        }
        else {
            val = JSON.stringify(val);
            val = JSON.parse(val);
            if (Object.keys(val).length > 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}


//Login
router.post('/login', async(req, res)=> {
    try{
        var {userName,password } = req.body;
        if(isnullorempty(userName)){
            res.status(200).json({
                status:false,
                msg:"Invalid User Name."
            });
            return;
        }
        if(isnullorempty(password)){
            res.status(200).json({
                status:false,
                msg:"Invalid  Password."
            });
            return;
        }
        var user = await UserModel.findOne({status:"Active",email:userName})
        if(isnullorempty(user)){
            res.status(200).json({
                status:false,
                msg:"Invalid Credentials."
            });
            return;
        }

        var result = await bcrypt.compare(password, user.password);
        if (result == false) {
            res.status(200).json({
                status: false,
                msg: 'Invalid Credentials.'
            });
            return;
        }
        var token = jwt.sign({
            id: user._id,
            user: user,
            role: user.role,
        }, "Projct", { expiresIn: 31536000 });
        var tok = new TokenModel()
        tok.uid = user._id;
        tok.tokenvalue = token;
        await tok.save()
        res.status(200).json({
            status:true,
            token:token,
            role:user.role,
            id:user._id,
            userName:user.name,
            msg:"Login Sucessfull"
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!'
        });
    }
})

module.exports = router;