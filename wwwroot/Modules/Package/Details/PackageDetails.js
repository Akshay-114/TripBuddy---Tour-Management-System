// ENTRY POINT
// Initialize package listing on page load
function InitPackageDetails() {
    LoadPackages();
}

// LOAD PACKAGES INTO UI
// Fetch packages from server using AJAX
function LoadPackages() {
    $.ajax({
        url: "/Package/GetPackages",
        type: "GET",
        success: function (data) {
            RenderPackages(data);
        },
        error: function () {
            alert("Failed to load packages");
        }
    });
}

// RENDER PACKAGES
// Render package cards dynamically
function RenderPackages(packages) {
    const divTarget = $("#divTarget");
    divTarget.html("");

    packages.forEach(pkg => {
        const card = `
        <div class="tourlist-card">
            <div class="tourlist-image">
                <img src="${pkg.imagePath ?? '/images/tour1.jpg'}" alt="Tour">
            </div>

            <div class="tourlist-content">
                <h3 class="tourlist-title">${pkg.packageName}</h3>
                <p class="tourlist-location">${pkg.location}</p>
                <p class="tourlist-desc">${pkg.description}</p>
            </div>

            <div class="tourlist-pricebox">
                <span class="tourlist-price">₹ ${pkg.price}</span>
                <div class="tourlist-buttons">
                    <a href="javascript:void(0)" onclick="EditPackage(${pkg.packageId})" class="tourlist-edit">Edit</a>
                    <a href="javascript:void(0)" onclick="DeletePackage(${pkg.packageId})" class="tourlist-delete">Delete</a>
                </div>
            </div>
        </div>`;
        divTarget.append(card);
    });
}

// SOFT DELETE
// Soft delete a package with confirmation
function DeletePackage(id) {

    Swal.fire({
        title: "Delete this package?",
        text: "This package will be removed from the list",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: "/Package/SoftDelete",
                type: "POST",
                data: { id: id },
                success: function () {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Package deleted successfully.",
                        icon: "success"
                    });

                    LoadPackages(); // reload list
                },
                error: function () {
                    Swal.fire("Error", "Failed to delete package", "error");
                }
            });

        }
    });
}


// EDIT PACKAGE
// Navigate to edit page
function EditPackage(id) {
    window.location.href = "/Home/AddPackage?id=" + id;
}

$(document).ready(function () {
    InitPackageDetails();
});
