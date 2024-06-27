const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to Notes");
});

router.post("/validate", (req, res) => {
    console.log(req.body);
    const { error } = validateBase64Encode(req.body);

    if (error && error.details[0].message) {
        res.status(400).send({
            "status": false,
            "message": error.details[0].message,
        });
    } else {
        const plainText = req.body.text;
        const convertedBase64Text = btoa(plainText)
        if (req.body.encoded_text === convertedBase64Text) {
            res.status(200).send({
                "status": true,
                "message": "Validated successfully",
            });
        } else {
            res.status(400).send({
                "status": false,
                "message": "Invalid Base64 Text",
            });
        }
    }
});

function validateBase64Encode(item) {
    const validationSchema = Joi.object({
        text: Joi.string().required(),
        encoded_text: Joi.string().required(),
    });
    return validationSchema.validate(item);
}

module.exports = router;