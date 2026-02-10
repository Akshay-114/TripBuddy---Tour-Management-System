// ENTRY POINT
// Entry point when page loads
function Init() {
    Ready();
}

function Ready() {
    LoadEditData();
    AddEvents();
}



// ATTACH EVENTS
// Attach and manage form submit events
function AddEvents() {
    RemoveEvents();
    $("#tourForm").on("submit", function (e) {
        e.preventDefault();
        SavePackage();
    });
}

function RemoveEvents() {
    $("#tourForm").off("submit");
}


// LOAD DATA FOR EDIT
// Load package details when editing
function LoadEditData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id && id != 0) {
        $.ajax({
            url: "/Package/GetPackageById",
            type: "GET",
            data: { id: id },
            success: function (data) {
                if (!data) return;

                $("#packageId").val(data.packageId);
                $("#title").val(data.packageName);
                $("#location").val(data.location);
                $("#description").val(data.description);
                $("#price").val(data.price);
            },
            error: function () {
                Swal.fire({
                    icon: "Error",
                    title: "Oops...",
                    text: "Failed to load package data!",
                });
            }
        });
    }
}


// SAVE / UPDATE
// Save or update package using AJAX and FormData
function SavePackage() {

    const form = $("#tourForm");
    const formData = new FormData(form[0]);
    const packageId = $("#packageId").val();

    const url = (packageId == 0 || packageId === "")
        ? "/Package/SavePackage"
        : "/Package/UpdatePackage";

    // Disable save button to prevent double submit
    $(".tourform-save").prop("disabled", true).text("Saving...");

    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,

        success: function () {
            Swal.fire({
                title: "Success!",
                text: packageId == 0
                    ? "Package added successfully!"
                    : "Package updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#12B7B0"
            }).then(() => {
                window.location.href = "/Home/AddPackage";
            });
        },

        error: function (xhr) {
            Swal.fire({
                title: "Error",
                text: xhr.responseText || "Something went wrong while saving",
                icon: "error"
            });
        },

        complete: function () {
            // Re-enable button if something fails
            $(".tourform-save").prop("disabled", false).text("Save");
        }
    });
}


$(document).ready(function () {
    Init();
});
