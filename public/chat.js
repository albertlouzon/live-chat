window.onload = function() {
    
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var errorMsg = document.getElementById("wrongInput")
    var html = '';
    content.innerHTML = html;
    content.scrollTop = content.scrollHeight;

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += "<div class='messagesContainer'>" + "<b class='authors'>" + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html +=  "<span class='messages'>" + messages[i].message  + "</span>"+ "</div>" + '<br /><br />';
                
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            errorMsg.innerHTML = 'Tell us who you are !' ;
        } else {
            var text = field.value;
            var author = name.value;
            socket.emit('send', { message: text, username: author});
            errorMsg.innerHTML = '' ;
            field.value = "";
        }
    };

 
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    
    });

}

