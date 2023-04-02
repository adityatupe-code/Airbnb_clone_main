const express = require("express");
const app = express.Router();
const { MongoClient } = require('mongodb');
//Connection URL
const url = process.env.MONGODBURL;
const client = new MongoClient(url);

//Database Name
const dbName = 'sample_airbnb';


app.get("/", (req, res) => {
    const itemId = req.query.id;
    console.log("contactHost Router", itemId)
    const userPresent = req.cookies.userInfo;


    if (userPresent) {
        async function main() {
            // Use connect method to connect to the server
            await client.connect();
            console.log('mongodb Connected successfully to server');
            const db = client.db(dbName);
            const collection = db.collection('listingsAndReviews');
            const host = await collection.find({ _id: itemId }).toArray();
           // console.log(userSelect)
            res.render("contactHost", { userPresent, host });
            return "done booking page"
        };
        main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
       
    } else {
        res.render("login_page");
    }
});

module.exports = app;




// bookingRouter.get("/", (req, res) => {
//     const itemId = req.query.id; // get the id from the query parameter
//     // do something with the id, such as retrieve the item from the database
//     const userPresent = req.cookies.userInfo;
//     console.log("userinfo present", userPresent);
//     async function main() {
//         // Use connect method to connect to the server
//         await client.connect();
//         console.log('mongodb Connected successfully to server');
//         const db = client.db(dbName);
//         const collection = db.collection('listingsAndReviews');
//         const host = await collection.find({ _id: itemId }).toArray();
//        // console.log(userSelect)
//         res.render("contactHost", { userPresent, host });
//         return "done booking page"
//     };
//     main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// });