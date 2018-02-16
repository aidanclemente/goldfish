var shortid = require("shortid");

// $(".submit").on("click", function(event) {
//     event.preventDefault();
//     console.log("KDFHJOWETH00");
//     var newReservation = {
//         name: $("#name").val().trim(),
//         phoneNumber: $("#phoneNumber").val().trim(),
//         email: $('#email').val().trim(),
//         uniquerID: (shortid.generate())
//     };

//     console.log(newReservation);

//     $.post("/api/new", newReservation)
//     .then(function(data) {
//       console.log(data);
//       alert("Adding reservations...");
//     });
//   });

function clearTable() {
    var currentURL = window.location.origin;
    $.ajax({url: currentURL + "/api/clear", method: "POST"})
}

$("#clear").on("click", function() {
    alert("Clearing...");
    clearTable();
});

    // If reservations is > 5 then put them on the wait list

