// 微信测试公众号
const params = {
    appid: "wxe6e8431df7080211",
    secret: "6ce5e2d439bb821dc5ba439c59a66b9f",
    touser: "oaZR-6az0Jeuhd9RL6VF08FhRdjU",
    template_id: "KTp8VbRoSR3WM1dJanY9zHYVwHbXXrvXb8hHDBJoRCI",
};

// 纪念日
const START_DAY = "2022/4/17";
// 每日发送时间
const SEND_HOUR = 07;
const SEND_MINUTE = 30;
// 获取每日情话链接
const CHP_URL = "https://api.shadiao.pro/chp";
// 当地拼音,需要在下面的墨迹天气url确认
const LOCAL = "guangdong/shenzhen";
// 获取天气链接
const WEATHER_URL = "https://tianqi.moji.com/weather/china/" + LOCAL;

const listConfig = {
    nowDate: {
        value: "",
        color: "#87e8de",
    },
    city: {
        value: "北京",
        color: "#9CA2A0",
    },
    weather: {
        value: "",
        color: "#7CD47D",
    },
    temperature: {
        value: "",
        color: "#CBA476",
    },
    loveDate: {
        value: "",
        color: "#ff9c6e",
    },

    txt: {
        value: "",
        color: "#3C4244",
    },
};

module.exports = {
    params,
    listConfig,
    START_DAY,
    SEND_HOUR,
    SEND_MINUTE,
    CHP_URL,
    WEATHER_URL,
};
