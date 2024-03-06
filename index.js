// import 랑 require 랑 차이가 뭐지
const axios = require("axios");
const fs = require("fs");

const express = require("express");
const app = express();

//금융감독원 openapi key
const openDartApiKey = "69872aa9aab15c6390ed38b51202b0021295cc12";
const corpCodeUrl = `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${openDartApiKey}`;

axios
    .get(corpCodeUrl, { responseType: "arraybuffer" })
    .then((res) => {
        const data = res.data;

        fs.writeFileSync("./CORPCODE.zip", Buffer.from(data), "utf8", (err) => {
            if (err) throw err;
            console.log("종목 정보를 저장했습니다!");
        });
    })
    .catch((error) => {
        console.log(error);
    });
