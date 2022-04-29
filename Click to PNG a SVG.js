javascript: (function(global) {
    var document = global.document,
        body = document.body,
        forEach = Array.prototype.forEach,
        styles = document.querySelectorAll("style");
    var snackbar = document.createElement('div');
    snackbar.id = "snackbar";
    snackbar.innerText = "Copy";
    if (!document.getElementById("snackbar")) document.body.appendChild(snackbar);
    if (document.getElementById("snackbar")) snackbar = document.getElementById("snackbar");
    var style = document.createElement('style');
    style.id = "style";
    style.innerHTML = `#snackbar {    visibility: hidden; /* Hidden by default. Visible on click */    min-width: 250px; /* Set a default minimum width */    margin-left: -125px; /* Divide value of min-width by 2 */    background-color: #333; /* Black background color */    color: #fff; /* White text color */    text-align: center; /* Centered text */    border-radius: 2px; /* Rounded borders */    padding: 16px; /* Padding */    position: fixed; /* Sit on top of the screen */    z-index: 1; /* Add a z-index if needed */    left: 50%; /* Center the snackbar */    bottom: 30px; /* 30px from the bottom */}/* Show the snackbar when clicking on a button (class added with JavaScript) */#snackbar.show {    visibility: visible; /* Show the snackbar */    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.    However, delay the fade out process for 2.5 seconds */   -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;   animation: fadein 0.5s, fadeout 0.5s 2.5s;}/* Animations to fade the snackbar in and out */@-webkit-keyframes fadein {    from {bottom: 0; opacity: 0;}     to {bottom: 30px; opacity: 1;}}@keyframes fadein {    from {bottom: 0; opacity: 0;}    to {bottom: 30px; opacity: 1;}}@-webkit-keyframes fadeout {    from {bottom: 30px; opacity: 1;}     to {bottom: 0; opacity: 0;}}@keyframes fadeout {    from {bottom: 30px; opacity: 1;}    to {bottom: 0; opacity: 0;}}`;
    if (!document.getElementById('style')) document.head.appendChild(style);
    forEach.call(document.querySelectorAll("svg"), function(svg) {
        if (svg.namespaceURI !== "http://www.w3.org/2000/svg") return;
        if (svg.ownerSVGElement) return;
        forEach.call(styles, function(style) {
            svg.appendChild(style.cloneNode(true));
        });
        svg.onclick = function(elem) {
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d"),
                image = new Image,
                ratio = global.devicePixelRatio || 1,
                rect = svg.getBoundingClientRect(),
                width = rect.width * ratio,
                height = rect.height * ratio,
                imageUrl = URL.createObjectURL(new Blob([(new XMLSerializer).serializeToString(svg)], {
                    type: "image/svg+xml"
                }));
            image.onload = function() {
                setTimeout(function() {
                    context.drawImage(image, 0, 0, width, height);
                    canvas.toBlob(function(blob) {
                        var a = document.createElement("a"),
                            aUrl = URL.createObjectURL(blob); /*a.download = "untitled.png";          a.href = aUrl;*/
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function() {
                            var base64data = reader.result; /*console.log(base64data);*/
                            var snackbar = document.getElementById("snackbar");
                            snackbar.onclick = function() {
                                document.execCommand("copy");
                            };
                            snackbar.addEventListener("copy", function(event) {
                                event.preventDefault();
                                if (event.clipboardData) {
                                    snackbar.innerText = "Copied";
                                    event.clipboardData.setData("text/plain", base64data);
                                    console.log(event.clipboardData.getData("text"));
                                    setTimeout(function() {
                                        snackbar.className = snackbar.className.replace("show", "");
                                    }, 3000);
                                };
                            });
                            snackbar.innerText = "Copy";
                            snackbar.className = "show";
                            setTimeout(function() {
                                snackbar.className = snackbar.className.replace("show", "");
                            }, 30000);
                        };
                        body.appendChild(a);
                        setTimeout(function() {
                            a.click();
                            aUrl = URL.revokeObjectURL(aUrl);
                            imageUrl = URL.revokeObjectURL(imageUrl);
                            body.removeChild(a);
                        }, 10);
                    });
                }, 10);
            };
            canvas.width = width;
            canvas.height = height;
            image.src = imageUrl;
        };
    });
})(this);