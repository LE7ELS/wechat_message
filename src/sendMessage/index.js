var axios = require("axios");
const { listConfig, DAYS } = require("../../src/config/config");
const { getQuote, getDailyEnglish, getWeatherInfo, bdayCountdown } = require("./getContent");

const week = ["天", "一", "二", "三", "四", "五", "六"];
const bdayQuotes = [
    "愿你的生活常温暖，日子总是温暖又闪光。",
    "愿每一岁都能奔走在自己的热爱里。",
    "愿你星光灿烂，前途无忧。生日快乐哦~",
    "愿你前进无坎坷，归来有星光。生日快乐~",
];

const getAllDataAndSend = (param) => {
    // 今日
    let today = new Date();
    const weekDay = today.getDay();
    let todaystr = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
    listConfig.nowDate.value = `今天是 ${todaystr} 星期${week[weekDay]}`;

    // 纪念日
    let initMeet = new Date(DAYS.meet),
        meetDay = Math.floor((today - initMeet) / 1000 / 60 / 60 / 24);
    listConfig.meetDay.value = `和臭宝相遇已经 ${meetDay} 天啦！`;
    let initLove = new Date(DAYS.love),
        loveDay = Math.floor((today - initLove) / 1000 / 60 / 60 / 24);
    listConfig.loveDay.value = `今天是我们在一起的第 ${loveDay} 天`;
    let herBday = bdayCountdown(DAYS.bday1),
        myBday = bdayCountdown(DAYS.bday2);

    listConfig.birthday1.value = herBday ? `距离臭宝生日还有 ${herBday} 天` : "亲爱的臭宝生日快乐~";
    listConfig.birthday2.value = myBday ? `距离JC生日还有 ${myBday} 天` : "亲爱的JC生日快乐~";

    return Promise.all([getQuote(), getDailyEnglish(), getWeatherInfo()]).then(([quote, english, weatherInfo]) => {
        // 天气
        listConfig.weather.value = `深圳${weatherInfo.tips}`;
        // 每日一句英文（消息过长展示不全）
        // listConfig.english.value = `📝 每日英文\n🔤 ${english.content}\n🀄 ${english.note}`;
        // 语录
        let index = Math.floor(Math.random() * 4),
            bdayQuote = bdayQuotes[index];

        listConfig.txt.value = herBday && myBday ? quote : bdayQuote;
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
