const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/filmsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((dbConn) => {
    console.log("Connected to MongoDB");

    // password is test
    dbConn.connection.collection("users").insertMany([{
        email: "syadav@gmail.com",
        password: "$2b$10$TKWql/z79gmVud1peVLNZ.uly05CY4pv191kSPEVku4vZEsBToexe"
    },
    {
        email: "sant@gmail.com",
        password: "$2b$10$TKWql/z79gmVud1peVLNZ.uly05CY4pv191kSPEVku4vZEsBToexe"
    }]).then(() => console.log("user data seeded"))
        .catch(err => console.error(err));

    dbConn.connection.collection("films").insertMany([{
        name: "Godzilla",
        desc: "Godzilla",
        releaseDate: "2010-09-29T12:01:21.592Z",
        rating: "5",
        ticketPrice: "500",
        country: "USA",
        genre: "action",
        photo: "NA"
    },
    {
        name: "Avatar",
        desc: "Avatar",
        releaseDate: "2015-09-29T12:01:21.592Z",
        rating: "4",
        ticketPrice: "300",
        country: "USA",
        genre: "action",
        photo: "NA"
    },
    {
        name: "Rocky",
        desc: "Rocky",
        releaseDate: "1980-09-29T12:01:21.592Z",
        rating: "5",
        ticketPrice: "500",
        country: "USA",
        genre: "action",
        photo: "NA"
    }]).then(() => console.log("film data seeded"))
        .catch(err => console.error(err));
}
);