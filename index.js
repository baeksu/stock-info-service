// import 랑 require 랑 차이가 뭐지
const axios = require("axios");
const fs = require("fs").promises;

const express = require("express");
const app = express();

const JSZip = require("jszip");
// const fs = require("fs").promises;

// 압축 해제할 zip 파일 경로
const zipFilePath = "./corpCode.zip";

// 압축을 푼 후 저장할 폴더 경로
const extractFolderPath = "";

//금융감독원 openapi key
const openDartApiKey = "69872aa9aab15c6390ed38b51202b0021295cc12";

axios
    .get(`https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${openDartApiKey}`)
    .then((res) => {
        const data = res.data;
        fs.writeFile("corpCode.zip", data, "utf-8", (err) => {
            if (err) throw err;
            console.log("종목 정보를 저장했습니다!");
        });
        unzip();
    })
    .catch((error) => {
        console.log(error);
    });

async function unzip() {
    try {
        // zip 파일을 읽어서 JSZip 객체 생성
        const zipData = await fs.readFile(zipFilePath);
        const zip = await JSZip.loadAsync(zipData);

        // 압축 해제
        await Promise.all(
            Object.keys(zip.files).map(async (filename) => {
                const content = await zip.files[filename].async("nodebuffer");
                const outputPath = `${extractFolderPath}/${filename}`;
                await fs.writeFile(outputPath, content);
                console.log(`Extracted: ${outputPath}`);
            })
        );

        console.log("Extraction complete.");
    } catch (error) {
        console.error("Error extracting zip file:", error);
    }
}
