var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];

// create alphabet ul
var buttons = function () {
  var myButtons = document.getElementById('buttons');
  var letters = document.createElement('ul');

  for (var i = 0; i < this.alphabet.length; i++) {
    letters.id = 'alphabet';
    var list = document.createElement('li');
    list.id = alphabet[i];
    list.setAttribute("class", "alphabet");
    list.innerHTML = alphabet[i];
    myButtons.appendChild(letters);
    letters.appendChild(list);
  }
};

buttons();