import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Fungsi untuk membuat nama file QR dinamis
function getNextFileName(baseName, ext) {
  let counter = 0;
  let fileName = `${baseName}${ext}`;

  // Periksa apakah file sudah ada, tambahkan angka jika perlu
  while (fs.existsSync(fileName)) {
    counter++;
    fileName = `${baseName}${counter}${ext}`;
  }

  return fileName;
}

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    const qrFileName = getNextFileName("qr", ".png");

    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(qrFileName));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log(`The file ${qrFileName} has been saved!`);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
