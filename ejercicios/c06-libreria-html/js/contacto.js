"use strict";
const form = document.querySelector("#formContacto");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }
    alert("Mensaje enviado correctamente.");
    form.reset();
    form.classList.remove("was-validated");
});
