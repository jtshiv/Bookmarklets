javascript: if (!document.getElementById('jquery')) {
    var a = document.createElement('script');
    a.id = "jquery";
    a.setAttribute("type", "text/javascript");
    a.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.head.appendChild(a);
};