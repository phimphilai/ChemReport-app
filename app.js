// ===============================
// ChemReport - Chemical Management
// ===============================

let chemicals = [
  {
    id: 1,
    name: "Ethanol",
    thaiName: "เอทานอล",
    cas: "64-17-5",
    risk: "ต่ำ",
    sds: "มี"
  },
  {
    id: 2,
    name: "Methanol",
    thaiName: "เมทานอล",
    cas: "67-56-1",
    risk: "สูง",
    sds: "มี"
  },
  {
    id: 3,
    name: "Hydrochloric Acid",
    thaiName: "กรดไฮโดรคลอริก",
    cas: "7647-01-0",
    risk: "สูง",
    sds: "มี"
  },
  {
    id: 4,
    name: "Sodium Hydroxide",
    thaiName: "โซเดียมไฮดรอกไซด์",
    cas: "1310-73-2",
    risk: "ปานกลาง",
    sds: "รอตรวจสอบ"
  }
];


// ===============================
// เมื่อเปิดหน้า
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  renderChemicals();
  setupSearch();

});


// ===============================
// แสดงข้อมูลสารเคมี
// ===============================

function renderChemicals(keyword = "") {

  const table = document.getElementById("chemicalTableBody");

  if (!table) return;

  const search = keyword.toLowerCase().trim();

  const filtered = chemicals.filter(function (chemical) {

    return (
      chemical.name.toLowerCase().includes(search) ||
      chemical.thaiName.toLowerCase().includes(search) ||
      chemical.cas.toLowerCase().includes(search)
    );

  });


  if (filtered.length === 0) {

    table.innerHTML = `
      <tr>
        <td colspan="6" class="empty">
          🔎 ไม่พบข้อมูลสารเคมี
        </td>
      </tr>
    `;

    return;
  }


  table.innerHTML = filtered.map(function (chemical) {

    let riskClass = "risk-low";

    if (chemical.risk === "สูง") {
      riskClass = "risk-high";
    }

    if (chemical.risk === "ปานกลาง") {
      riskClass = "risk-medium";
    }


    let sdsClass =
      chemical.sds === "มี"
        ? "sds"
        : "sds-pending";


    return `
      <tr>

        <td>
          <strong>${escapeHTML(chemical.name)}</strong>
        </td>

        <td>
          ${escapeHTML(chemical.thaiName)}
        </td>

        <td>
          ${escapeHTML(chemical.cas)}
        </td>

        <td>
          <span class="risk ${riskClass}">
            ${escapeHTML(chemical.risk)}
          </span>
        </td>

        <td>
          <span class="${sdsClass}">
            ${escapeHTML(chemical.sds)}
          </span>
        </td>

        <td>

          <button
            class="action-btn view-btn"
            onclick="viewChemical(${chemical.id})">
            👁️ ดู
          </button>

          <button
            class="action-btn edit-btn"
            onclick="editChemical(${chemical.id})">
            ✏️ แก้ไข
          </button>

          <button
            class="action-btn delete-btn"
            onclick="deleteChemical(${chemical.id})">
            🗑️ ลบ
          </button>

        </td>

      </tr>
    `;

  }).join("");

}


// ===============================
// ระบบค้นหา
// ===============================

function setupSearch() {

  const searchBox = document.getElementById("chemicalSearch");

  if (!searchBox) return;

  searchBox.addEventListener("input", function () {

    renderChemicals(this.value);

  });

}


// ===============================
// เปิดหน้าต่างเพิ่มสารเคมี
// ===============================

