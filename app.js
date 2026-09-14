// ===== ChemReport Chemical Table Fix =====
document.addEventListener("DOMContentLoaded", function () {

  const chemicals = [
    {
      name: "Ethanol",
      thai: "เอทานอล",
      cas: "64-17-5",
      risk: "ปานกลาง",
      sds: "มี"
    },
    {
      name: "Acetone",
      thai: "อะซีโตน",
      cas: "67-64-1",
      risk: "สูง",
      sds: "มี"
    },
    {
      name: "Hydrochloric Acid",
      thai: "กรดไฮโดรคลอริก",
      cas: "7647-01-0",
      risk: "สูง",
      sds: "มี"
    },
    {
      name: "Sodium Chloride",
      thai: "โซเดียมคลอไรด์",
      cas: "7647-14-5",
      risk: "ต่ำ",
      sds: "มี"
    }
  ];

  // ค้นหาตารางสารเคมี
  const table = document.querySelector("table");

  if (!table) return;

  let tbody = table.querySelector("tbody");

  // ถ้ายังไม่มี tbody ให้สร้าง
  if (!tbody) {
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
  }

  // ค้นหาช่องค้นหา
  const searchInput =
    document.querySelector('input[type="search"]') ||
    document.querySelector('input[placeholder*="ค้นหา"]') ||
    document.querySelector('input[placeholder*="ค้นหาสาร"]');

  function renderChemicals(keyword = "") {

    const search = keyword.trim().toLowerCase();

    const filtered = chemicals.filter(c =>
      c.name.toLowerCase().includes(search) ||
      c.thai.toLowerCase().includes(search) ||
      c.cas.includes(search)
    );

    tbody.innerHTML = "";

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;padding:30px;color:#777;">
            ไม่พบข้อมูลสารเคมี
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach((chemical, index) => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${chemical.name}</td>
        <td>${chemical.thai}</td>
        <td>${chemical.cas}</td>
        <td>
          <span class="risk-badge">
            ${chemical.risk}
          </span>
        </td>
        <td>
          <span style="color:#198754;font-weight:600;">
            ✓ ${chemical.sds}
          </span>
        </td>
        <td>
          <button
            onclick="alert('ดูข้อมูล ${chemical.name}')"
            style="
              border:none;
              background:#eaf3ff;
              color:#155a92;
              padding:7px 12px;
              border-radius:8px;
              cursor:pointer;
            ">
            ดูข้อมูล
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });
  }

  // แสดงข้อมูลครั้งแรก
  renderChemicals(searchInput ? searchInput.value : "");

  // ระบบค้นหา
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderChemicals(this.value);
    });
  }

});
