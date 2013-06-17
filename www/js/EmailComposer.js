// window.plugins.emailComposer

function EmailComposer() {
this.resultCallback = null; // Function
}

EmailComposer.ComposeResultType = {
    Cancelled:0,
    Saved:1,
    Sent:2,
    Failed:3,
    NotSent:4
}



// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML,attachments) {
console.log("****************************AVVIATO");
var args = {};
if(toRecipients)
args.toRecipients = toRecipients;
if(ccRecipients)
args.ccRecipients = ccRecipients;
if(bccRecipients)
args.bccRecipients = bccRecipients;
if(subject)
args.subject = subject;
if(body)
args.body = body;
if(bIsHTML)
args.bIsHTML = bIsHTML;
    if(attachments)
        args.attachments = attachments;

cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

EmailComposer.prototype.showEmailComposerWithCallback = function(callback, subject, body, toRecipients, ccRecipients, bccRecipients, isHTML, attachments) {
this.resultCallback = callback;
this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,isHTML,attachments]);
}

EmailComposer.prototype._didFinishWithResult = function(res) {

    var message;
    
    if(res == 0){  //Cancelled
        message = "Email cancelled";
    }
    else if(res == 1){  //Saved
        message = "Email saved to drafts";
    }
    else if(res == 2){ // Sent
        message = "Email Sent";
    }
    else if(res == 3){  //Failed
        message = "Email failed to send";
    }
    else if(res == 4){ // Not Sent
        message = "Email not sent";
    }
    
//    alert(message);
    navigator.notification.alert(message);
    
    
    
this.resultCallback(res);
}

cordova.addConstructor(function() {
console.log("****************************");
if(!window.plugins)
{
window.plugins = {};
}

// shim to work in 1.5 and 1.6
if (!window.Cordova) {
window.Cordova = cordova;
};

window.plugins.emailComposer = new EmailComposer();
});