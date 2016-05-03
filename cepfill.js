!(function() {
    this.Cep = function() {
        //Default options
        var defaults = {
            cepInput: '.js-cep',
            streetInput: ".js-street",
            complementInput: ".js-complement",
            neighborhoodInput: ".js-neighborhood",
            stateInput: ".js-state",
            cityInput: ".js-city",
            onError: null,
        }

        //Initialize plugin
        this.options = defaults;
        this.arguments = arguments;
        this.init();
    }


    //Initialize Plugin
    Cep.prototype.init = function() {
        //Form argument (default: <form>)
        if (typeof this.arguments[0] === "undefined") {
            this.arguments[0] = "form";
        }

        //Get the user personal options
        if (this.arguments[1] && typeof this.arguments[1] === "object") {
            this.options = extendDefaults(this.options, this.arguments[1]);
        }

        //Get the selected form
        this.el = document.querySelectorAll(this.arguments[0])[0];

        //Initialize input event
        var self = this;
        var cepInput = this.el.querySelectorAll(this.options.cepInput)[0];
        cepInput.addEventListener("input", function(event) {
            self.get(event);
        });
    }


    //Get data from VIACEP.com.br
    Cep.prototype.get = function(event) {
        var cep = event.srcElement.value.replace(/\D/g, "");
        if (cep.length != 8) {
            return false;
        }

        var url = "https://viacep.com.br/ws/" + cep + "/json/";
        var self = this;

        //Json Http Request
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = JSON.parse(xmlhttp.responseText);

                if (response.erro === true) {
                    self.onError();
                    return false;
                }

                self.response = response;
                self.fillInputs();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }


    //Fill inputs with returned data
    Cep.prototype.fillInputs = function() {
        //Inputs
        var streetInput = this.el.querySelectorAll(this.options.streetInput)[0];
        var complementInput = this.el.querySelectorAll(this.options.complementInput)[0];
        var neighborhoodInput = this.el.querySelectorAll(this.options.neighborhoodInput)[0];
        var stateInput = this.el.querySelectorAll(this.options.stateInput)[0];
        var cityInput = this.el.querySelectorAll(this.options.cityInput)[0];

        //Fill inputs
        streetInput.value = this.response.logradouro;
        complementInput.value = this.response.complemento;
        neighborhoodInput.value = this.response.bairro;
        stateInput.value = this.response.uf;

        if (cityInput.tagName == "SELECT") {
            this.fillCitiesForSelect();
        }
        else { // "INPUT"
            cityInput.value = this.response.localidade;
        }
    }


    //Fill cities for <SELECT> (with Ajax)
    Cep.prototype.fillCitiesForSelect = function() {
        var stateInput = this.el.querySelectorAll(this.options.stateInput)[0];
        var cityInput = this.el.querySelectorAll(this.options.cityInput)[0];

        //Trigger "change" event on State Input
        stateInput.dispatchEvent(new CustomEvent("change"));

        //Check if the Cities are filled
        var condition = function() {
            options = cityInput.childNodes.length;
            check(options > 1);
        }

        var self = this;
        var check = function(filled) {
            if (filled) {
                for (var i = 0; i < cityInput.childNodes.length; i++) {
                    if (cityInput.childNodes[i].text == self.response.localidade) {
                        cityInput.selectedIndex = i;
                        break;
                    }
                }
            }
            else {
                setTimeout(function() {
                    condition();
                }, 100);
            }
        }

        condition();
    }


    //When the Cep is not found
    Cep.prototype.onError = function() {
        if (typeof this.options.onError === "function") {
            this.options.onError();
        }
        else {
            var cepInput = this.el.querySelectorAll(this.options.cepInput)[0];
            cepInput.style.border = "1px solid crimson";
            cepInput.style.backgroundColor = "mistyrose";
        }
    }


    //Extend Defaults with User Options
    function extendDefaults(source, properties) {
        var property;

        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());