function openChemicalModal() {

  const oldModal = document.getElementById("chemicalModal");

  if (oldModal) {
    oldModal.remove();
  }


  const modal = document.createElement("div");

  modal.id = "chemicalModal";

  modal.innerHTML = `

    <div style="
      position:fixed;
      inset:0;
      background:rgba(15,23,42,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
      padding:20px;
    ">

      <div style="
        background:white;
        width:100%;
        max-width:550px;
        border-radius:18px;
        padding:25px;
        box-shadow:0 20px 60px rgba(0,0,0,.2);
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
        ">

          <h2 style="margin:0;color:#0f4c81;">
            🧪 เพิ่มสารเคมี
          </h2>

          <button
            onclick="closeChemicalModal()"
            style="
              border:none;
              background:#f1f5f9;
              width:35px;
              height:35px;
              border-radius:50%;
              cursor:pointer;
              font-size:18px;
            ">
            ✕
          </button>

        </div>


        <label>ชื่อสารเคมี</label>

        <input
          id="chemicalName"
          type="text"
          placeholder="เช่น Ethanol"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #cbd5e1;
            border-radius:8px;
          ">


        <label>ชื่อภาษาไทย</label>

        <input
          id="chemicalThaiName"
          type="text"
          placeholder="เช่น เอทานอล"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #cbd5e1;
            border-radius:8px;
          ">


        <label>CAS Number</label>

        <input
          id="chemicalCAS"
          type="text"
          placeholder="เช่น 64-17-5"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #cbd5e1;
            border-radius:8px;
          ">


        <label>ระดับความเสี่ยง</label>

        <select
          id="chemicalRisk"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #cbd5e1;
            border-radius:8px;
            background:white;
          ">

          <option value="ต่ำ">ต่ำ</option>
          <option value="ปานกลาง">ปานกลาง</option>
          <option value="สูง">สูง</option>

        </select>


        <label>สถานะ SDS</label>

        <select
          id="chemicalSDS"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 20px;
            border:1px solid #cbd5e1;
            border-radius:8px;
            background:white;
          ">

          <option value="มี">มี</option>
          <option value="รอตรวจสอบ">รอตรวจสอบ</option>

        </select>


        <div style="
          display:flex;
          gap:10px;
          justify-content:flex-end;
        ">

          <button
            onclick="closeChemicalModal()"
            style="
              padding:11px 20px;
              border:none;
              border-radius:8px;
              background:#e2e8f0;
              cursor:pointer;
            ">
            ยกเลิก
          </button>


          <button
            onclick="saveChemical()"
            style="
              padding:11px 20px;
              border:none;
              border-radius:8px;
              background:#0f4c81;
              color:white;
              cursor:pointer;
              font-weight:600;
            ">
            💾 บันทึก
          </button>

        </div>

      </div>

    </div>
  `;


  document.body.appendChild(modal);

}


// ===============================
// บันทึกสารเคมี
// ===============================

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


  if (!name || !thaiName || !cas) {

    alert("กรุณากรอกข้อมูลให้ครบถ้วน");

    return;
  }


  const duplicate = chemicals.some(function (chemical) {

    return chemical.cas.toLowerCase() === cas.toLowerCase();

  });


  if (duplicate) {

    alert("⚠️ CAS Number นี้มีอยู่ในระบบแล้ว");

    return;
  }


  chemicals.push({

    id: Date.now(),

    name: name,

    thaiName: thaiName,

    cas: cas,

    risk: risk,

    sds: sds

  });


  renderChemicals();

  updateStatistics();

  closeChemicalModal();


  alert("✅ เพิ่มสารเคมีเรียบร้อยแล้ว");

}


// ===============================
// ปิดหน้าต่าง
// ===============================

function closeChemicalModal() {

  const modal = document.getElementById("chemicalModal");

  if (modal) {
    modal.remove();
  }

}


// ===============================
// ดูข้อมูล
// ===============================

function viewChemical(id) {

  const chemical = chemicals.find(function (item) {

    return item.id === id;

  });


  if (!chemical) return;


  alert(
    "🧪 รายละเอียดสารเคมี\n\n" +

    "ชื่อสาร: " + chemical.name + "\n" +

    "ชื่อภาษาไทย: " + chemical.thaiName + "\n" +

    "CAS Number: " + chemical.cas + "\n" +

    "ระดับความเสี่ยง: " + chemical.risk + "\n" +

    "SDS: " + chemical.sds
  );

}


// ===============================
// แก้ไขข้อมูล
// ===============================

