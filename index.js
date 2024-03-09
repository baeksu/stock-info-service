// import 랑 require 랑 차이가 뭐지
const axios = require("axios");
const AdmZip = require("adm-zip");
const fs = require("fs");

//금융감독원 openapi key
//나중에 서비스로 만들꺼면 opendartapikey 를 입력값으로 UI 에서 받아서 사용해야 함
const openDartApiKey = "69872aa9aab15c6390ed38b51202b0021295cc12";
const corpCodeUrl = `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${openDartApiKey}`;

//종목정보 받아온 후 해당 폴더에 압축을 풀거다.
const extractFilePath = "./CORPCODE"; // 압축이 해제될 위치를 지정합니다.

//파일이 이미 존재하면 ok , 존재하지 않으면 get 요청으로 이진데이터 회신
if (fs.existsSync(`${extractFilePath}/CORPCODE.xml`)) {
    console.log("File already exists!");
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
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

parseXml();

//xml 파일 파싱하기
function parseXml() {
    const xmlData = fs.readFileSync(`${extractFilePath}/CORPCODE.xml`);
    const stockList = []; //xml 파싱 후 정목 정보 저장 배열

    // const res = xmlData.split("\n");
    console.log(xmlData);
}
