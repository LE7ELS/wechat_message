var axios = require("axios");
const { listConfig, START_DAY } = require("../../src/config/config");
const { getContent } = require("./getContent");
const { getWeatherTips, getWeatherData, getWeatherIcon } = require("./getWeatherContent");
const week = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "天",
};
const getAllDataAndSend = (param) => {
    let today = new Date();
    let initDay = new Date(START_DAY);
    let lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24);
    let todaystr = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
    // 纪念日
    listConfig.days.value = `❤和臭宝在一起已经${lastDay}天啦！`;
    const weekDay = today.getDay();
    listConfig.nowDate.value = `今天是${todaystr} 星期${week[weekDay]}`;

    return Promise.all([getContent(), getWeatherTips(), getWeatherData()]).then((data) => {
        // 天气
        const { WeatherText, Temperature, WindDirection } = data[2];
        let icon = getWeatherIcon(WeatherText);
        listConfig.weather.value = `${icon}${WeatherText}，${WindDirection}，气温${Temperature.replace("/", "~")}\n🧥${data[1]}`;
        // 语录
        listConfig.txt.value = "✏️" + data[0].data.text;
        return sendMessage(param, listConfig);
    });
};

function sendMessage(data, listConfig) {
    return axios.post("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + data.access_token, {
        touser: data.touser,
        template_id: data.template_id,
        data: listConfig || {},
    });
}

module.exports = getAllDataAndSend;
