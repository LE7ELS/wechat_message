var axios = require("axios");
const solarLunar = require("solarLunar");
const { listConfig, DAYS } = require("../../src/config/config");
const { getQuote, getDailyEnglish } = require("./getContent");
const { getWeatherTips, getWeatherData, getWeatherIcon } = require("./getWeatherContent");
const week = ["天", "一", "二", "三", "四", "五", "六"];
const getAllDataAndSend = (param) => {
    // 今日
    let today = new Date();
    const weekDay = today.getDay();
    let todaystr = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
    listConfig.nowDate.value = `📅 今天是 ${todaystr} 星期${week[weekDay]}`;

    // 纪念日
    let initMeet = new Date(DAYS.meet),
        meetDay = Math.floor((today - initMeet) / 1000 / 60 / 60 / 24);
    listConfig.meetDay.value = `🙋‍♂️ 和臭宝相遇已经 ${meetDay} 天啦！`;
    let initLove = new Date(DAYS.love),
        loveDay = Math.floor((today - initLove) / 1000 / 60 / 60 / 24);
    listConfig.loveDay.value = `❤ 今天是我们在一起的第 ${loveDay} 天`;
    let birthday = bdayCountdown(DAYS.bday);
    listConfig.birthday.value = `🎂 距离臭宝生日还有 ${birthday} 天`;

    return Promise.all([getQuote(), getDailyEnglish(), getWeatherTips(), getWeatherData()]).then((data) => {
        // 天气
        const { WeatherText, Temperature, WindDirection } = data[3];
        let icon = getWeatherIcon(WeatherText);
        listConfig.weather.value = `${icon} 深圳${WeatherText}，${WindDirection}，气温${Temperature.replace("/", "~")}\n👔 ${data[2]}`;
        // 每日一句英文（消息过长展示不全）
        // listConfig.english.value = `📝 每日英文\n🔤 ${data[1].content}\n🀄 ${data[1].note}`;
        // 语录
        listConfig.txt.value = "✏️ " + data[0].text;
        return sendMessage(param, listConfig);
    });
};

// 农历生日倒计时
function bdayCountdown(bday, nextYear = 0) {
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
    // console.log("下次生日还有：", day);
    return day;
}

function sendMessage(data, listConfig) {
    return axios.post("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + data.access_token, {
        touser: data.touser,
        template_id: data.template_id,
        data: listConfig || {},
    });
}

module.exports = getAllDataAndSend;
