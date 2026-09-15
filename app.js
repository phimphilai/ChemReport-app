let chemicals = [
    {
        id: 1,
        name: "Ethanol",
        thai: "เอทานอล",
        cas: "64-17-5",
        risk: "ต่ำ",
        sds: true
    },
    {
        id: 2,
        name: "Methanol",
        thai: "เมทานอล",
        cas: "67-56-1",
        risk: "สูง",
        sds: true
    },
    {
        id: 3,
        name: "Acetone",
        thai: "อะซีโตน",
        cas: "67-64-1",
        risk: "ปานกลาง",
        sds: true
    }
];

let sdsDocuments = [
    {
        id: 1,
        chemical: "Ethanol",
        cas: "64-17-5",
        file: "Ethanol_SDS.pdf",
        status: "ตรวจสอบแล้ว",
        date: "13/09/2569"
    },
    {
        id: 2,
        chemical: "Methanol",
        cas: "67-56-1",
        file: "Methanol_SDS.pdf",
        status: "ตรวจสอบแล้ว",
        date: "13/09/2569"
    },
    {
        id: 3,
        chemical: "Acetone",
        cas: "67-64-1",
        file: "Acetone_SDS.pdf",
        status: "รอตรวจสอบ",
        date: "13/09/2569"
    }
];


/* =========================
   เริ่มต้นระบบ
========================= */

document.addEventListener("DOMContentLoaded", function () {
    showChemicalPage();
});


/* =========================
   เมนู
========================= */

function setPageTitle(title) {
    const titleBox = document.getElementById("pageTitle");

    if (titleBox) {
        titleBox.innerHTML = title;
    }
}


function setActiveMenu(id) {

    document.querySelectorAll(".menu button").forEach(function (button) {
        button.classList.remove("active");
    });

    const button = document.getElementById(id);

    if (button) {
        button.classList.add("active");
    }
}


/* =========================
   DASHBOARD
========================= */

function showDashboard() {

    setPageTitle("🏠 Dashboard");
    setActiveMenu("menuDashboard");

    const main = document.getElementById("mainContent");

    if (!main) return;

    main.innerHTML = `
        <div class="notice">
            💡 <strong>Dashboard</strong>
            ภาพรวมระบบ ChemReport
        </div>

        <div class="stats">

            <div class="stat">
                <div class="stat-title">สารเคมีทั้งหมด</div>
                <div class="stat-number">${chemicals.length}</div>
            </div>

            <div class="stat">
                <div class="stat-title">มี SDS</div>
                <div class="stat-number">
                    ${chemicals.filter(c => c.sds).length}
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">สารความเสี่ยงสูง</div>
                <div class="stat-number">
                    ${chemicals.filter(c => c.risk === "สูง").length}
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">รอตรวจสอบ SDS</div>
                <div class="stat-number">
                    ${sdsDocuments.filter(s => s.status === "รอตรวจสอบ").length}
                </div>
            </div>

        </div>

        <section class="section">

            <h3 class="section-title">
                📊 ภาพรวม ChemReport
            </h3>

            <div class="actions">

                <button class="action" onclick="showChemicalPage()">
                    <span class="action-icon">🧪</span>
                    ข้อมูลสารเคมี
                </button>

                <button class="action" onclick="openSDSManagement()">
                    <span class="action-icon">📄</span>
                    ระบบจัดการ SDS
                </button>

                <button class="action" onclick="openSDSAnalysis()">
                    <span class="action-icon">🤖</span>
                    วิเคราะห์ SDS
                </button>

                <button class="action" onclick="openChemicalSafety()">
                    <span class="action-icon">☣️</span>
                    Chemical Safety
                </button>

            </div>

        </section>
    `;
}


/* =========================
   ข้อมูลสารเคมี
========================= */

