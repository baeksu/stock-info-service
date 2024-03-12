const { default: axios } = require("axios");
const initCorpData = require("./utils/initCorpData");

//금융감독원 openapi key
//나중에 서비스로 만들꺼면 opendartapikey 를 입력값으로 UI 에서 받아서 사용해야 함
const extractFilePath = "./CORPCODE"; // 압축이 해제될 위치를 지정합니다.
const openDartApiKey = "69872aa9aab15c6390ed38b51202b0021295cc12";

const corps = initCorpData.getCorpData(openDartApiKey, extractFilePath); // 초기 기업 xml데이터 가져오기
// console.log(corps.get("한국전력공사"));

axios.get(`https://opendart.fss.or.kr/api/fnlttSinglIndx.json?crtfc_key=${openDartApiKey}&corp_code=${corps.get("한국전력공사")}&bsns_year=2023&reprt_code=11014&idx_cl_code=M210000`).then((res) => {
    console.log(res.data);
});
