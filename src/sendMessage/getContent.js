var axios = require("axios");
var solarLunar = require("../solarLunar");

const { QUOTE_URL, ENGLISH_URL, WEATHER_URL } = require("../config/config");

// 获取每日一句
const getQuote = async () => {
    let { data } = await axios({ url: QUOTE_URL });
    return data;
};

// 金山词霸每日英文
const getDailyEnglish = async () => {
    let { data } = await axios({ url: ENGLISH_URL });
    return data;
};

// 获取天气提醒
const getWeatherInfo = async () => {
    let { data } = await axios({ url: WEATHER_URL });
    return { tips: data.result.forecast_keypoint };
};

// 农历生日倒计时
const bdayCountdown = (bday, nextYear = 0) => {
    // 1. 农历转换
    let thisBday = bday.split("/"),
        thisYear = new Date().getFullYear() + nextYear;
    // 替换为下一次生日所在年（今年或明年）
    thisBday[0] = thisYear;

    // 字符串数组转为 Number 数组，构造参数
    const args = thisBday.map(Number);
    // 转换为对应阳历，并组合字符串
    let solarDays = solarLunar.lunar2solar(...args),
        solarBday = [solarDays.cYear, solarDays.cMonth, solarDays.cDay].join("/"); // 下一次阳历生日
    // 2. 时间差
    let todayTime = new Date().getTime(),
        bdTime = Date.parse(solarBday),
        distance = bdTime - todayTime;
    let day = Math.floor(distance / (24 * 3600 * 1000)) + 1;
    if (day < 0) {
        day = bdayCountdown(bday, 1);
    }
    return day;
};

module.exports = {
    getQuote,
    getDailyEnglish,
    getWeatherInfo,
    bdayCountdown,
};
