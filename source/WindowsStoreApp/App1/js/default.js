// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var socket = io.connect('http://build345453.azurewebsites.net/');
    socket.on('news', function (data) {

        var li = document.createElement("li");
        li.textContent = escape(data);

        var messages = document.getElementById("messages");
        messages.appendChild(li);
    });

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

app.onready = function (args) {
        var send = document.getElementById('snd');
        send.addEventListener('click', function () {
            var txt = document.getElementById('message');
            var msg = txt.value;
            socket.emit('message', msg);

            var li = document.createElement("li");
            li.textContent = msg;
            txt.value = '';
            var messages = document.getElementById("messages");
            messages.appendChild(li);
        });
    };

    app.start();
})();
