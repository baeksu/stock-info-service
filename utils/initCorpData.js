const AdmZip = require("adm-zip");
const fs = require("fs");
const axios = require("axios");
const xmlParser = require("./xmlParser");

const openDartApiKey = "69872aa9aab15c6390ed38b51202b0021295cc12";
const corpCodeUrl = `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${openDartApiKey}`;

module.exports = {
    getCorpData: function (extractFilePath) {
        //파일이 이미 존재하면 ok , 존재하지 않으면 get 요청으로 이진데이터 회신
        if (fs.existsSync(`${extractFilePath}/CORPCODE.xml`)) {
            console.log("File already exists!");
            return xmlParser.parseXml(extractFilePath);
        } else {
            console.log("File not exists, GET request to Open Dart API");
            axios
                .get(corpCodeUrl, { responseType: "arraybuffer" })
                .then((res) => {
                    const data = res.data;
                    const fileName = "./CORPCODE.zip";
                    fs.writeFile(fileName, Buffer.from(data), "utf8", (err) => {
                        if (err) throw err;

                        const zip = new AdmZip(fileName); // file위치로 AdmZip 오브젝트를 생성합니다.
                        zip.extractAllTo(extractFilePath, /* 압축결과가 기존 파일을 overwrite 할지 */ true);
                        console.log("File download completed!");
                        return xmlParser.parseXml(extractFilePath);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
};
