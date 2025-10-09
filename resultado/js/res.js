document.addEventListener('DOMContentLoaded', function() {

    const resco2 = localStorage.getItem('resultadoco2');
    const dadosuser = localStorage.getItem('dadosuser');

    if (!resultadoco2) {
        alert('Faça o calculo primeiro!');
        location.href('/formulario/js/form.js');
        return;
    }

    const co2 = parseInt(resultadoco2);
    
    const dados = JSON.parse(dadosuser);
    
    mostrarResultado(co2);
    
    console.log('resultado:', co2, 'kg co2');
    console.log('Dados do usuario:', dados);
    
    if (co2) {
        document.querySelector("numero").textContent = `ola, ${co2}`
    }
});

function mostrarResultado(co2) {
    
    elementonumero.textContent = co2.toLocaleString('pt-BR') + 'Kg co2'
}