function showChemicalPage() {

    setPageTitle("🧪 ข้อมูลสารเคมี");
    setActiveMenu("menuChemical");

    const main = document.getElementById("mainContent");

    if (!main) return;

    main.innerHTML = `

        <div class="notice">
            💡 <strong>โหมดทดลอง:</strong>
            ข้อมูลสารเคมีเป็นข้อมูลตัวอย่างสำหรับการทดสอบ ChemReport
        </div>

        <div class="stats">

            <div class="stat">
                <div class="stat-title">สารเคมีทั้งหมด</div>
                <div class="stat-number">${chemicals.length}</div>
            </div>

            <div class="stat">
                <div class="stat-title">มี SDS</div>
                <div class="stat-number">
                    ${chemicals.filter(c => c.sds).length}
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">สารความเสี่ยงสูง</div>
                <div class="stat-number">
                    ${chemicals.filter(c => c.risk === "สูง").length}
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">รอตรวจสอบ SDS</div>
                <div class="stat-number">
                    ${sdsDocuments.filter(s => s.status === "รอตรวจสอบ").length}
                </div>
            </div>

        </div>

        <section class="section">

            <div class="table-tools">

                <div>
                    <h3 class="section-title">
                        🧪 รายการสารเคมี
                    </h3>

                    <div style="font-size:13px;color:#64748b">
                        จัดการข้อมูลสารเคมีในระบบ ChemReport
                    </div>
                </div>

                <button
                    class="action"
                    onclick="openChemicalModal()"
                    style="padding:12px 18px"
                >
                    ➕ เพิ่มสารเคมี
                </button>

            </div>

            <div class="table-tools">

                <input
                    class="search"
                    id="chemicalSearch"
                    type="search"
                    placeholder="🔎 ค้นหาชื่อสาร หรือ CAS Number..."
                    oninput="searchChemical(this.value)"
                >

            </div>

            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>
                            <th>ชื่อสารเคมี</th>
                            <th>ชื่อภาษาไทย</th>
                            <th>CAS Number</th>
                            <th>ระดับความเสี่ยง</th>
                            <th>SDS</th>
                            <th>จัดการ</th>
                        </tr>

                    </thead>

                    <tbody id="chemicalTableBody"></tbody>

                </table>

            </div>

        </section>
    `;

    renderChemicalTable();
}


function renderChemicalTable(keyword = "") {

    const tbody = document.getElementById("chemicalTableBody");

    if (!tbody) return;

    const search = keyword.toLowerCase();

    const result = chemicals.filter(function (chemical) {

        return (
            chemical.name.toLowerCase().includes(search) ||
            chemical.thai.toLowerCase().includes(search) ||
            chemical.cas.includes(search)
        );

    });

    if (result.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    ไม่พบข้อมูลสารเคมี
                </td>
            </tr>
        `;

        return;
    }


    tbody.innerHTML = result.map(function (chemical) {

        let riskClass = "risk-low";

        if (chemical.risk === "ปานกลาง") {
            riskClass = "risk-medium";
        }

        if (chemical.risk === "สูง") {
            riskClass = "risk-high";
        }

        return `
            <tr>

                <td>
                    <strong>${chemical.name}</strong>
                </td>

                <td>${chemical.thai}</td>

                <td>${chemical.cas}</td>

                <td>
                    <span class="risk ${riskClass}">
                        ${chemical.risk}
                    </span>
                </td>

                <td>
                    ${
                        chemical.sds
                        ? '<span class="sds">✓ มี SDS</span>'
                        : '<span class="sds-pending">รอ SDS</span>'
                    }
                </td>

                <td>

                    <button
                        class="action-btn view-btn"
                        onclick="viewChemical(${chemical.id})"
                    >
                        ดู
                    </button>

                    <button
                        class="action-btn edit-btn"
                        onclick="editChemical(${chemical.id})"
                    >
                        แก้ไข
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteChemical(${chemical.id})"
                    >
                        ลบ
                    </button>

                </td>

            </tr>
        `;

    }).join("");
}


function searchChemical(keyword) {
    renderChemicalTable(keyword);
}


/* =========================
   เพิ่มสารเคมี
========================= */

function openChemicalModal() {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `

        <div class="modal">

            <h2>➕ เพิ่มสารเคมี</h2>

            <div class="form-grid">

                <div class="form-group">
                    <label>ชื่อสารเคมี</label>
                    <input id="newChemicalName">
                </div>

                <div class="form-group">
                    <label>ชื่อภาษาไทย</label>
                    <input id="newChemicalThai">
                </div>

                <div class="form-group">
                    <label>CAS Number</label>
                    <input id="newChemicalCAS">
                </div>

                <div class="form-group">

                    <label>ระดับความเสี่ยง</label>

                    <select id="newChemicalRisk">
                        <option value="ต่ำ">ต่ำ</option>
                        <option value="ปานกลาง">ปานกลาง</option>
                        <option value="สูง">สูง</option>
                    </select>

                </div>

            </div>

            <div class="modal-actions">

                <button
                    class="btn btn-secondary"
                    onclick="this.closest('.modal-overlay').remove()"
                >
                    ยกเลิก
                </button>

                <button
                    class="btn btn-primary"
                    onclick="saveChemical()"
                >
                    บันทึก
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);
}


