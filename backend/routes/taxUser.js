const { Router } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const taxResult = require('../models/taxResult') //schema part
const fetchuser = require("../middleware/fetchuser"); //from this middleware we will receieving user
const { body, validationResult } = require('express-validator');



//Route 1 : this end point POST "/api/notes/addnote" . Here we will add user tax details
router.post("/addDetails", fetchuser, [
    body('bas', "Enter a valid bas").isNumeric(),
    body('lta', "Enter a valid lta").isNumeric(),
    body('hra', "Enter a valid hra").isNumeric(),
    body('fa', "Enter a valid fa").isNumeric(),
    body('inv', "Enter a valid inv").isNumeric(),
    body('med', "Enter a valid med").isNumeric()
], async (req, res) => {
    //if there are errors then return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bas, lta, hra, fa, inv, med, rent } = req.body; //taking user filled data

        const tax = new taxResult({
            bas, lta, hra, fa, inv, med, user: req.user.id, rent  //adding user filled data in database. 4 filled will be added
        })
        const savedNote = await tax.save();   //saving to database
        res.json(savedNote);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})


module.exports = router