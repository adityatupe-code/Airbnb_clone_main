const express = require("express");

const app = express.Router();
//Sending MOngoDb data.
const { MongoClient } = require('mongodb');
//Connection URL
const url = process.env.MONGODBURL;
const client = new MongoClient(url);

//Database Name
const dbName = 'sample_airbnb';





app.get("/", (req, res) => {
    //cookies data for user-info.
  const userInfo = req.cookies.userInfo;//user cookie for authntication.
  let searchData = req.query.country;//search query fron client side.
  console.log("SEarch data from homePage***",searchData)
    //Mongodb data for showcase.
  async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('mongodb Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('listingsAndReviews');
   
    
    //if else statement for giving proper resopnse.
    if (searchData) {//for Search data.
      const regex = new RegExp(searchData, 'i');
      

      const findResult = await collection.find({ 'address.country': regex }).toArray();
      res.render("home_page", { userInfo, findResult },);
        console.log("searchdata was send succesfully", findResult.length)
        return " done";
      
    }
   else {//code for all data

      // the following code examples can be pasted here...
      const projection = { name: 1, images: 1, address: 1, price: 1, };
      const pipeline = [{ $sample: { size: 100 } }];
      const findResult = await collection.aggregate(pipeline).toArray();
     
      console.log("*******", findResult.length)
      res.render("home_page", { userInfo, findResult });
      return 'done.';
}
    
      
};//main Function End....

    main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

 
});




module.exports = app;

// .project({ name: 1, images: 1, address: 1, price: 1,
//   })name:"Ribeira Charming Duplex"