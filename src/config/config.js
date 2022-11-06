// 微信测试公众号
const params = {
    appid: "wxe6e8431df7080211",
    secret: "6ce5e2d439bb821dc5ba439c59a66b9f",
    // touser: "oaZR-6az0Jeuhd9RL6VF08FhRdjU",
    template_id: "vCOcg2qgNf1Dp7F2iy8mENm7KVm0YS13dbUtM-9iRX8",
};

// 纪念日
const DAYS = {
    meet: "2021/10/24",
    love: "2022/4/16",
    bday1: "1999/5/14", // 农历
    bday2: "1997/3/17", // 农历
};
// 每日文案（来自 ONE·一个）
const QUOTE_URL = "https://apier.youngam.cn/essay/one";
// 每日英文（来自 金山词霸）
const ENGLISH_URL = "https://open.iciba.com/dsapi/";
// 当地拼音，需要在下面的墨迹天气url确认
const LOCAL = "guangdong/shenzhen";
// 获取天气链接
const WEATHER_URL = "https://tianqi.moji.com/weather/china/" + LOCAL;

const listConfig = {
    nowDate: {
        value: "",
    },
    meetDay: {
        value: "",
    },
    loveDay: {
        value: "",
    },
    birthday: {
        value: "",
    },
    weather: {
        value: "",
    },
    english: {
        value: "",
    },
    txt: {
        value: "",
    },
};

module.exports = {
    params,
    listConfig,
    DAYS,
    QUOTE_URL,
    ENGLISH_URL,
    WEATHER_URL,
};
