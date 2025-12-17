// STEP 1: Paste your Google Sheet CSV link here
const SHEET_URL = "PASTE_YOUR_GOOGLE_SHEET_CSV_LINK_HERE";

// STEP 2: Fetch live data
fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split("\n").slice(1); // skip header row

    let total = 0;
    let verified = 0;
    let nv = 0;
    let attempts2plus = 0;

    rows.forEach(row => {
      if (!row.trim()) return;

      const cols = row.split(",");

      const kycStatus = cols[4]?.trim();   // KYC Status column
      const attempts = parseInt(cols[6]);  // Attempts column

      total++;

      if (kycStatus === "Verified") verified++;
      if (kycStatus === "NV") nv++;
      if (attempts >= 2) attempts2plus++;
    });

    /
