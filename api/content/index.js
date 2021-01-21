const fetch = require("node-fetch");

module.exports = async function (context, req) {
    const query = `https://slack.com/api/conversations.history?token=${process.env["SLACK_API_TOKEN"]}&channel=${process.env["SLACK_CHANNEL_ID"]}&oldest=1604076099.014800`;

    const result = await fetch(query)
        .then(res => res.json());

    context.res = {
        body: result
    };
}