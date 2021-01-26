const ranked = require('../../content/ranked');

describe("The ranked function", () => {

    const messages = [
        {
            ts: "1605204614.032600",
            text: "popular #content",
            reactions: [
                {
                    name: "upvote",
                    users: ["", "", ""]
                },
                {
                    name: "downvote",
                    users: []
                }
            ]
        },
        {
            ts: "1604076162.015600",
            text: "slightly older #content",
            reactions: [
                {
                    name: "upvote",
                    users: ["", "", "", ""]
                },
                {
                    name: "downvote",
                    users: [""]
                }
            ]
        }
    ];

    it("given equal scores favor older entries", () => {
        expect(ranked(messages).map(m => m.content.trim())).toEqual([
            "slightly older",
            "popular"
        ]);
    });

    it("computes a permalink", () => {
        expect(ranked(messages).map(m => m.url))
            .toEqual([
                "https://aptera.slack.com/archives/C02N0KETP/p1604076162015600?thread_ts=1604076162.015600&cid=C02N0KETP",
                "https://aptera.slack.com/archives/C02N0KETP/p1605204614032600?thread_ts=1605204614.032600&cid=C02N0KETP"
            ]);
    });

});