const { chromium } = require("playwright");
const { pathToFileURL } = require("url");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(pathToFileURL(path.join(__dirname, "cv.html")).href, { waitUntil: "networkidle" });
  await p.pdf({
    path: "../public/Bharath-Sathiskumar-CV.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "0", bottom: "14px", left: "0", right: "0" },
  });
  console.log("PDF generated");
  await b.close();
})();
