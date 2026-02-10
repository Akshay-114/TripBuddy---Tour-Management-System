// ENTRY POINT
// Initialize package listing on page load
function InitBooking() {
    ReadyBooking();
}


function ReadyBooking() {
    LoadPackages();
    LoadEditBookingData();
    AddBookingEvents();
    BindPackageChange();
}

// ATTACH EVENTS
function AddBookingEvents() {
    RemoveBookingEvents();

    $("#CustForm").on("submit", function (e) {
        e.preventDefault();
        SaveCustomerBooking();
    });

    $(".cust-btn-secondary").on("click", function () {
        ClearForm();
    });
}

function RemoveBookingEvents() {
    $("#CustForm").off("submit");
    $(".cust-btn-secondary").off("click");
}

// LOAD PACKAGES INTO DROPDOWN
function LoadPackages() {
    $.ajax({
        url: "/Package/GetPackages",
        type: "GET",
        success: function (data) {
            const select = $("#packageSelect");
            select.empty();
            select.append(`<option value="">-- Select Package --</option>`);

            $.each(data, function (i, pkg) {
                select.append(`<option value="${pkg.price}" data-packagename="${pkg.packageName}">${pkg.packageName}</option>`);
            });
        },
        error: function () {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load packages!",
            });
        }
    });
}

// LOAD DATA FOR EDIT
function LoadEditBookingData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id && id != 0) {
        $.ajax({
            url: "/Booking/GetBookingById",
            type: "GET",
            data: { id: id },
            success: function (data) {
                if (!data) return;

                $("#customerId").val(data.customerID);
                $("#customerName").val(data.customerName);
                $("#mobileNo").val(data.mobileNo);
                $("#email").val(data.email);

                $("#packageSelect option").each(function () {
                    if ($(this).text() === data.packageName) {
                        $(this).prop("selected", true);
                        $("#packageCost").val(data.price);
                    }
                });
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    text: "Failed to load booking data!",
                });
            }
        });
    }
}

// PACKAGE DROPDOWN CHANGE
function BindPackageChange() {
    $("#packageSelect").on("change", function () {
        const price = $(this).val();
        $("#packageCost").val(price);
    });
}

// SAVE / UPDATE CUSTOMER BOOKING
function SaveCustomerBooking() {
    if ($("#packageSelect").val() === "") {
        Swal.fire("Kindly select a package!");

        return;
    }

    const formData = {
        CustomerID: parseInt($("#customerId").val()) || 0,
        CustomerName: $("#customerName").val(),
        MobileNo: $("#mobileNo").val(),
        Email: $("#email").val(),
        PackageName: $("#packageSelect option:selected").text(),
        Price: parseFloat($("#packageCost").val()) || 0
    };

    $.ajax({
        url: "/Booking/Save",
        type: "POST",
        data: formData,
        success: function () {
            Swal.fire({
                title: "Success!",
                text: "Form submitted successfully!",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                window.location.href = "/Home/Booking";
            });
        },
        error: function (xhr) {
            alert(xhr.responseText || "Something went wrong while saving");
        }
    });
}

// CLEAR FORM
function ClearForm() {
    $("#CustForm")[0].reset();
    $("#customerId").val(0);
    $("#packageCost").val("");
}

$(document).ready(function () {
    InitBooking();
});
