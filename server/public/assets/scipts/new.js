var modal1 = document.getElementById('modal-main');
var mask = document.getElementById('modal-mask');
// Get the <span> element that closes the modal
var span = document.getElementById('close-modal');
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal1.style.display = 'none';
	mask.style.display = 'none';
};
console.log(document.getElementsByClassName('yearbook-quote')[0].innerHTML);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == mask) {
		modal1.style.display = 'none';
		mask.style.display = 'none';
	}
};

document.getElementById('quote-submit').onsubmit = function () {
	modal1.style.display = 'none';
	mask.style.display = 'none';
}


function uploadModal() {
	modal1.style.display = 'flex';
	mask.style.display = 'flex';
}

uploadModal();