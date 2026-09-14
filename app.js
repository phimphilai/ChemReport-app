// ========================================
// ChemReport - Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("ChemReport JavaScript loaded");

    // ----------------------------------------
    // Demo chemical data
    // ----------------------------------------

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


    // ----------------------------------------
    // Notification
    // ----------------------------------------

    window.showNotification = function (message) {

        const oldNotification =
            document.querySelector(".system-notification");

        if (oldNotification) {
            oldNotification.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            "system-notification";

        notification.innerHTML = `
            <span>✓</span>
            <div>${message}</div>
        `;

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
    };


    // ----------------------------------------
    // ADD CHEMICAL
    // ----------------------------------------

    const addChemicalButtons =
        document.querySelectorAll(".add-chemical");

    addChemicalButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            openChemicalModal();

        });

    });


    // ----------------------------------------
    // Chemical Modal
    // ----------------------------------------

    function openChemicalModal() {

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

                    <div>
                        <h2>➕ เพิ่มสารเคมี</h2>
                        <p>กรอกข้อมูลสารเคมีเพื่อเพิ่มเข้าสู่ระบบ</p>
                    </div>

                    <button
                        type="button"
                        class="chemical-modal-close"
                        id="closeChemicalModal"
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
                            placeholder="เช่น Acetone"
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
                            placeholder="ชื่อภาษาไทย"
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            CAS Number *
                        </label>

                        <input
                            type="text"
                            id="chemicalCAS"
                            placeholder="เช่น 67-64-1"
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

                            <option value="missing">
                                ยังไม่มี SDS
                            </option>

                        </select>

                    </div>


                    <div class="chemical-form-actions">

                        <button
                            type="button"
                            class="cancel-btn"
                            id="cancelChemical"
                        >
                            ยกเลิก
                        </button>

                        <button
                            type="submit"
                            class="save-btn"
                        >
                            💾 บันทึกสารเคมี
                        </button>

                    </div>

                </form>

            </div>

        `;


        document.body.appendChild(modal);


        // Close button

        document
            .getElementById("closeChemicalModal")
            .addEventListener("click", closeChemicalModal);


        // Cancel button

        document
            .getElementById("cancelChemical")
            .addEventListener("click", closeChemicalModal);


        // Form submit

        document
            .getElementById("chemicalForm")
            .addEventListener("submit", function (event) {

                event.preventDefault();

                saveChemical();

            });


        // Click outside modal

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeChemicalModal();
            }

        });

    }


    // ----------------------------------------
    // Close Modal
    // ----------------------------------------

    function closeChemicalModal() {

        const modal =
            document.querySelector(".chemical-modal");

        if (modal) {
            modal.remove();
        }

    }


    // ----------------------------------------
    // Save Chemical
    // ----------------------------------------

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


        const riskText = {

            normal: "ความเสี่ยงต่ำ",

            warning: "ความเสี่ยงปานกลาง",

            danger: "ความเสี่ยงสูง"

        };


        const sdsText = {

            success: "✓ มี SDS",

            pending: "⚠ รอตรวจสอบ",

            missing: "✕ ยังไม่มี SDS"

        };


        const newChemical = {

            name: name,

            thaiName: thaiName || "-",

            cas: cas,

            risk: riskText[risk],

            riskClass: risk,

            sds: sdsText[sds],

            sdsClass: sds

        };


        chemicals.push(newChemical);


        addChemicalToTable(newChemical);


        closeChemicalModal();


        showNotification(
            "เพิ่มสารเคมี " + name + " เรียบร้อยแล้ว"
        );

    }


    // ----------------------------------------
    // Add chemical to table
    // ----------------------------------------

    function addChemicalToTable(chemical) {

        const table =
            document.querySelector("#chemicalTable tbody");


        if (!table) {

            console.error(
                "ไม่พบ #chemicalTable"
            );

            return;

        }


        const row =
            document.createElement("tr");


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


    // ----------------------------------------
    // Search Chemical
    // ----------------------------------------

    const searchInput =
        document.getElementById("chemicalSearch");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const keyword =
                    searchInput.value
                    .toLowerCase()
                    .trim();


                const rows =
                    document.querySelectorAll(
                        "#chemicalTable tbody tr"
                    );


                rows.forEach(function (row) {

                    const text =
                        row.innerText.toLowerCase();


                    if (text.includes(keyword)) {

                        row.style.display = "";

                    } else {

                        row.style.display = "none";

                    }

                });

            }
        );

    }


    // ----------------------------------------
    // Import SDS
    // ----------------------------------------

    document
        .querySelectorAll(".import-sds")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    showNotification(
                        "ฟังก์ชันนำเข้า SDS พร้อมสำหรับการพัฒนาขั้นถัดไป"
                    );

                }
            );

        });


    // ----------------------------------------
    // AI SDS Analysis
    // ----------------------------------------

    document
        .querySelectorAll(".analyze-sds")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    showNotification(
                        "ระบบ AI วิเคราะห์ SDS พร้อมสำหรับการเชื่อมต่อ AI"
                    );

                }
            );

        });


    // ----------------------------------------
    // Report
    // ----------------------------------------

    document
        .querySelectorAll(".view-report")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    showNotification(
                        "กำลังเตรียมหน้ารายงาน ChemReport"
                    );

                }
            );

        });


    // ----------------------------------------
    // Escape HTML
    // ----------------------------------------

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
