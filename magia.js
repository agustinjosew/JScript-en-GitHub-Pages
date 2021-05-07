function reqListener () {
    var obj = JSON.parse(this.responseText);
    consoleText(obj.frases, obj.id, obj.colores);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "textos.json");
oReq.send();

// function([string1, string2],objetivo id,[color1,color2])
function consoleText(frases, id, colores) {
  if (colores === undefined) colores = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var contarLetras = 1;
  var x = 1;
  var espera = false;
  var objetivo = document.getElementById(id)
  objetivo.setAttribute('style', 'color:' + colores[0])
  window.setInterval(function() {

    if (contarLetras === 0 && espera === false) {
      espera = true;
      objetivo.innerHTML = frases[0].substring(0, contarLetras)
      window.setTimeout(function() {
        var colorUsado = colores.shift();
        colores.push(colorUsado);
        var fraseUsada = frases.shift();
        frases.push(fraseUsada);
        x = 1;
        objetivo.setAttribute('style', 'color:' + colores[0])
        contarLetras += x;
        espera = false;
      }, 1000)
    } else if (contarLetras === frases[0].length + 1 && espera === false) {
      espera = true;
      window.setTimeout(function() {
        x = -1;
        contarLetras += x;
        espera = false;
      }, 1000)
    } else if (espera === false) {
      objetivo.innerHTML = frases[0].substring(0, contarLetras)
      contarLetras += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}