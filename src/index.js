import './style.css';
import './sketch';

document.body.appendChild(pageTitle());
document.body.appendChild(sketchContainer());

function pageTitle() {
    var elem = document.createElement('div');
    elem.classList.add('page-title');
    elem.innerHTML = 'Processing sketch';
    return elem;
}

function sketchContainer() {
    var elem = document.createElement('div');
    elem.setAttribute('id', 'sketch');
    elem.classList.add('sketch-container');
    return elem;
}