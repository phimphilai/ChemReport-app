// ======================================================
// ChemReport - Chemical Management System
// ======================================================

// ข้อมูลสารเคมีตัวอย่าง
let chemicals = [
    {
        name: "Sodium Chloride",
        thaiName: "โซเดียมคลอไรด์",
        cas: "7647-14-5",
        risk: "ความเสี่ยงต่ำ",
        riskClass: "normal",
        sds: "✓ มี SDS",
        sdsClass: "success"
    },
    {
        name: "Ethanol",
        thaiName: "เอทานอล",
        cas: "64-17-5",
        risk: "ความเสี่ยงปานกลาง",
        riskClass: "warning",
        sds: "✓ มี SDS",
        sdsClass: "success"
    },
    {
        name: "Hydrochloric Acid",
        thaiName: "กรดไฮโดรคลอริก",
        cas: "7647-01-0",
        risk: "ความเสี่ยงสูง",
        riskClass: "danger",
        sds: "⚠ รอตรวจสอบ",
        sdsClass: "pending"
    }
];


// ======================================================
// เมื่อโหลดหน้าเว็บ
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    setupButtons();
    setupSearch();

});


// ======================================================
// เชื่อมปุ่มต่าง ๆ
// ======================================================

function setupButtons() {

    // ปุ่มเพิ่มสารเคมี
    const addButton = document.querySelector(".add-chemical");

    if (addButton) {
        addButton.addEventListener("click", function () {
            openChemicalModal();
        });
    }


    // ปุ่มนำเข้า SDS
    const importButton = document.querySelector(".import-sds");

    if (importButton) {
        importButton.addEventListener("click", function () {
            showNotification("ฟังก์ชันนำเข้า SDS อยู่ในโหมดสาธิต");
        });
    }


    // ปุ่มวิเคราะห์ SDS
    const analyzeButton = document.querySelector(".analyze-sds");

    if (analyzeButton) {
        analyzeButton.addEventListener("click", function () {
            showNotification("AI วิเคราะห์ SDS อยู่ในโหมดสาธิต");
        });
    }


    // ปุ่มดูรายงาน
    const reportButton = document.querySelector(".view-report");

    if (reportButton) {
        reportButton.addEventListener("click", function () {
            showNotification("กำลังเปิดรายงาน ChemReport");
        });
    }

}


// ======================================================
// ระบบค้นหาสารเคมี
// ======================================================

function setupSearch() {

    const searchInput = document.getElementById("chemicalSearch");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase().trim();

        const rows = document.querySelectorAll(
            "#chemicalTable tbody tr"
        );

        rows.forEach(function (row) {

            const text = row.innerText.toLowerCase();

            row.style.display =
                text.includes(keyword) ? "" : "none";

        });

    });

}


// ======================================================
// เปิดหน้าต่างเพิ่มสารเคมี
// ======================================================

function openChemicalModal() {

    // ถ้ามี Modal อยู่แล้ว ไม่สร้างซ้ำ
    const oldModal = document.querySelector(".chemical-modal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal = document.createElement("div");

    modal.className = "chemical-modal";


    modal.innerHTML = `

        <div class="chemical-modal-box">

            <div class="chemical-modal-header">

                <div>
                    <h2>➕ เพิ่มสารเคมี</h2>
                    <p>กรอกข้อมูลสารเคมีเพื่อเพิ่มเข้าสู่ระบบ</p>
                </div>

                <button
                    class="chemical-close"
                    type="button"
                >
                    ×
                </button>

            </div>


            <form id="chemicalForm">


                <div class="form-group">

                    <label>
                        ชื่อสารเคมี *
                    </label>

                    <input
                        type="text"
                        id="chemicalName"
                        placeholder="เช่น Ethanol"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        ชื่อภาษาไทย
                    </label>

                    <input
                        type="text"
                        id="chemicalThaiName"
                        placeholder="เช่น เอทานอล"
                    >

                </div>


                <div class="form-group">

                    <label>
                        CAS Number *
                    </label>

                    <input
                        type="text"
                        id="chemicalCAS"
                        placeholder="เช่น 64-17-5"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        ระดับความเสี่ยง
                    </label>

                    <select id="chemicalRisk">

                        <option value="normal">
                            ความเสี่ยงต่ำ
                        </option>

                        <option value="warning">
                            ความเสี่ยงปานกลาง
                        </option>

                        <option value="danger">
                            ความเสี่ยงสูง
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        สถานะ SDS
                    </label>

                    <select id="chemicalSDS">

                        <option value="success">
                            มี SDS
                        </option>

                        <option value="pending">
                            รอตรวจสอบ
                        </option>

                        <option value="danger">
                            ไม่มี SDS
                        </option>

                    </select>

                </div>


                <div class="chemical-form-actions">

                    <button
                        type="button"
                        class="cancel-chemical"
                    >
                        ยกเลิก
                    </button>

                    <button
                        type="submit"
                        class="save-chemical"
                    >
                        ✓ บันทึกสารเคมี
                    </button>

                </div>


            </form>

        </div>

    `;


    document.body.appendChild(modal);


    // ปุ่มปิด
    modal
        .querySelector(".chemical-close")
        .addEventListener("click", function () {
            modal.remove();
        });


    // ปุ่มยกเลิก
    modal
        .querySelector(".cancel-chemical")
        .addEventListener("click", function () {
            modal.remove();
        });


    // บันทึกข้อมูล
    modal
        .querySelector("#chemicalForm")
        .addEventListener("submit", function (event) {

            event.preventDefault();

            saveChemical();

        });


    // คลิกพื้นหลังเพื่อปิด
    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            modal.remove();
        }

    });

}


