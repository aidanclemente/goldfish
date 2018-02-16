var express = require("express");
var bodyParser = require("body-parser");
var shortid = require("shortid");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var reservation = [{
    uniqueID: (shortid.generate())
}];
var waiter = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));  
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/all", function(req, res) {
    res.json(reservation);
  });

app.get("/reservations/:reservation?", function(req, res) {
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

  app.get("/waitlist/:waiter?", function(req, res) {
    var chosen = req.params.waiter;
  
    if (chosen) {
      console.log(chosen);
      for (var i = 0; i < waiter.length; i++) {
        if (chosen === waiter[i].routeName) {
          return res.json(waiter[i]);
        }
      }
      return res.json(false);
    }
    return res.json(waiter);
  });

app.post("/api/new", function(req, res) {
        var newReservation = req.body;
        newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
        console.log(newReservation);
        if (reservation.length < 6) {
            console.log(reservation.length);
            reservation.push(newReservation);
            res.json("Reservation: " + newReservation);
        } else {
            waiter.push(newReservation);
            res.json(newReservation);
            console.log("Wait List: " + waiter.length);
        };

  });

  app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
})

