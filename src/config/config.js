// 微信测试公众号
const params = {
    appid: "wxe6e8431df7080211",
    secret: "6ce5e2d439bb821dc5ba439c59a66b9f",
    // touser: "oaZR-6az0Jeuhd9RL6VF08FhRdjU",
    template_id: "je-w23k1YSr02KsHIFgAJEnp3sSurnZcU8qV6PSxPoM",
};

// 纪念日
const DAYS = {
    meet: "2021/10/24",
    love: "2022/4/16",
    bday1: "1999/5/14", // 农历
    bday2: "1997/3/17", // 农历
};
// 每日文案（来自 一言）
const QUOTE_URL = "https://v1.hitokoto.cn/?c=d&c=e&c=f&c=g&c=j&min_length=8&max_length=20&encode=text";
// 每日英文（来自 金山词霸）
const ENGLISH_URL = "https://open.iciba.com/dsapi/";
// 位置经纬度
const LOCAL = "114.09,22.55"; // 深圳：22.55N, 144.09E
// 彩云天气api
const WEATHER_URL = `https://api.caiyunapp.com/v2.6/KGrToOq3qRcl9lbM/${LOCAL}/weather?alert=true&dailysteps=1&hourlysteps=24`;

const listConfig = {
    nowDate: { value: "" },
    meetDay: { value: "" },
    loveDay: { value: "" },
    birthday1: { value: "" },
    birthday2: { value: "" },
    weather: { value: "" },
    english: { value: "" },
    txt: { value: "" },
};

module.exports = {
    params,
    listConfig,
    DAYS,
    QUOTE_URL,
    ENGLISH_URL,
    WEATHER_URL,
};
