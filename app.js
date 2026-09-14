/* =========================================
   ChemReport Application
   ========================================= */


/* ---------- DEMO CHEMICAL DATA ---------- */

let chemicals = [
  {
    name: "Ethanol",
    thaiName: "เอทานอล",
    cas: "64-17-5",
    risk: "ปานกลาง",
    sds: true
  },
  {
    name: "Acetone",
    thaiName: "อะซีโตน",
    cas: "67-64-1",
    risk: "สูง",
    sds: true
  },
  {
    name: "Hydrochloric Acid",
    thaiName: "กรดไฮโดรคลอริก",
    cas: "7647-01-0",
    risk: "สูง",
    sds: false
  }
];


/* ---------- PAGE READY ---------- */

document.addEventListener("DOMContentLoaded", function () {

  console.log("ChemReport loaded successfully");

  setupSearch();

});


/* ---------- ADD CHEMICAL ---------- */

function openChemicalModal() {

  // ป้องกันหน้าต่างซ้ำ
  const oldModal = document.getElementById("chemicalModal");

  if (oldModal) {
    oldModal.remove();
  }


  const modal = document.createElement("div");

  modal.id = "chemicalModal";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(15,23,42,0.55);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    z-index:99999;
  `;


  modal.innerHTML = `

    <div style="
      width:100%;
      max-width:520px;
      background:white;
      border-radius:18px;
      padding:28px;
      box-shadow:0 20px 60px rgba(0,0,0,.25);
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:22px;
      ">

        <div>
          <div style="
            color:#0f4c81;
            font-size:22px;
            font-weight:700;
          ">
            ➕ เพิ่มสารเคมี
          </div>

          <div style="
            color:#64748b;
            font-size:13px;
            margin-top:4px;
          ">
            เพิ่มข้อมูลสารเคมีเข้าสู่ระบบ ChemReport
          </div>
        </div>

        <button
          onclick="closeChemicalModal()"
          style="
            border:none;
            background:#f1f5f9;
            width:36px;
            height:36px;
            border-radius:50%;
            cursor:pointer;
            font-size:18px;
          "
        >
          ×
        </button>

      </div>


      <label style="font-weight:600;font-size:14px;">
        ชื่อสารเคมี *
      </label>

      <input
        id="chemicalName"
        type="text"
        placeholder="เช่น Ethanol"
        style="
          width:100%;
          padding:13px;
          margin:8px 0 16px;
          border:1px solid #cbd5e1;
          border-radius:9px;
          font-size:14px;
        "
      >


      <label style="font-weight:600;font-size:14px;">
        ชื่อภาษาไทย
      </label>

      <input
        id="chemicalThaiName"
        type="text"
        placeholder="เช่น เอทานอล"
        style="
          width:100%;
          padding:13px;
          margin:8px 0 16px;
          border:1px solid #cbd5e1;
          border-radius:9px;
          font-size:14px;
        "
      >


      <label style="font-weight:600;font-size:14px;">
        CAS Number *
      </label>

      <input
        id="chemicalCAS"
        type="text"
        placeholder="เช่น 64-17-5"
        style="
          width:100%;
          padding:13px;
          margin:8px 0 16px;
          border:1px solid #cbd5e1;
          border-radius:9px;
          font-size:14px;
        "
      >


      <label style="font-weight:600;font-size:14px;">
        ระดับความเสี่ยง
      </label>

      <select
        id="chemicalRisk"
        style="
          width:100%;
          padding:13px;
          margin:8px 0 22px;
          border:1px solid #cbd5e1;
          border-radius:9px;
          font-size:14px;
          background:white;
        "
      >
        <option value="ต่ำ">ต่ำ</option>
        <option value="ปานกลาง">ปานกลาง</option>
        <option value="สูง">สูง</option>
        <option value="สูงมาก">สูงมาก</option>
      </select>


      <div style="
        display:flex;
        justify-content:flex-end;
        gap:10px;
      ">

        <button
          onclick="closeChemicalModal()"
          style="
            padding:12px 20px;
            border:1px solid #cbd5e1;
            background:white;
            color:#475569;
            border-radius:9px;
            cursor:pointer;
          "
        >
          ยกเลิก
        </button>


        <button
          onclick="saveChemical()"
          style="
            padding:12px 22px;
            border:none;
            background:#0f4c81;
            color:white;
            border-radius:9px;
            cursor:pointer;
            font-weight:600;
          "
        >
          ✓ บันทึกข้อมูล
        </button>

      </div>

    </div>

  `;


  document.body.appendChild(modal);

}


/* ---------- CLOSE MODAL ---------- */

function closeChemicalModal() {

  const modal = document.getElementById("chemicalModal");

  if (modal) {
    modal.remove();
  }

}


/* ---------- SAVE CHEMICAL ---------- */

function saveChemical() {

  const name =
    document.getElementById("chemicalName").value.trim();

  const thaiName =
    document.getElementById("chemicalThaiName").value.trim();

  const cas =
    document.getElementById("chemicalCAS").value.trim();

  const risk =
    document.getElementById("chemicalRisk").value;


  if (!name) {
    alert("กรุณากรอกชื่อสารเคมี");
    return;
  }


  if (!cas) {
    alert("กรุณากรอก CAS Number");
    return;
  }


  // ตรวจสอบ CAS ซ้ำ

  const duplicate = chemicals.some(function (chemical) {

    return chemical.cas.toLowerCase() === cas.toLowerCase();

  });


  if (duplicate) {

    alert(
      "พบ CAS Number นี้ในระบบแล้ว\n\n" +
      "ระบบป้องกันการป้อนข้อมูลสารเคมีซ้ำ"
    );

    return;
  }


  // เพิ่มข้อมูล

  const newChemical = {
    name: name,
    thaiName: thaiName || "-",
    cas: cas,
    risk: risk,
    sds: false
  };


  chemicals.push(newChemical);


  addChemicalToTable(newChemical);


  closeChemicalModal();


  showNotification(
    "✓ เพิ่มสารเคมี " + name + " เรียบร้อยแล้ว"
  );


  updateStatistics();

}


/* ---------- ADD ROW ---------- */

function addChemicalToTable(chemical) {

  const tableBody =
    document.getElementById("chemicalTableBody");


  if (!tableBody) {
    return;
  }


  const row =
    document.createElement("tr");


  let riskClass = "risk-low";


  if (
    chemical.risk === "ปานกลาง"
  ) {
    riskClass = "risk-medium";
  }


  if (
    chemical.risk === "สูง" ||
    chemical.risk === "สูงมาก"
  ) {
    riskClass = "risk-high";
  }


  const sdsHTML = chemical.sds
    ? `<span class="sds">✓ มี SDS</span>`
    : `<span class="sds-pending">⚠ รอตรวจสอบ</span>`;


  row.innerHTML = `

    <td>${escapeHTML(chemical.name)}</td>

    <td>${escapeHTML(chemical.thaiName)}</td>

    <td>${escapeHTML(chemical.cas)}</td>

    <td>
      <span class="risk ${riskClass}">
        ${escapeHTML(chemical.risk)}
      </span>
    </td>

    <td>
      ${sdsHTML}
    </td>

  `;


  tableBody.appendChild(row);

}


/* ---------- SEARCH ---------- */

function setupSearch() {

  const search =
    document.getElementById("chemicalSearch");


  if (!search) {
    return;
  }


  search.addEventListener("input", function () {

    const keyword =
      search.value.toLowerCase().trim();


    const rows =
      document.querySelectorAll(
        "#chemicalTableBody tr"
      );


    rows.forEach(function (row) {

      const text =
        row.textContent.toLowerCase();


      row.style.display =
        text.includes(keyword)
          ? ""
          : "none";

    });

  });

}


/* ---------- IMPORT SDS ---------- */

function importSDS() {

  showNotification(
    "📄 ระบบนำเข้า SDS กำลังเตรียมพร้อม"
  );

}


/* ---------- AI SDS ---------- */

function analyzeSDS() {

  showNotification(
    "🤖 ระบบวิเคราะห์ SDS ด้วย AI กำลังเตรียมพร้อม"
  );

}


/* ---------- REPORT ---------- */

function viewReport() {

  showNotification(
    "📊 กำลังเปิดรายงาน ChemReport"
  );

}


/* ---------- PAGE ---------- */

function showPage(page) {

  if (page === "dashboard") {

    showNotification(
      "🏠 Dashboard"
    );

  }

}


/* ---------- NOTIFICATION ---------- */

function showNotification(message) {

  const old =
    document.getElementById("chemNotification");


  if (old) {
    old.remove();
  }


  const notification =
    document.createElement("div");


  notification.id =
    "chemNotification";


  notification.textContent =
    message;


  notification.style.cssText = `
    position:fixed;
    right:22px;
    bottom:22px;
    background:#0f4c81;
    color:white;
    padding:14px 20px;
    border-radius:10px;
    box-shadow:0 8px 30px rgba(0,0,0,.2);
    z-index:100000;
    font-size:14px;
    animation:chemFade .2s ease;
  `;


  document.body.appendChild(notification);


  setTimeout(function () {

    if (notification) {
      notification.remove();
    }

  }, 3000);

}


/* ---------- UPDATE STATISTICS ---------- */

function updateStatistics() {

  const total =
    document.getElementById("totalChemicals");


  if (total) {

    const current =
      parseInt(total.textContent) || 0;

    total.textContent =
      current + 1;

  }


  const highRisk =
    document.getElementById("highRisk");


  if (highRisk) {

    const latest =
      chemicals[chemicals.length - 1];


    if (
      latest &&
      (
        latest.risk === "สูง" ||
        latest.risk === "สูงมาก"
      )
    ) {

      const current =
        parseInt(highRisk.textContent) || 0;

      highRisk.textContent =
        current + 1;

    }

  }


  const pending =
    document.getElementById("pendingSDS");


  if (pending) {

    const current =
      parseInt(pending.textContent) || 0;

    pending.textContent =
      current + 1;

  }

}


/* ---------- SECURITY ---------- */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
