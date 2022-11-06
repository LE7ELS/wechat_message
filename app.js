const { params } = require("./src/config/config");
const getToken = require("./src/getToken/index");
const getAllDataAndSend = require("./src/sendMessage/index");

async function start(userid) {
    let access_token;

    Object.assign(params, { touser: userid });
    try {
        access_token = await getToken(params);
    } catch (error) {
        process.exit(0);
    }

    getAllDataAndSend({
        ...params,
        access_token,
    })
        .then((res) => {
            if (res.data && res.data.errcode) {
                console.error("发送失败", res.data);
                return;
            }
            console.log(`发送给${userid} 成功-请在微信上查看对应消息`);
        })
        .catch((err) => console.error("发送失败", err));
}
// 手动设置定时器发送给多个用户
start("oaZR-6az0Jeuhd9RL6VF08FhRdjU");
setTimeout(() => {
    start("oaZR-6VY41M9ySqRkyCRsjUwvuIo");
}, 5000);
