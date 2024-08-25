var MongoClient = require("mongodb").MongoClient;
// var url =
//        "mongodb+srv://sarc2020:Alumni123@cluster0.sshdt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var url = "mongodb+srv://sarc2020:Alumni123@cluster0.sshdt.mongodb.net/sarc_yearbook22?retryWrites=true&w=majority";

//var url = "mongodb://127.0.0.1:27017"
// use only when not on server

MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("myFirstDatabase");
      // var query = { bitsId: "2020A7PS0060P" };
      // dbo.collection("users").createIndex( { name:"text",bitsId: "text" } )

      dbo.collection("users")
            .find({"bitsId":{$regex : "2019A"}})
            .toArray(function (err, result) {
                  if (err) throw err;
                  // console.log(result);
                  db.close();
            });
    
        // db.collection("users").find({$contains:{"bitsId":"2019"}})


      // dbo.collection("users")
      //       .find({
      //             bitsId: { $exists: true },
      //             $expr: { $lt: [{ $strLenCP: "$bitsId" }, 13] },
      //       })
      //       .toArray((err, result) => {
                  
      //             if (err) throw err;
      //             console.log(result);
      //             result.slice(0, 2);
      //             result.forEach(
      //                   function(e, i){ 
      //                       e.bitsId= e.bitsId + 'P';
      //                       dbo.collection("users").save(e);
      //                   }
      //                )
      //       })
            

      // dbo.collection("users").updateOne(
      //       {
      //             bitsId: { $exists: true },
      //             $expr: { $lt: [{ $strLenCP: "$bitsId" }, 13] },
      //       },
      //       { $set: { bitsId: { $concat: [ "$bitsId", "P" ] } } }
      // );

      // dbo.collection("newCol").aggregate([{ $match: {} }, { $out: "collection2" }])

});
