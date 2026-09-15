/* =========================================
   ChemReport
   Application JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("ChemReport เริ่มทำงานแล้ว");

    initNavigation();
    initSearch();
    initQuickActions();
    initButtons();
});


/* =========================================
   Navigation
   ========================================= */

function initNavigation() {

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {

        item.addEventListener("click", (event) => {

            event.preventDefault();

            menuItems.forEach((menu) => {
                menu.classList.remove("active");
            });

            item.classList.add("active");

            const menuName = item
                .querySelector("span:last-child")
                ?.textContent
                .trim();

            console.log("เปิดเมนู:", menuName);
        });

    });
}


/* =========================================
   Search Chemical
   ========================================= */

function initSearch() {

    const searchInput = document.querySelector(
        ".search-box input"
    );

    const tableBody = document.querySelector(
        "tbody"
    );

    if (!searchInput || !tableBody) {
        return;
    }

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {

            const text = row.textContent
                .toLowerCase();

            if (
                keyword === "" ||
                text.includes(keyword)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });
}


/* =========================================
   Quick Actions
   ========================================= */

function initQuickActions() {

    const buttons = document.querySelectorAll(
        ".card .btn"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const text = button.textContent
                .trim();

            console.log("กดปุ่ม:", text);

            if (text.includes("เพิ่มสารเคมี")) {
                showMessage(
                    "กำลังเปิดหน้าสำหรับเพิ่มข้อมูลสารเคมี"
                );
            }

            if (text.includes("อัปโหลด SDS")) {
                showMessage(
                    "กำลังเปิดระบบอัปโหลด SDS"
                );
            }

            if (text.includes("วิเคราะห์ SDS")) {
                showMessage(
                    "กำลังเปิดระบบ AI วิเคราะห์ SDS"
                );
            }

        });

    });
}


/* =========================================
   General Buttons
   ========================================= */

function initButtons() {

    const buttons = document.querySelectorAll(
        ".btn"
    );

    buttons.forEach((button) => {

        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.98)";
        });

        button.addEventListener("mouseup", () => {
            button.style.transform = "";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });
}


/* =========================================
   Message
   ========================================= */

function showMessage(message) {

    const existing = document.querySelector(
        ".chemreport-message"
    );

    if (existing) {
        existing.remove();
    }

    const box = document.createElement("div");

    box.className = "chemreport-message";

    box.textContent = message;

    box.style.position = "fixed";
    box.style.bottom = "25px";
    box.style.right = "25px";
    box.style.zIndex = "9999";

    box.style.background = "#2563eb";
    box.style.color = "#ffffff";

    box.style.padding = "14px 20px";

    box.style.borderRadius = "10px";

    box.style.boxShadow =
        "0 8px 24px rgba(15, 23, 42, 0.15)";

    box.style.fontSize = "14px";

    document.body.appendChild(box);

    setTimeout(() => {

        box.remove();

    }, 2500);
}
