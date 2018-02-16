var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var reservation = [
    {
        routeName: "reservation1",
        name: "guest1",
        phoneNumber: "555-555-5555",
        email: "email@domain.com",
        uniqueID: "001"
    }
];
var waitList = [
    {
        routeName: "waiter1",
        name: "guest1",
        phoneNumber: "555-555-5555",
        email: "email@domain.com",
        uniqueID: "001"
    }
]
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/tables.html", function(req, res) {
  res.sendFile(path.join(__dirname, "/tables.html"));  
});
app.get("/reserve.html", function (req, res) {
    res.sendFile(path.join(__dirname, "/reserve.html"));
});
app.get("/all", function(req, res) {
    res.json(reservation);
  });
app.get("/api/:reservation?", function(req, res) {
    var chosen = req.params.reservation;
  
    if (chosen) {
      console.log(chosen);
      for (var i = 0; i < reservation.length; i++) {
        if (chosen === reservation[i].routeName) {
          return res.json(reservation[i]);
        } 
      }
      return res.json(false);
    }
    return res.json(reservation);
  });
app.post("/api/new", function(req, res) {
        var newReservation = req.body;
        newReservation.routeName = newReservation.routeName.replace(/\s+/g, "").toLowerCase();
        console.log(newReservation);
        
        reservation.push(newReservation);
        res.json(newReservation);
        console.log("Reservation");
  });
  app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
})