function editChemical(id) {

  const chemical = chemicals.find(function (item) {

    return item.id === id;

  });


  if (!chemical) return;


  const newName =
    prompt("ชื่อสารเคมี", chemical.name);

  if (newName === null) return;


  const newThaiName =
    prompt("ชื่อภาษาไทย", chemical.thaiName);

  if (newThaiName === null) return;


  const newCAS =
    prompt("CAS Number", chemical.cas);

  if (newCAS === null) return;


  chemical.name = newName.trim();

  chemical.thaiName = newThaiName.trim();

  chemical.cas = newCAS.trim();


  renderChemicals();

  updateStatistics();


  alert("✅ แก้ไขข้อมูลเรียบร้อยแล้ว");

}


// ===============================
// ลบข้อมูล
// ===============================

function deleteChemical(id) {

  const chemical = chemicals.find(function (item) {

    return item.id === id;

  });


  if (!chemical) return;


  const confirmDelete = confirm(
    "ต้องการลบสารเคมี " +
    chemical.name +
    " ใช่หรือไม่?"
  );


  if (!confirmDelete) return;


  chemicals = chemicals.filter(function (item) {

    return item.id !== id;

  });


  renderChemicals();

  updateStatistics();


  alert("🗑️ ลบข้อมูลเรียบร้อยแล้ว");

}


// ===============================
// อัปเดตตัวเลขสถิติ
// ===============================

function updateStatistics() {

  const total = chemicals.length;

  const sdsCount = chemicals.filter(function (chemical) {

    return chemical.sds === "มี";

  }).length;


  const highRisk = chemicals.filter(function (chemical) {

    return chemical.risk === "สูง";

  }).length;


  const pending = chemicals.filter(function (chemical) {

    return chemical.sds === "รอตรวจสอบ";

  }).length;


  const totalElement =
    document.getElementById("totalChemicals");

  const sdsElement =
    document.getElementById("totalSDS");

  const highRiskElement =
    document.getElementById("highRisk");

  const pendingElement =
    document.getElementById("pendingSDS");


  if (totalElement)
    totalElement.textContent = total;


  if (sdsElement)
    sdsElement.textContent = sdsCount;


  if (highRiskElement)
    highRiskElement.textContent = highRisk;


  if (pendingElement)
    pendingElement.textContent = pending;

}


// ===============================
// Dashboard
// ===============================

function showDashboard() {

  document.getElementById("pageTitle").textContent =
    "🏠 Dashboard";

  alert("🏠 Dashboard");

}


// ===============================
// หน้าข้อมูลสารเคมี
// ===============================

function showChemicalPage() {

  document.getElementById("pageTitle").textContent =
    "🧪 ข้อมูลสารเคมี";

  renderChemicals();

}


// ===============================
// Notification
// ===============================

function showNotification(message) {

  alert(message);

}


// ===============================
// ป้องกัน HTML Injection
// ===============================

function escapeHTML(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}
// ===============================
// ChemReport - SDS Management
// ===============================

let sdsDocuments = [
  {
    id: 1,
    fileName: "Ethanol_SDS.pdf",
    chemicalName: "Ethanol",
    cas: "64-17-5",
    status: "ตรวจสอบแล้ว",
    date: "15/09/2026"
  },
  {
    id: 2,
    fileName: "Methanol_SDS.pdf",
    chemicalName: "Methanol",
    cas: "67-56-1",
    status: "ตรวจสอบแล้ว",
    date: "15/09/2026"
  },
  {
    id: 3,
    fileName: "HCl_SDS.pdf",
    chemicalName: "Hydrochloric Acid",
    cas: "7647-01-0",
    status: "รอการตรวจสอบ",
    date: "15/09/2026"
  }
];


// ===============================
// เปิดหน้าจัดการ SDS
// ===============================

function showSDSPage() {

  const title = document.getElementById("pageTitle");

  if (title) {
    title.textContent = "📄 จัดการ SDS";
  }

  renderSDS();

}


// ===============================
// แสดงรายการ SDS
// ===============================

