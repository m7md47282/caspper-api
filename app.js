
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const zlib = require('zlib');

const Section = require("./models/section");

const app = express();

mongoose.connect("mongodb+srv://m7md47282:Caspper2024@caspper.ixchrw4.mongodb.net/caspper?retryWrites=true").then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
  
});

// function compressString(inputString) {
//     return new Promise((resolve, reject) => {
//         zlib.deflateRaw(inputString, (error, compressedData) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(compressedData);
//             }
//         });
//     });
// }

// Function to decompress the compressed data
function decompressData(compressedData) {
    return new Promise((resolve, reject) => {
        zlib.inflateRaw(compressedData, (error, decompressedString) => {
            if (error) {
                reject(error);
            } else {
                resolve(decompressedString.toString());
            }
        });
    });
}

app.post("/api/section", (req, res, next) => {
    const SECTION = new Section({
        title: req.body.title,
        content: req.body.content,
    });

    let section = {

        title: req.body.title,
        content: req.body.content,
    }

    if(req.body._id){
        Section.updateOne({ _id: req.body._id }, { $set: { section } })
            .then(result => {
                console.log('Document updated successfully:', result);
            })
            

        return
    }


    SECTION.save().then((section) => {

        res.status(201).json({
            message: "section added successfully",
            _id: section?._id || null,
            success: true
        });
    })
});

app.get("/api/sections", (req, res, next) => {

    Section.find().then((data) => {
        const PROMISES = []
        if (data.length) {
            res.status(200).json({
                message: "sections fetched successfully!",
                data: data,
                success: true
            })
        } else {
            res.status(200).json({
                message: "no data!",
                data: [],
                success: true
            })

        }
    });


});

app.delete("/api/sections/:id", (req, res, next) => {
  Section.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ 
        success: true,
        message: "section deleted!"
     });
  });
});

module.exports = app;
