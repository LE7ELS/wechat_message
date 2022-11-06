var axios = require("axios");
const { QUOTE_URL, ENGLISH_URL } = require("../config/config");

const getQuote = async () => {
    let { data } = await axios({
        url: QUOTE_URL,
    });
    return data.dataList[0];
};
// 金山词霸每日英文
const getDailyEnglish = async () => {
    let { data } = await axios({
        url: ENGLISH_URL,
    });
    return data;
};

module.exports = {
    getQuote,
    getDailyEnglish,
};
