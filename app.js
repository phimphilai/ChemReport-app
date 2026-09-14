// ================================
// ChemReport - Main JavaScript
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // Sidebar menu
    // -------------------------------
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            menuItems.forEach(function (menu) {
                menu.classList.remove("active");
            });

            this.classList.add("active");

            const pageName = this.textContent.trim();

            showNotification("กำลังเปิด " + pageName);
        });
    });


    // -------------------------------
    // Quick Action buttons
    // -------------------------------
    const actionButtons = document.querySelectorAll(".quick-action");

    actionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const action = this.textContent.trim();

            showNotification("เปิดเมนู: " + action);
        });
    });


    // -------------------------------
    // Notification
    // -------------------------------
    const notificationButton = document.querySelector(".notification");

    if (notificationButton) {
        notificationButton.addEventListener("click", function () {
            showNotification("ยังไม่มีการแจ้งเตือนใหม่");
        });
    }


    // -------------------------------
    // Search chemical
    // -------------------------------
    const searchInput = document.querySelector("#chemicalSearch");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const keyword = this.value.toLowerCase();
            const rows = document.querySelectorAll("#chemicalTable tbody tr");

            rows.forEach(function (row) {

                const text = row.textContent.toLowerCase();

                if (text.includes(keyword)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });
        });
    }

});


// ================================
// Notification function
// ================================

function showNotification(message) {

    const oldNotification = document.querySelector(".system-notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement("div");

    notification.className = "system-notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(function () {
        notification.classList.add("show");
    }, 50);

    setTimeout(function () {

        notification.classList.remove("show");

        setTimeout(function () {
            notification.remove();
        }, 300);

    }, 2500);
}
