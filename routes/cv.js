const CV = require("../models/cvModel");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});
const { resumeUploadHelper } = require("../helpers/imageUploadHelper");
const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
//get all Cvs
router.get("/", async(req, res)=> {
    try {
        const cvs = CV.find();
        res.send(201).json(cvs);
    } catch (error) {
        console.log(error.message);
        res.send(500).json({message: error.message})
    }
})
///create CV
router.post('/', upload.single("file"), async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(404).json({ message: "Veuillez télécharger votre fichier de CV" });
        }
        // Check if email is provided and valid
        if (!req.body.email || !emailValidator(req.body.email)) {
            return res.status(400).json({ message: "Veuillez fournir une adresse email valide" });
        }
        const resumeUrl = await resumeUploadHelper(req.file);
        req.body.resume = resumeUrl;
        const cv = await CV.create(req.body);
        res.status(201).json(cv);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;