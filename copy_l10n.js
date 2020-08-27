const fs = require('fs-extra');
const l10nMap = require('./l10nMap');

const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push({
                dirPath,
                file,
                path: `${dirPath}/${file}`
            })
        }
    });
  
    return arrayOfFiles
}

// sync TI's privacy scanner wording to Carbon's L10n
l10nMap.l10n.forEach(lang => {
    const tiL10nPath = `D:/Titanium_L10n/${lang}/src/HE/TrendMicroToolbar/import/PCC/package/CommonEngine/PrivacyScanner/PSPromotion/locale/${l10nMap.map[lang]}`;
    const carbonL10nPath = `D:/Carbon_l10n/${lang}/privacy_scanner/PSPromotion/`;
    const filesArr = getAllFiles(tiL10nPath);
            
    fs.mkdirSync(carbonL10nPath);
    fs.mkdirSync(`${carbonL10nPath}css`);
    filesArr.forEach(file => {
        let distPath = '';
        if (file.path.indexOf('css') > -1) {
            distPath = `${carbonL10nPath}css/`;
        } else {
            distPath = `${carbonL10nPath}`;
        }

        console.log(distPath);                
        console.log(file);
        console.log(`=-=====`);

        fs.copyFile(file.path, `${distPath}${file.file}`, (err) => {  
            if (err) throw err;
        });
    });
});

// copy files to new folder
// l10n.forEach(val => {
    
//     fs.remove(`D:/Carbon_l10n/${val}/privacy_scanner/promotion/`);
//     var filesArr = getAllFiles(`D:/Carbon_l10n/${val}/privacy_scanner/`);
            
//     fs.mkdirSync(`D:/Carbon_l10n/${val}/privacy_scanner/local_page`);
//     fs.mkdirSync(`D:/Carbon_l10n/${val}/privacy_scanner/local_page/css`);
//     fs.mkdirSync(`D:/Carbon_l10n/${val}/privacy_scanner/local_page/img`);
//     filesArr.forEach(file => {
//         let distPath = '';
//         if (file.path.indexOf('css') > -1) {
//             distPath = `D:/Carbon_l10n/${val}/privacy_scanner/local_page/css/`;
//         } else if (file.path.indexOf(`img`) > -1) {
//             distPath = `D:/Carbon_l10n/${val}/privacy_scanner/local_page/img/`;
//         } else {
//             distPath = `D:/Carbon_l10n/${val}/privacy_scanner/local_page/`;
//         }

//         console.log(distPath);                
//         console.log(file);
//         console.log(`=-=====`);
//         fs.renameSync(file.path, `${distPath}${file.file}`, (err) => {  
            
//             if (err) throw err;
//         });
//     });

//     fs.remove(`D:/Carbon_l10n/${val}/privacy_scanner/css/`);
//     fs.remove(`D:/Carbon_l10n/${val}/privacy_scanner/img/`);
// });