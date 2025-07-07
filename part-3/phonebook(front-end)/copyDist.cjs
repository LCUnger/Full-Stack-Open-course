const fs = require('fs');
const path = require('path');

// Define source and destination paths
const source = path.join(__dirname, 'dist');
const destination = path.join(__dirname, '../phonebook_server/dist');
const assetsFolder = path.join(destination, 'assets');

// Delete the assets folder
if (fs.existsSync(assetsFolder)) {
  fs.rmSync(assetsFolder, { recursive: true, force: true });
  console.log('Deleted assets folder in backend dist.');
}

// Copy files recursively
const copyFolderRecursive = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

copyFolderRecursive(source, destination);
console.log('Frontend dist folder copied to backend successfully!');