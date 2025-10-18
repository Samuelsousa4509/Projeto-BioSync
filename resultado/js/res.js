document.addEventListener('DOMContentLoaded', function() {

    var co2resu = localStorage.getItem('resultadoco2');
    
    var co2 = parseInt(co2resu);

    document.getElementById('co2res').textContent = co2.toFixed(2)

    console.log(co2.innerHTML = co2 )
    
});

function mostrarResultado(co2) {
    
    elementonumero.textContent = co2.toLocaleString('pt-BR') + 'Kg co2'
}

