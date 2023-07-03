var axios = require("axios");
var path = require("path");
var fs = require("fs");
const moment = require("moment");

function getToken(params) {
    return new Promise((resolve, reject) => {
        const tokenFile = path.join(__dirname, "token.json");
        fs.readFile(tokenFile, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                if (data) {
                    const token = JSON.parse(data);
                    if (token.expires_in > moment().unix()) {
                        return resolve(token.access_token);
                    }
                }
                const { appid, secret } = params;
                axios
                    .get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
                    .then(({ data }) => {
                        if (data && data.errcode) {
                            return reject(data);
                        }
                        resolve(data.access_token);
                        data.expires_in = data.expires_in + moment().unix() - 1200;
                        fs.writeFile(tokenFile, JSON.stringify(data, "", "\t"), (e) => {
                            e && reject(e);
                        });
                    })
                    .catch((err) => reject(err));
            }
        });
    });
}

module.exports = getToken;