// ======================================================
// บันทึกสารเคมี
// ======================================================

function saveChemical() {

    const name =
        document.getElementById("chemicalName").value.trim();

    const thaiName =
        document.getElementById("chemicalThaiName").value.trim();

    const cas =
        document.getElementById("chemicalCAS").value.trim();

    const risk =
        document.getElementById("chemicalRisk").value;

    const sds =
        document.getElementById("chemicalSDS").value;


    if (!name || !cas) {

        alert("กรุณากรอกชื่อสารเคมีและ CAS Number");

        return;

    }


    // ตรวจสอบ CAS ซ้ำ
    const duplicate = chemicals.some(function (chemical) {

        return chemical.cas.toLowerCase() === cas.toLowerCase();

    });


    if (duplicate) {

        alert(
            "พบ CAS Number นี้ในระบบแล้ว\nกรุณาตรวจสอบข้อมูลก่อนบันทึก"
        );

        return;

    }


    let riskText = "ความเสี่ยงต่ำ";

    if (risk === "warning") {
        riskText = "ความเสี่ยงปานกลาง";
    }

    if (risk === "danger") {
        riskText = "ความเสี่ยงสูง";
    }


    let sdsText = "✓ มี SDS";
    let sdsClass = "success";

    if (sds === "pending") {

        sdsText = "⚠ รอตรวจสอบ";
        sdsClass = "pending";

    }

    if (sds === "danger") {

        sdsText = "✕ ไม่มี SDS";
        sdsClass = "danger";

    }


    const newChemical = {

        name: name,
        thaiName: thaiName || "-",
        cas: cas,
        risk: riskText,
        riskClass: risk,
        sds: sdsText,
        sdsClass: sdsClass

    };


    chemicals.push(newChemical);


    addChemicalToTable(newChemical);


    const modal =
        document.querySelector(".chemical-modal");

    if (modal) {
        modal.remove();
    }


    showNotification(
        "✓ เพิ่ม " + name + " เข้าสู่ระบบเรียบร้อยแล้ว"
    );

}


// ======================================================
// เพิ่มข้อมูลลงตาราง
// ======================================================

function addChemicalToTable(chemical) {

    const table =
        document.querySelector("#chemicalTable tbody");

    if (!table) return;


    const row = document.createElement("tr");


    row.innerHTML = `

        <td>

            <strong>
                ${escapeHTML(chemical.name)}
            </strong>

            <small>
                ${escapeHTML(chemical.thaiName)}
            </small>

        </td>


        <td>
            ${escapeHTML(chemical.cas)}
        </td>


        <td>

            <span class="badge ${chemical.riskClass}">
                ${chemical.risk}
            </span>

        </td>


        <td>

            <span class="badge ${chemical.sdsClass}">
                ${chemical.sds}
            </span>

        </td>


        <td>

            <button
                class="table-btn"
                type="button"
                onclick="showNotification('กำลังเปิดข้อมูล ${escapeHTML(chemical.name)}')"
            >
                ดูข้อมูล
            </button>

        </td>

    `;


    table.appendChild(row);

}


// ======================================================
// แจ้งเตือนมุมขวาล่าง
// ======================================================

function showNotification(message) {

    const old =
        document.querySelector(".system-notification");

    if (old) {
        old.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "system-notification";

    notification.textContent =
        message;


    document.body.appendChild(notification);


    setTimeout(function () {

        notification.classList.add("hide");

        setTimeout(function () {

            notification.remove();

        }, 300);

    }, 3000);

}


// ======================================================
// ป้องกัน HTML แปลกปลอมจากข้อมูลที่ผู้ใช้กรอก
// ======================================================

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
