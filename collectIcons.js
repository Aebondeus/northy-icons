const fs = require('fs');
const path = require('path')

const iconsEntrypoint = path.resolve(__dirname, 'src/icons');
const logoEntryPoint = path.resolve(__dirname, 'src/logo');
const mainEntrypoint = path.resolve(__dirname, 'src/main.ts');

const icons =  fs.readdirSync(iconsEntrypoint);
const logo = fs.readdirSync(logoEntryPoint);

const readableFolders = { icons, logo };
const stream = fs.createWriteStream(mainEntrypoint);

stream.once('open', () => {
    Object.entries(readableFolders).map(([folderName, files]) => {

        const folderFiles = files.map((foldersFile) => {
            const fileName = foldersFile.split('.')[0];
            stream.write(`export { default as ${fileName} } from "./${folderName}/${foldersFile}";\n`);

            return fileName;
        });

        stream.write(`export const ${folderName}Json = ${JSON.stringify(folderFiles)};\n`);
    });

    stream.end();
})