function saveChemical() {

    const name = document.getElementById("newChemicalName").value.trim();
    const thai = document.getElementById("newChemicalThai").value.trim();
    const cas = document.getElementById("newChemicalCAS").value.trim();
    const risk = document.getElementById("newChemicalRisk").value;

    if (!name || !cas) {

        alert("กรุณากรอกชื่อสารเคมีและ CAS Number");

        return;
    }

    chemicals.push({

        id: Date.now(),
        name: name,
        thai: thai || "-",
        cas: cas,
        risk: risk,
        sds: false

    });

    document.querySelector(".modal-overlay").remove();

    showChemicalPage();

    showNotification("บันทึกข้อมูลสารเคมีแล้ว");
}


/* =========================
   ดู / แก้ไข / ลบ
========================= */

function viewChemical(id) {

    const c = chemicals.find(x => x.id === id);

    if (!c) return;

    alert(
        "ชื่อสารเคมี: " + c.name +
        "\nชื่อภาษาไทย: " + c.thai +
        "\nCAS Number: " + c.cas +
        "\nระดับความเสี่ยง: " + c.risk +
        "\nSDS: " + (c.sds ? "มี" : "รอ SDS")
    );
}


function editChemical(id) {

    const c = chemicals.find(x => x.id === id);

    if (!c) return;

    const newName = prompt("ชื่อสารเคมี", c.name);

    if (newName === null) return;

    c.name = newName;

    showChemicalPage();

    showNotification("แก้ไขข้อมูลแล้ว");
}


function deleteChemical(id) {

    const c = chemicals.find(x => x.id === id);

    if (!c) return;

    if (!confirm("ต้องการลบ " + c.name + " หรือไม่?")) {
        return;
    }

    chemicals = chemicals.filter(x => x.id !== id);

    showChemicalPage();

    showNotification("ลบข้อมูลแล้ว");
}


/* =========================================================
   SDS
========================================================= */

