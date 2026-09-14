// ==========================================
// ChemReport - Application JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // Demo chemical data
    // -------------------------------
    let chemicals = [
        {
            name: "Sodium Chloride",
            cas: "7647-14-5",
            supplier: "Merck",
            hazard: "Low"
        },
        {
            name: "Ethanol",
            cas: "64-17-5",
            supplier: "Sigma-Aldrich",
            hazard: "Medium"
        },
        {
            name: "Hydrochloric Acid",
            cas: "7647-01-0",
            supplier: "Merck",
            hazard: "High"
        }
    ];


    // ==========================================
    // Sidebar menu
    // ==========================================

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            menuItems.forEach(function (menu) {
                menu.classList.remove("active");
            });

            this.classList.add("active");

            const pageName = this.textContent.trim();

            showNotification("เปิดเมนู " + pageName);

        });

    });


    // ==========================================
    // Quick action buttons
    // ==========================================

    const actionButtons = document.querySelectorAll(".quick-action");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const action = this.textContent.trim();

            showNotification("กำลังเปิด " + action);

        });

    });


    // ==========================================
    // Notification button
    // ==========================================

    const notificationButton =
        document.querySelector(".notification");

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            showNotification("ยังไม่มีการแจ้งเตือนใหม่");

        });

    }


    // ==========================================
    // Chemical search
    // ==========================================

    const searchInput =
        document.querySelector("#chemicalSearch");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const keyword =
                this.value.toLowerCase().trim();

            const rows =
                document.querySelectorAll("#chemicalTable tbody tr");

            rows.forEach(function (row) {

                const text =
                    row.textContent.toLowerCase();

                if (text.includes(keyword)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }


    // ==========================================
    // Add chemical button
    // ==========================================

    const addChemicalButton =
        document.querySelector(".add-chemical");

    if (addChemicalButton) {

        addChemicalButton.addEventListener("click", function () {

            openChemicalForm();

        });

    }


    // ==========================================
    // Import SDS button
    // ==========================================

    const importSDSButton =
        document.querySelector(".import-sds");

    if (importSDSButton) {

        importSDSButton.addEventListener("click", function () {

            showNotification(
                "ระบบนำเข้า SDS อยู่ในโหมดสาธิต"
            );

        });

    }


    // ==========================================
    // AI SDS button
    // ==========================================

    const aiButton =
        document.querySelector(".analyze-sds");

    if (aiButton) {

        aiButton.addEventListener("click", function () {

            showNotification(
                "ระบบวิเคราะห์ SDS ด้วย AI อยู่ในโหมดสาธิต"
            );

        });

    }


    // ==========================================
    // Report button
    // ==========================================

    const reportButton =
        document.querySelector(".view-report");

    if (reportButton) {

        reportButton.addEventListener("click", function () {

            showNotification(
                "กำลังเปิดรายงานข้อมูลสารเคมี"
            );

        });

    }


    // ==========================================
    // Initialize
    // ==========================================

    updateChemicalCount();

});


// ==========================================
// Show notification
// ==========================================

function showNotification(message) {

    const oldNotification =
        document.querySelector(".system-notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "system-notification";

    notification.textContent =
        message;

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


// ==========================================
// Chemical form
// ==========================================

function openChemicalForm() {

    const oldModal =
        document.querySelector(".chemical-modal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.className =
        "chemical-modal";


    modal.innerHTML = `

        <div class="chemical-modal-box">

            <div class="chemical-modal-header">

                <h2>เพิ่มข้อมูลสารเคมี</h2>

                <button
                    class="close-modal"
                    type="button">
                    ×
                </button>

            </div>


            <div class="chemical-form">

                <label>
                    ชื่อสารเคมี
                </label>

                <input
                    id="newChemicalName"
                    type="text"
                    placeholder="เช่น Acetone"
                >


                <label>
                    CAS Number
                </label>

                <input
                    id="newChemicalCAS"
                    type="text"
                    placeholder="เช่น 67-64-1"
                >


                <label>
                    ผู้ผลิต / ผู้จำหน่าย
                </label>

                <input
                    id="newChemicalSupplier"
                    type="text"
                    placeholder="ชื่อผู้ผลิตหรือผู้จำหน่าย"
                >


                <label>
                    ระดับความเสี่ยง
                </label>

                <select id="newChemicalHazard">

                    <option value="Low">
                        ต่ำ
                    </option>

                    <option value="Medium">
                        ปานกลาง
                    </option>

                    <option value="High">
                        สูง
                    </option>

                </select>


                <button
                    id="saveChemical"
                    type="button">
                    บันทึกข้อมูล
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    // Close modal

    const closeButton =
        modal.querySelector(".close-modal");

    closeButton.addEventListener("click", function () {

        modal.remove();

    });


    // Save chemical

    const saveButton =
        modal.querySelector("#saveChemical");

    saveButton.addEventListener("click", function () {

        const name =
            document.querySelector("#newChemicalName").value.trim();

        const cas =
            document.querySelector("#newChemicalCAS").value.trim();

        const supplier =
            document.querySelector("#newChemicalSupplier").value.trim();

        const hazard =
            document.querySelector("#newChemicalHazard").value;


        if (!name || !cas) {

            showNotification(
                "กรุณากรอกชื่อสารเคมีและ CAS Number"
            );

            return;

        }


        const newChemical = {

            name: name,

            cas: cas,

            supplier: supplier || "-",

            hazard: hazard

        };


        chemicals.push(newChemical);


        addChemicalToTable(newChemical);


        updateChemicalCount();


        modal.remove();


        showNotification(
            "เพิ่มข้อมูลสารเคมีเรียบร้อยแล้ว"
        );

    });

}


// ==========================================
// Add chemical to table
// ==========================================

function addChemicalToTable(chemical) {

    const table =
        document.querySelector("#chemicalTable tbody");


    if (!table) {
        return;
    }


    const row =
        document.createElement("tr");


    let hazardClass = "badge-low";
    let hazardText = "ต่ำ";


    if (chemical.hazard === "Medium") {

        hazardClass = "badge-medium";
        hazardText = "ปานกลาง";

    }


    if (chemical.hazard === "High") {

        hazardClass = "badge-high";
        hazardText = "สูง";

    }


    row.innerHTML = `

        <td>
            ${chemical.name}
        </td>

        <td>
            ${chemical.cas}
        </td>

        <td>
            ${chemical.supplier}
        </td>

        <td>
            <span class="${hazardClass}">
                ${hazardText}
            </span>
        </td>

    `;


    table.appendChild(row);

}


// ==========================================
// Update chemical count
// ==========================================

function updateChemicalCount() {

    const counters =
        document.querySelectorAll(".chemical-count");


    counters.forEach(function (counter) {

        counter.textContent =
            chemicals.length;

    });

}