function renderSDS(keyword = "") {

  let container = document.getElementById("sdsContent");

  if (!container) {

    container = document.createElement("div");

    container.id = "sdsContent";

    container.style.padding = "20px";

    document.body.appendChild(container);

  }


  const search = keyword.toLowerCase().trim();


  const filtered = sdsDocuments.filter(function (sds) {

    return (
      sds.fileName.toLowerCase().includes(search) ||
      sds.chemicalName.toLowerCase().includes(search) ||
      sds.cas.toLowerCase().includes(search)
    );

  });


  container.innerHTML = `

    <div style="
      background:white;
      padding:25px;
      border-radius:16px;
      box-shadow:0 4px 15px rgba(0,0,0,.06);
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
        margin-bottom:20px;
      ">

        <div>
          <h2 style="
            margin:0;
            color:#0f4c81;
          ">
            📄 จัดการเอกสาร SDS
          </h2>

          <p style="
            color:#64748b;
            margin:6px 0 0;
          ">
            ค้นหา ตรวจสอบ และจัดการเอกสารข้อมูลความปลอดภัย
          </p>
        </div>


        <button
          onclick="openSDSUpload()"
          style="
            border:none;
            background:#0f4c81;
            color:white;
            padding:12px 18px;
            border-radius:9px;
            cursor:pointer;
            font-weight:600;
          ">
          📤 นำเข้า SDS
        </button>

      </div>


      <input
        id="sdsSearch"
        type="text"
        placeholder="🔍 ค้นหาชื่อสาร, CAS Number หรือชื่อไฟล์..."
        value="${escapeHTML(keyword)}"
        oninput="renderSDS(this.value)"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin-bottom:20px;
          border:1px solid #cbd5e1;
          border-radius:9px;
          font-size:14px;
        "
      >


      <div style="
        overflow-x:auto;
      ">

        <table style="
          width:100%;
          border-collapse:collapse;
        ">

          <thead>

            <tr style="
              background:#f1f5f9;
              text-align:left;
            ">

              <th style="padding:13px;">เอกสาร</th>
              <th style="padding:13px;">สารเคมี</th>
              <th style="padding:13px;">CAS Number</th>
              <th style="padding:13px;">สถานะ</th>
              <th style="padding:13px;">วันที่</th>
              <th style="padding:13px;">การจัดการ</th>

            </tr>

          </thead>


          <tbody>

            ${
              filtered.length === 0

                ? `
                  <tr>
                    <td colspan="6"
                      style="
                        padding:30px;
                        text-align:center;
                        color:#64748b;
                      ">
                      🔎 ไม่พบเอกสาร SDS
                    </td>
                  </tr>
                `

                :

                filtered.map(function (sds) {

                  const statusStyle =
                    sds.status === "ตรวจสอบแล้ว"
                      ? "background:#dcfce7;color:#166534;"
                      : "background:#fef3c7;color:#92400e;";


                  return `

                    <tr style="
                      border-bottom:1px solid #e2e8f0;
                    ">

                      <td style="padding:13px;">
                        📄 ${escapeHTML(sds.fileName)}
                      </td>

                      <td style="padding:13px;">
                        <strong>
                          ${escapeHTML(sds.chemicalName)}
                        </strong>
                      </td>

                      <td style="padding:13px;">
                        ${escapeHTML(sds.cas)}
                      </td>

                      <td style="padding:13px;">

                        <span style="
                          ${statusStyle}
                          padding:5px 10px;
                          border-radius:20px;
                          font-size:12px;
                        ">
                          ${escapeHTML(sds.status)}
                        </span>

                      </td>

                      <td style="padding:13px;">
                        ${escapeHTML(sds.date)}
                      </td>

                      <td style="padding:13px;">

                        <button
                          onclick="analyzeSDS(${sds.id})"
                          style="
                            border:none;
                            background:#e0f2fe;
                            color:#0369a1;
                            padding:7px 10px;
                            border-radius:7px;
                            cursor:pointer;
                          ">
                          🤖 วิเคราะห์
                        </button>

                        <button
                          onclick="viewSDS(${sds.id})"
                          style="
                            border:none;
                            background:#f1f5f9;
                            padding:7px 10px;
                            border-radius:7px;
                            cursor:pointer;
                          ">
                          👁️ ดู
                        </button>

                      </td>

                    </tr>

                  `;

                }).join("")
            }

          </tbody>

        </table>

      </div>

    </div>

  `;

}


// ===============================
// นำเข้า SDS
// ===============================

