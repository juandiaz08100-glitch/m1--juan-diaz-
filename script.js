document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("generar");
    const guardar = document.getElementById("guardar");
    const cantidad = document.getElementById("cantidad");
    const formato = document.getElementById("formato");

    const paleta = document.createElement("div");
    paleta.classList.add("paleta");
    document.body.appendChild(paleta);

    const tituloGuardadas = document.createElement("h2");
    tituloGuardadas.textContent = "Paletas Guardadas";
    tituloGuardadas.style.textAlign = "center";
    tituloGuardadas.style.margin = "40px 0 20px";
    document.body.appendChild(tituloGuardadas);

    const guardadas = document.createElement("div");
    guardadas.classList.add("guardadas");
    document.body.appendChild(guardadas);
    if(localStorage.getItem("paletas")){
    guardadas.innerHTML = localStorage.getItem("paletas");
}
    const toast = document.createElement("div");
     toast.classList.add("toast");
     document.body.appendChild(toast);

function mostrarToast(mensaje){

    toast.textContent = mensaje;
    toast.classList.add("activo");

    setTimeout(() => {
        toast.classList.remove("activo");
    }, 2000);
}

    let coloresActuales = [];

    function generarHex() {
        const letras = "0123456789ABCDEF";
        let color = "#";

        for(let i = 0; i < 6; i++){
            color += letras[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    
    function generarHSL() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 100);
        const l = Math.floor(Math.random() * 100);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    function generarPaleta() {

        paleta.innerHTML = "";
        coloresActuales = [];

        const total = cantidad.value;
        const tipo = formato.value;

        for(let i = 0; i < total; i++){

            let color;

            if(tipo === "hex"){
                color = generarHex();
            } else {
                color = generarHSL();
            }

            coloresActuales.push(color);

            const caja = document.createElement("div");
            caja.classList.add("color");

            caja.style.background = color;
            caja.textContent = color;
            caja.addEventListener("click", () => {

            navigator.clipboard.writeText(color);

            mostrarToast(`Color copiado: ${color}`);
         });
            paleta.appendChild(caja);
        }
    }

    function guardarPaleta(){

        const miniPaleta = document.createElement("div");
        miniPaleta.classList.add("mini-paleta");

        coloresActuales.forEach(color => {

            const miniColor = document.createElement("div");
            miniColor.classList.add("mini-color");

            miniColor.style.background = color;
            miniColor.title = color;

            miniPaleta.appendChild(miniColor);
        });

        guardadas.appendChild(miniPaleta);
        localStorage.setItem("paletas", guardadas.innerHTML);
        mostrarToast("Paleta guardada");
    }

    boton.addEventListener("click", generarPaleta);
    guardar.addEventListener("click", guardarPaleta);

    generarPaleta();

});


