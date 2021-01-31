console.log("Loading...");
const result = fetch("/api/content")
    .then(res => res.json())
    .then(result => {
        display(result);
    });

function display(submissions) {
    const list = document.getElementById("results");
    list.innerHTML = "";
    submissions.forEach(addItemTo(list));
}

function addItemTo(list) {
    return r => {
        const a = document.createElement("a");
        a.innerHTML = render(r.content);
        a.href = r.url;
        addVotes(a, r);

        const li = document.createElement("li");
        li.appendChild(a);
        list.appendChild(li);
    };
}

function addVotes(to, r) {
    const votes = div("votes");
    votes.appendChild(div("upvotes", `&uarr;${r.upvotes}`));
    votes.appendChild(div("downvotes", `&darr;${r.downvotes}`));
    to.appendChild(votes);
}

function div(className, content) {
    const div = document.createElement("div");
    div.className = className;
    div.innerHTML = content || "";
    return div;
}

function render(content) {
    return marked(
        decodeBlockquotes(
            removeAutoLinks(content)), {
        breaks: true
    });
}

function decodeBlockquotes(content) {
    return content.replace(/&gt;+/g, '>');
}

function removeAutoLinks(content) {
    return content.replace(/<http:\/\/.+\|(.+)>/g, '$1');
}
