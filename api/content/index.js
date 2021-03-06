const fetch = require("node-fetch");
const querystring = require('querystring');
const ranked = require("./ranked");

module.exports = async function (context, req) {
    const result = await fetch(url())
        .then(res => res.json());

    context.res = {
        body: ranked(result.messages)
    };

    function url() {
        const resource = "https://slack.com/api/conversations.history";
        return [resource, params()].join("?");
    }

    function params() {
        return querystring.stringify({
            token: process.env.SLACK_API_TOKEN,
            channel: process.env.SLACK_CHANNEL_ID,
            oldest: process.env.QUERY_SINCE
        });
    }
}
