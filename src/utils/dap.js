export const gasPageSend = (path, title) => {
    if (typeof gas !== "undefined") {
        gas("send", "pageview", path, title);
    }
}