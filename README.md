# Auto-fill the address by the ZIP code.
- Built with **Vanilla JS**.
- Uses [ViaCEP](http://viacep.com.br) webservice.
- Works well when **state** and **city** is `<input>` or `<select>` (with or without ajax).

## How to use
First of all, include the .js file

```html
<script src="cepfill.js"></script>
```

Then call the script:

```javascript
var cep = new Cep("#form");
```

## Options
How to use:

```html
<script>
var options = {
  cepInput: '.js-cep',
  streetInput: ".js-street",
  complementInput: ".js-complement",
  neighborhoodInput: ".js-neighborhood",
  stateInput: ".js-state",
  cityInput: ".js-city",
  onError: function() {
    alert("That zip code doesn't exists!");
  },
}

var cep = new Cep("#form", options);
</script>
```

### Demo

http://codepen.io/ricardoruwer/full/ONaYBb/
