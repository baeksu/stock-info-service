const initCorpData = require("./utils/initCorpData");

//금융감독원 openapi key
//나중에 서비스로 만들꺼면 opendartapikey 를 입력값으로 UI 에서 받아서 사용해야 함
const extractFilePath = "./CORPCODE"; // 압축이 해제될 위치를 지정합니다.

const corps = initCorpData.getCorpData(extractFilePath); // 초기 기업 xml데이터 가져오기
console.log(corps);