function openSDSUpload() {

  const oldModal = document.getElementById("sdsModal");

  if (oldModal) {
    oldModal.remove();
  }


  const modal = document.createElement("div");

  modal.id = "sdsModal";


  modal.innerHTML = `

    <div style="
      position:fixed;
      inset:0;
      background:rgba(15,23,42,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
      padding:20px;
    ">

      <div style="
        background:white;
        width:100%;
        max-width:520px;
        border-radius:18px;
        padding:25px;
      ">

        <h2 style="
          color:#0f4c81;
          margin-top:0;
        ">
          📤 นำเข้าเอกสาร SDS
        </h2>


        <p style="
          color:#64748b;
        ">
          เลือกไฟล์ SDS เพื่อเตรียมเข้าสู่ระบบ
        </p>


        <input
          id="sdsFile"
          type="file"
          accept=".pdf"
          style="
            width:100%;
            padding:15px;
            border:2px dashed #94a3b8;
            border-radius:10px;
            box-sizing:border-box;
          "
        >


        <div style="
          display:flex;
          justify-content:flex-end;
          gap:10px;
          margin-top:20px;
        ">

          <button
            onclick="closeSDSModal()"
            style="
              padding:10px 18px;
              border:none;
              border-radius:8px;
              background:#e2e8f0;
            ">
            ยกเลิก
          </button>


          <button
            onclick="importSDS()"
            style="
              padding:10px 18px;
              border:none;
              border-radius:8px;
              background:#0f4c81;
              color:white;
              font-weight:600;
            ">
            📥 นำเข้า
          </button>

        </div>

      </div>

    </div>

  `;


  document.body.appendChild(modal);

}


// ===============================
// นำเข้าไฟล์ SDS
// ===============================

function importSDS() {

  const fileInput =
    document.getElementById("sdsFile");

  if (!fileInput || !fileInput.files.length) {

    alert("กรุณาเลือกไฟล์ SDS ก่อน");

    return;
  }


  const file = fileInput.files[0];


  sdsDocuments.push({

    id: Date.now(),

    fileName: file.name,

    chemicalName: "รอวิเคราะห์",

    cas: "-",

    status: "รอการวิเคราะห์",

    date: new Date().toLocaleDateString("th-TH")

  });


  closeSDSModal();

  renderSDS();

  alert(
    "✅ นำเข้า " +
    file.name +
    " เรียบร้อยแล้ว\n\n" +
    "ขั้นตอนถัดไปสามารถนำไฟล์เข้าสู่ระบบ AI เพื่อวิเคราะห์ข้อมูล SDS"
  );

}


// ===============================
// ปิดหน้าต่าง SDS
// ===============================

function closeSDSModal() {

  const modal =
    document.getElementById("sdsModal");

  if (modal) {
    modal.remove();
  }

}


// ===============================
// วิเคราะห์ SDS ด้วย AI
// ===============================

function analyzeSDS(id) {

  const sds =
    sdsDocuments.find(function (item) {

      return item.id === id;

    });


  if (!sds) return;


  alert(
    "🤖 AI วิเคราะห์ SDS\n\n" +
    "เอกสาร: " + sds.fileName + "\n\n" +
    "ระบบจะวิเคราะห์ข้อมูลสำคัญ เช่น\n" +
    "• ชื่อสารเคมี\n" +
    "• CAS Number\n" +
    "• อันตรายของสาร\n" +
    "• PPE\n" +
    "• การจัดเก็บ\n" +
    "• การปฐมพยาบาล\n\n" +
    "⚙️ ระบบ AI จะเชื่อมต่อในขั้นตอนถัดไป"
  );

}


// ===============================
// ดู SDS
// ===============================

function viewSDS(id) {

  const sds =
    sdsDocuments.find(function (item) {

      return item.id === id;

    });


  if (!sds) return;


  alert(
    "📄 ข้อมูล SDS\n\n" +
    "เอกสาร: " + sds.fileName + "\n" +
    "สารเคมี: " + sds.chemicalName + "\n" +
    "CAS Number: " + sds.cas + "\n" +
    "สถานะ: " + sds.status + "\n" +
    "วันที่: " + sds.date
  );

}
