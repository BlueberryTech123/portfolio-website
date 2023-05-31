// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// =================================================

// -- HOSTING STEPS --
//
// node server.js

const port = 6969;
console.log("server.js succesfully started");

// -- FIREBASE HOSTING STEPS --
//
// firebase login
// firebase init
// firebase deploy


const expressApp = express();
expressApp.use(express.json());

var pagesRoot = "public";
var root = path.dirname(require.main.filename);

function getPublicFile(filename) {
    return root + "/" + pagesRoot + "/" + filename;
}

expressApp.get(
    "/style.css", 
    (req, res) => { res.sendFile(getPublicFile("style.css")); });
expressApp.get(
    "/sitecomponents.js", 
    (req, res) => { res.sendFile(getPublicFile("sitecomponents.js")); });
expressApp.get(
    "/background.jpg", 
    (req, res) => { res.sendFile(getPublicFile("background.jpg")); });

expressApp.get("/", (req, res) => {
    res.sendFile(getPublicFile("index.html"));
});

expressApp.get("/testingplace", (req, res) => {
    res.sendFile(getPublicFile("testing.html"));
});

expressApp.post("/loadgallery", (req, res) => {
    let gallery = []
    let galleryPath = getPublicFile("gallery");

    fs.readdir(galleryPath, (err, files) => {
        files.forEach((file) => {
            gallery.push({
                "image": `gallery/${file}`,
                "title": file.replace(".png", "").replace(".jpg", "")});

            console.log("R1:");
            console.log(gallery);
        });

        res.json({
            "gallery": gallery
        });
    });
})

console.log(getPublicFile("gallery"));
console.log(__dirname + "/public/gallery");

expressApp.use(express.static("public"));

// -- 404 PAGE --
expressApp.use("*", (req, res) => {
    res.sendFile(getPublicFile("404.html"));
})

expressApp.listen(port);