$("#submitReservation").on("click", function(event) {
    event.preventDefault();

    var newReservation = {
        customerName: $("#name").val().trim(),
        phoneNumber: $("#phoneNumber").val().trim(),
        customerEmail: $('#email').val().trim(),
        customerID: $('#uniqueID').val().trim()
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

    // If reservations is > 5 then put them on the wait list

