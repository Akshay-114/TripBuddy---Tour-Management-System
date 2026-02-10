// ENTRY POINT
function Init() {
    LoadBookings();
}

// LOAD BOOKINGS INTO TABLE
function LoadBookings() {
    $.ajax({
        url: "/Booking/GetBookings",
        type: "GET",
        success: function (data) {
            RenderTable(data);
        },
        error: function (err) {
            console.error("Error loading bookings", err);
        }
    });
}

// RENDER BOOKINGS IN TABLE
function RenderTable(bookings) {
    const tbody = $("#bookingTableBody");
    tbody.html(""); // clear previous rows

    bookings.forEach(function (b) {
        const row = `
            <tr>
                <td>${b.customerID}</td>
                <td>${b.customerName}</td>
                <td>${b.mobileNo}</td>
                <td>${b.packageName}</td>
                <td>${b.price}</td>
                <td>
                    <button class="booking-btn booking-btn-edit" onclick="EditBooking(${b.customerID})">Edit</button>
                    <button class="booking-btn booking-btn-delete" onclick="DeleteBooking(${b.customerID})">Delete</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

// EDIT BOOKING
function EditBooking(id) {
    window.location.href = "/Home/UserForm?id=" + id;
}

function DeleteBooking(id) {

    Swal.fire({
        title: "Delete this booking?",
        text: "This booking will be removed from the list.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: "/Booking/SoftDelete",
                type: "POST",
                data: { id: id },
                success: function () {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Booking has been deleted.",
                        icon: "success"
                    });

                    LoadBookings(); // refresh table
                },
                error: function (err) {
                    Swal.fire("Error", "Failed to delete booking", "error");
                    console.error(err);
                }
            });

        }
    });
}


$(document).ready(function () {
    Init();
});
