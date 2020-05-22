const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .withAutomaticReconnect()
    .build();

connection.start().catch(err => console.log(err));

connection.on("ReceiveMessage", (user, message) => {
    const encodeMsg = `${user} says ${message}`;
    const li = document.createElement("li");
    li.textContent = encodeMsg;
    document.getElementById("messagesList").appendChild(li);
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("user").value;
    var message = document.getElementById("message").value;
    connection.invoke("SendMessage", user, message).catch(function (err){
        return console.error(err.toString());
    });
    event.preventDefault();
});