function openSDSManagement() {

    setPageTitle("📄 ระบบจัดการ SDS");
    setActiveMenu("menuSDS");

    const main = document.getElementById("mainContent");

    if (!main) return;

    main.innerHTML = `

        <div class="notice">

            📄 <strong>ระบบจัดการ SDS</strong>

            <br>

            จัดเก็บ ติดตาม และตรวจสอบเอกสารข้อมูลความปลอดภัย
            ของสารเคมี

        </div>


        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                    SDS ทั้งหมด
                </div>

                <div class="stat-number">
                    ${sdsDocuments.length}
                </div>

            </div>


            <div class="stat">

                <div class="stat-title">
                    ตรวจสอบแล้ว
                </div>

                <div class="stat-number">

                    ${
                        sdsDocuments.filter(
                            s => s.status === "ตรวจสอบแล้ว"
                        ).length
                    }

                </div>

            </div>


            <div class="stat">

                <div class="stat-title">
                    รอตรวจสอบ
                </div>

                <div class="stat-number">

                    ${
                        sdsDocuments.filter(
                            s => s.status === "รอตรวจสอบ"
                        ).length
                    }

                </div>

            </div>


            <div class="stat">

                <div class="stat-title">
                    สารเคมี
                </div>

                <div class="stat-number">
                    ${chemicals.length}
                </div>

            </div>

        </div>


        <section class="section">

            <h3 class="section-title">
                📥 นำเข้าเอกสาร SDS
            </h3>

            <div class="upload-box">

                <div style="font-size:50px">
                    📄
                </div>

                <h3>
                    อัปโหลดเอกสาร SDS
                </h3>

                <p style="color:#64748b">
                    รองรับไฟล์ PDF
                </p>

                <input
                    type="file"
                    id="sdsUpload"
                    accept=".pdf"
                    onchange="uploadSDS(this)"
                >

            </div>

        </section>


        <section class="section">

            <h3 class="section-title">
                📋 รายการเอกสาร SDS
            </h3>

            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>สารเคมี</th>
                            <th>CAS Number</th>
                            <th>ชื่อไฟล์</th>
                            <th>วันที่นำเข้า</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${
                            sdsDocuments.length
                            ?
                            sdsDocuments.map(function(s) {

                                return `

                                <tr>

                                    <td>
                                        <strong>
                                            ${s.chemical}
                                        </strong>
                                    </td>

                                    <td>
                                        ${s.cas}
                                    </td>

                                    <td>
                                        📄 ${s.file}
                                    </td>

                                    <td>
                                        ${s.date}
                                    </td>

                                    <td>

                                        <span
                                            class="status ${
                                                s.status === "ตรวจสอบแล้ว"
                                                ? "status-ok"
                                                : "status-pending"
                                            }"
                                        >
                                            ${s.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            class="action-btn view-btn"
                                            onclick="viewSDS(${s.id})"
                                        >
                                            ดู
                                        </button>

                                        <button
                                            class="action-btn delete-btn"
                                            onclick="deleteSDS(${s.id})"
                                        >
                                            ลบ
                                        </button>

                                    </td>

                                </tr>

                                `;

                            }).join("")
                            :
                            `
                            <tr>
                                <td colspan="6" class="empty">
                                    ยังไม่มีเอกสาร SDS
                                </td>
                            </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>

        </section>


        <section class="section">

            <h3 class="section-title">
                🤖 วิเคราะห์ SDS ด้วย AI
            </h3>

            <div class="info-box">

                ChemReport สามารถต่อยอดให้ AI
                ช่วยดึงข้อมูลสำคัญจากเอกสาร SDS
                และให้ผู้ใช้งานตรวจสอบข้อมูลก่อนบันทึกเข้าสู่ระบบ

            </div>

            <br>

            <button
                class="btn btn-primary"
                onclick="openSDSAnalysis()"
            >
                🤖 เปิดระบบวิเคราะห์ SDS
            </button>

        </section>

    `;
}


/* =========================
   Upload SDS
========================= */

function uploadSDS(input) {

    if (!input.files || !input.files.length) {
        return;
    }

    const file = input.files[0];

    if (file.type !== "application/pdf") {

        alert("กรุณาเลือกไฟล์ PDF");

        return;
    }

    sdsDocuments.push({

        id: Date.now(),

        chemical: "รอตรวจสอบ",

        cas: "-",

        file: file.name,

        status: "รอตรวจสอบ",

        date: new Date().toLocaleDateString("th-TH")

    });

    showNotification("นำเข้าเอกสาร SDS สำเร็จ");

    openSDSManagement();
}


function viewSDS(id) {

    const s = sdsDocuments.find(x => x.id === id);

    if (!s) return;

    alert(
        "เอกสาร SDS\n\n" +
        "สารเคมี: " + s.chemical +
        "\nCAS Number: " + s.cas +
        "\nไฟล์: " + s.file +
        "\nวันที่: " + s.date +
        "\nสถานะ: " + s.status
    );
}


function deleteSDS(id) {

    const s = sdsDocuments.find(x => x.id === id);

    if (!s) return;

    if (!confirm("ต้องการลบ " + s.file + " หรือไม่?")) {
        return;
    }

    sdsDocuments = sdsDocuments.filter(x => x.id !== id);

    openSDSManagement();

    showNotification("ลบเอกสาร SDS แล้ว");
}


/* =========================================================
   AI
========================================================= */

function openSDSAnalysis() {

    setPageTitle("🤖 วิเคราะห์ SDS ด้วย AI");
    setActiveMenu("menuAI");

    const main = document.getElementById("mainContent");

    if (!main) return;

    main.innerHTML = `

        <div class="notice">

            🤖 <strong>ระบบวิเคราะห์ SDS ด้วย AI</strong>

            <br>

            เตรียมเอกสาร SDS เพื่อเข้าสู่ขั้นตอนการวิเคราะห์

        </div>


        <section class="section">

            <h3 class="section-title">
                🤖 AI วิเคราะห์ SDS
            </h3>

            <div class="info-box">

                ระบบออกแบบให้ AI ช่วยดึงข้อมูลสำคัญจาก SDS
                เช่น ชื่อสารเคมี CAS Number ผู้ผลิต
                ข้อมูลอันตราย และข้อมูลความปลอดภัย

                <br><br>

                <strong>
                    หมายเหตุ:
                </strong>

                เวอร์ชันนี้เป็นต้นแบบ
                ยังไม่ได้เชื่อมต่อ AI API จริง

            </div>

            <br>

            <input
                type="file"
                id="aiFile"
                accept=".pdf"
                onchange="analyzeSDS(this)"
            >

            <div
                id="analysisResult"
                style="margin-top:20px"
            ></div>

        </section>


        <section class="section">

            <h3 class="section-title">
                📌 ขั้นตอนการทำงาน
            </h3>

            <div class="actions">

                <div class="action">
                    <span class="action-icon">1️⃣</span>
                    นำเข้า SDS
                </div>

                <div class="action">
                    <span class="action-icon">2️⃣</span>
                    AI วิเคราะห์
                </div>

                <div class="action">
                    <span class="action-icon">3️⃣</span>
                    ตรวจสอบข้อมูล
                </div>

                <div class="action">
                    <span class="action-icon">4️⃣</span>
                    บันทึกข้อมูล
                </div>

            </div>

        </section>

    `;
}


function analyzeSDS(input) {

    if (!input.files || !input.files.length) {
        return;
    }

    const file = input.files[0];

    const result = document.getElementById("analysisResult");

    result.innerHTML = `

        <div class="info-box">

            ⏳ กำลังเตรียมเอกสาร...

        </div>

    `;

    setTimeout(function () {

        result.innerHTML = `

            <div class="info-box">

                <strong>
                    📄 ไฟล์ที่เลือก
                </strong>

                <br><br>

                ${file.name}

                <br><br>

                ⚠️ เวอร์ชันปัจจุบันยังเป็น Demo
                ยังไม่ได้เชื่อมต่อ AI API จริง

            </div>

        `;

    }, 1000);
}


/* =========================================================
   CHEMICAL SAFETY
========================================================= */

function openChemicalSafety() {

    setPageTitle("☣️ Chemical Safety");
    setActiveMenu("menuSafety");

    document.getElementById("mainContent").innerHTML = `

        <div class="notice">
            ☣️ <strong>Chemical Safety</strong>
            ระบบสนับสนุนการตรวจสอบข้อมูลด้านความปลอดภัย
        </div>

        <section class="section">

            <h3 class="section-title">
                ☣️ ข้อมูลความปลอดภัย
            </h3>

            <div class="actions">

                <button class="action">
                    <span class="action-icon">⚠️</span>
                    ข้อมูลอันตราย
                </button>

                <button class="action">
                    <span class="action-icon">🧤</span>
                    PPE
                </button>

                <button class="action">
                    <span class="action-icon">🚑</span>
                    การปฐมพยาบาล
                </button>

                <button class="action">
                    <span class="action-icon">🔥</span>
                    เหตุฉุกเฉิน
                </button>

            </div>

        </section>

    `;
}


/* =========================================================
   STORAGE
========================================================= */

function openStorageManagement() {

    setPageTitle("🗄️ การจัดเก็บสารเคมี");
    setActiveMenu("menuStorage");

    document.getElementById("mainContent").innerHTML = `

        <div class="notice">

            🗄️ <strong>การจัดเก็บสารเคมี</strong>

            <br>

            ระบบสนับสนุนการติดตามพื้นที่จัดเก็บสารเคมี

        </div>

        <section class="section">

            <h3 class="section-title">
                🗄️ พื้นที่จัดเก็บ
            </h3>

            <div class="actions">

                <button class="action">
                    <span class="action-icon">🧪</span>
                    สารเคมีทั่วไป
                </button>

                <button class="action">
                    <span class="action-icon">🔥</span>
                    สารไวไฟ
                </button>

                <button class="action">
                    <span class="action-icon">☣️</span>
                    สารอันตราย
                </button>

                <button class="action">
                    <span class="action-icon">❄️</span>
                    พื้นที่ควบคุม
                </button>

            </div>

        </section>

    `;
}


/* =========================================================
   REPORT
========================================================= */

function openReports() {

    setPageTitle("📊 รายงาน");
    setActiveMenu("menuReports");

    document.getElementById("mainContent").innerHTML = `

        <div class="notice">

            📊 <strong>ระบบรายงาน</strong>

        </div>

        <div class="stats">

            <div class="stat">
                <div class="stat-title">
                    สารเคมี
                </div>

                <div class="stat-number">
                    ${chemicals.length}
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">
                    SDS
                </div>

                <div class="stat-number">
                    ${sdsDocuments.length}
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">
                    ตรวจสอบแล้ว
                </div>

                <div class="stat-number">
                    ${
                        sdsDocuments.filter(
                            s => s.status === "ตรวจสอบแล้ว"
                        ).length
                    }
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">
                    รอตรวจสอบ
                </div>

                <div class="stat-number">
                    ${
                        sdsDocuments.filter(
                            s => s.status === "รอตรวจสอบ"
                        ).length
                    }
                </div>
            </div>

        </div>

    `;
}


/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {

    setPageTitle("⚙️ ตั้งค่า");
    setActiveMenu("menuSettings");

    document.getElementById("mainContent").innerHTML = `

        <div class="notice">

            ⚙️ <strong>ตั้งค่าระบบ ChemReport</strong>

        </div>

        <section class="section">

            <h3 class="section-title">
                ⚙️ ข้อมูลระบบ
            </h3>

            <p style="line-height:1.8;color:#64748b">

                ระบบ ChemReport<br>
                คณะสาธารณสุขศาสตร์ มหาวิทยาลัยมหาสารคาม

            </p>

        </section>

    `;
}


/* =========================================================
   NOTIFICATION
========================================================= */

function showNotification(message) {

    const old = document.getElementById("notificationBox");

    if (old) {
        old.remove();
    }

    const box = document.createElement("div");

    box.id = "notificationBox";

    box.style.position = "fixed";
    box.style.right = "20px";
    box.style.bottom = "20px";
    box.style.background = "#0f4c81";
    box.style.color = "white";
    box.style.padding = "14px 20px";
    box.style.borderRadius = "10px";
    box.style.zIndex = "99999";
    box.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";

    box.innerHTML = message;

    document.body.appendChild(box);

    setTimeout(function () {

        if (box) {
            box.remove();
        }

    }, 2500);
}


/* =========================================================
   ทำให้ฟังก์ชันเรียกจาก HTML ได้
========================================================= */

window.showDashboard = showDashboard;
window.showChemicalPage = showChemicalPage;

window.openSDSManagement = openSDSManagement;
window.openSDSAnalysis = openSDSAnalysis;

window.openChemicalSafety = openChemicalSafety;
window.openStorageManagement = openStorageManagement;

window.openReports = openReports;
window.openSettings = openSettings;

window.openChemicalModal = openChemicalModal;
window.saveChemical = saveChemical;

window.searchChemical = searchChemical;

window.viewChemical = viewChemical;
window.editChemical = editChemical;
window.deleteChemical = deleteChemical;

window.uploadSDS = uploadSDS;
window.viewSDS = viewSDS;
window.deleteSDS = deleteSDS;

window.analyzeSDS = analyzeSDS;
window.showNotification = showNotification;
