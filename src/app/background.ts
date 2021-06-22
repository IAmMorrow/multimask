import { constants } from "buffer";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background got a message!")
    sendResponse({})
})

let websocket = null;

function onConnect() {
    if (!websocket) {
        throw new Error("connect error: already connected");
    }
    createWebSocketConnection("127.0.0.1:8084");
}

function onSend(message: string) {
    if (!websocket) {
        throw new Error("send error: already connected");
    }
    websocket.send(message);
}

chrome.extension.onRequest.addListener(
    async function(request, sender, sendResponse) {
        switch (request.method) {
            case "connect":
                onConnect();
            case "send":
                onSend(request.params)
                break;
            default:
                break;
        }
    }
);

function createWebSocketConnection(host) {

    if('WebSocket' in window) {
        websocket = new WebSocket(host);

        websocket.onopen = function() {

        };

        websocket.onmessage = function (event) {
            var received_msg = JSON.parse(event.data);
            var notificationOptions = {
                type: "basic",
                title: received_msg.title,
                message: received_msg.message,
                iconUrl: "extension-icon.png"
            }
            chrome.notifications.create("", notificationOptions);
        };

        websocket.onclose = function() {
            alert("==== web socket closed ======");
        };
    }
}