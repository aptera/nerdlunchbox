const _ = require("lodash");

module.exports = function (messages) {
    return _.chain(messages)
        .filter(m => m.text.includes("#content"))
        .map(contentAndVotes)
        .filter(m => !m.watched)
        .map(scores)
        .orderBy(["score", "timestamp"], ["desc", "asc"])
        .value();

    function contentAndVotes(message) {
        return {
            timestamp: message.ts,
            url: permalink(message),
            content: message.text.replace("#content", ""),
            upvotes: count(message.reactions, "upvote"),
            downvotes: count(message.reactions, "downvote"),
            watched: !!count(message.reactions, "sandwich")
        };
    }

    function permalink(message) {
        return "https://aptera.slack.com/archives/C02N0KETP/p"
            + message.ts.replace(".", "")
            + "?thread_ts="
            + message.ts
            + "&cid=C02N0KETP";
    }

    function count(list, name) {
        return _.chain(list)
            .filter(r => r.name == name)
            .map(r => r.users)
            .flatten()
            .value()
            .length
    }

    function scores(message) {
        return {
            ...message,
            score: message.upvotes - message.downvotes
        };
    }

}