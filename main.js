// Basing modals off this:
// https://www.w3schools.com/howto/howto_css_modals.asp

var createNodes = function(type,id,innerHTML,loc){
    if (document.getElementById(id)){
        document.getElementById(id).remove();
    }
    var elem = document.createElement(type);
    elem.id=id;
    elem.innerHTML=innerHTML;
    loc.appendChild(elem);
    return elem;
}

// Create the CSS
var style=`/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}`
style = createNodes("style","mainstyle",style,document.head);


// Create the modal
var modal =
    `<div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
    </div>`;
modal = createNodes("div","myModal",modal,document.body);
modal.classList.add('modal');

// Show and add listener to close on x
modal.style.display = "block";
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
  }

