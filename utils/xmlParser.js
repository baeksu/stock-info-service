const fs = require("fs");
const xml2js = require("xml2js");
module.exports = {
    parseXml: function (extractFilePath) {
        const xmlData = fs.readFileSync(`${extractFilePath}/CORPCODE.xml`, "utf-8");
        const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
        const corpsMap = new Map();

        //xml 파싱
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                console.log(`error! during parsing : ${err}`);
            } else {
                const listCorp = result.result.list;
                listCorp.forEach((item) => {
                    const corpCode = item.corp_code;
                    const corpName = item.corp_name;
                    corpsMap.set(corpName, corpCode);
                });
            }
        });

        return corpsMap;
    },
};
