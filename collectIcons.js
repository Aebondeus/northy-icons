const fs = require('fs');
const path = require('path')

const folderEntrypoint = path.resolve(__dirname, 'src/icons');
const mainEntrypoint = path.resolve(__dirname, 'src/main.ts');

const iconsPaths =  fs.readdirSync(folderEntrypoint);
const stream = fs.createWriteStream(mainEntrypoint);

stream.once('open', () => {
    const icons = iconsPaths.map((iconPath) => {
        const iconName = iconPath.split('.')[0];
        stream.write(`export { default as ${iconName} } from "./icons/${iconPath}";\n`);

        return iconName;
    });

    stream.write(`export const iconsJson = ${JSON.stringify(icons)};\n`);
    stream.end();
})

