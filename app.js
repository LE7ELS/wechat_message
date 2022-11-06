const { params } = require("./src/config/config");
const getToken = require("./src/getToken/index");
const getAllDataAndSend = require("./src/sendMessage/index");

async function start() {
    let access_token;

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
            console.log("发送成功-请在微信上查看对应消息");
        })
        .catch((err) => console.error("发送失败", err));
}
start();
