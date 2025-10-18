document.addEventListener('DOMContentLoaded', function() {
    
    var co2resu = localStorage.getItem('resultadoco2');
    
    if(!co2resu) {
        alert('Nenhum resultado encontrado! Faça o calculo primeiro.');
        location.href = '/formulario/form.html';
        return;
    }

    var co2 = parseInt(co2resu);
    
    document.getElementById('co2res').textContent = co2.toFixed(2);

    document.getElementById('co2res').textContent = co2.toLocaleString('pt-BR') + ' kg co2 ';

    var classify = document.getElementById('classificacao');
    
    if (co2 < 2000) {
        classify.textContent = 'Classificação: BAIXA!';
        classify.style.color = '#4CAF50';
    } else if (co2 < 5000) {
        classify.textContent = 'Classificação: MÉDIA!';
        classify.style.color = '#FFB300';
    } else {
        classify.textContent = 'Classificação: ALTÌSSIMA!';
        classify.style.color = '#F44336';
    }
    
    console.log('result loaded:', co2);
});