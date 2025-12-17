// 🔹 STEP 1: Paste your Google Sheet CSV link here
const SHEET_URL = "PASTE_YOUR_GOOGLE_SHEET_CSV_LINK_HERE";

// 🔹 STEP 2: Fetch data from Google Sheet
fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split("\n").slice(1); // skip header

    let totalKYC = 0;
    let verifiedCount = 0;
    let nvCount = 0;
    let attempts2Plus = 0;

    rows.forEach(row => {
      if (!row.trim()) return;

      const cols = row.split(",");

      const kycStatus = cols[4]?.trim();   // Column E
      const attemptsText = cols[7]?.trim(); // Column H

      totalKYC++;

      if (kycStatus === "Verified") {
        verifiedCount++;
      }

      if (kycStatus === "NV") {
        nvCount++;
      }

      // Count 2+ attempts
      if (attemptsText && attemptsText.includes("2")) {
        attempts2Plus++;
      }
    });

    // 🔹 STEP 3: Update KPI cards
    document.getElementById("total-kyc").innerText = totalKYC;
    document.getElementById("verified-kyc").innerText = verifiedCount;
    document.getElementById("nv-kyc").innerText = nvCount;
    document.getElementById("attempts-kyc").innerText = attempts2Plus;
  })
  .catch(error => {
    console.error("Error loading KYC data:", error);
  });
