var shortid = require("shortid");

$("#submitReservation").on("click", function(event) {
    event.preventDefault();

    var newReservation = {
        name: $("#name").val().trim(),
        phoneNumber: $("#phoneNumber").val().trim(),
        email: $('#email').val().trim(),
        uniquerID: (shortid.generate())
    };

    console.log(newReservation);

    $.post("/api/tables", newReservation,
    function(data){
        // If a table is available... tell user they are booked.
        if(data == true){
            alert("Your reservation has been made!")
        }
        // If a table is available... tell user they on the waiting list.
        if(data == false){
            alert("Sorry, you are on the wait list")
        }
        // Clear the form when submitting
        $('#name').val("");
        $('#phoneNumber').val("");
        $('#email').val("");
        $('#uniqueID').val("");
    });

    return false;

});

function clearTable() {
    var currentURL = window.location.origin;
    $.ajax({url: currentURL + "/api/clear", method: "POST"})
}

$("#clear").on("click", function() {
    alert("Clearing...");
    clearTable();
});

    // If reservations is > 5 then put them on the wait list

