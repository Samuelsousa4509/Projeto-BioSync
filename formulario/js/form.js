//fatores de emissao de co2 por categoria
const fatores = {
    transporte: {
        car_gasolina: 0.19,
        car_etanol: 0.11,
        car_diesel: 0.16,
        moto_gasolina: 0.11,
        moto_etanol: 0.07,
        moto_diesel: 0.09
    },

    casa: {
        energia: 0.1,
        gas: 70
    },

    alimentaçao: { //dividido por dietas e calculado o kg co2 por R$1 real gasto
        muitacarne: 0.8,
        poucacarne: 0.5,
        vegetariano: 0.3,
        vegano: 0.2,
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('question-co2');

    document.addEventListener('submit', function (event) {
        event.preventDefault();

        const dados = coletardados();

        const resultado = calculoco2(dados);

        alert(`Sua pegada de carbono é: ${resultado} kg CO² por ano`);

        localStorage.setItem('resultadoco2', resultado);
        localStorage.setItem('dadosuser', JSON.stringify(dados));
    });
}); //variaveis para pegar dados, salvar dados, fazer calculo,etc

function coletardados() {
    return {
        kmcarro: parseFloat(document.getElementById('kmcarro').value) || 0,
        kmmoto: parseFloat(document.getElementById('kmmoto').value) || 0,


        kwhmes: parseFloat(document.getElementById('kwhmes').value) || 0,
        botijoesmes: parseFloat(document.getElementById('botijoesmes').value) || 0,


        gastofood: parseFloat(document.getElementById('foodmes').value) || 0,
        tipodieta: document.getElementById('tipodieta').value
    };
}

function calcularco2(dados) {
    let total = 0;

    if (dados.kmcarro > 0) {
        const c02carro = dados.kmcarro * fatores.transporte[dados.combustivel] * 52;
        total += co2carro;
    }

    if (dados.kmmoto > 0) {
        const fatormoto = `moto_${dados.combustivel}`;
        const co2moto = dados.kmmoto * fatores.transporte[fatormoto] * 52
        total += c02moto;
    }

    const co2energia = dados.kwhmes * fatores.casa.energia * 12;
    total += co2energia;

    if (dados.botijoesmes > 0) {
        const co2gas = dados.botijoesmes * fatores.energia.gas * 12;
        total += co2gas;
    }

    const co2food = dados.gastofood * fatores.alimentaçao[dados.tipodieta] * 12;
    total += co2food;


    console.log(`O total do calculo é igual a: ${Math.round(total)}`);

}