# Auto-fill the address by the ZIP code.
- Built with **Vanilla JS**.
- Uses [ViaCEP](http://viacep.com.br) webservice.
- Works well when **state** and **city** is `<input>` or `<select>` (with or without ajax).

## How to use

Create your form:

```html
<form id="form">
  <input type="text" class="js-cep" placeholder="CEP">
  <input type="text" class="js-street" placeholder="Logradouro">
  <input type="text" class="js-complement" placeholder="Complemento">
  <input type="text" class="js-neighborhood" placeholder="Bairro">
  <input type="text" class="js-state" placeholder="Estado">
  <input type="text" class="js-city" placeholder="Cidade">
</form>
```

Include the .js file:

```html
<script src="cepfill.js"></script>
```

Call the script:

```html
<script>
  var cep = new Cep("#form");
</script>
```

## Options

How to use:

```javascript
//My Personal Options
var options = {
  cepInput:           ".js-cep", //default
  streetInput:        ".js-street", //default
  complementInput:    ".js-complement", //default
  neighborhoodInput:  ".js-neighborhood", //default
  stateInput:         ".js-state", //default
  cityInput:          ".js-city", //default
  onError: function() {
    alert("That zip code doesn't exists!");
  },
  onSuccess: function() {
    console.log("Zip code found!");
  }
}

//Call the Script
var cep = new Cep("#form", options);
```

## Demo

<a href="http://codepen.io/ricardoruwer/full/ONaYBb/" target="_blank">codepen.io/ricardoruwer/full/ONaYBb</a>
