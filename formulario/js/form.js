//fatores de emissao de co2 por categoria
const fatores = {
    transporte: {
        gasolina: 0.19,
        etanol: 0.11,
        diesel: 0.16,
        moto_gasolina: 0.11,
        moto_etanol: 0.07,
        moto_diesel: 0.09
    },

    casa: {
        energia: 0.1,
        gas: 70
    },

    alimentacao: { //dividido por dietas e calculado o kg co2 por R$1 real gasto
        muitacarne: 0.8,
        poucacarne: 0.5,
        vegetariano: 0.3,
        vegano: 0.2,
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('question-co2');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const dados = coletardados();

        const res = calcularCO2(dados);

        alert(`Sua pegada de carbono é: ${res} kg CO₂ por ano`);

        localStorage.setItem('resultadoco2', res);
        localStorage.setItem('dadosuser', JSON.stringify(dados));
    });
}); //variaveis para pegar dados, salvar dados, fazer calculo,etc

function coletardados() {
    return {
        kmcarro: Number(document.getElementById('kmcarro').value) || 0,
        kmmoto: Number(document.getElementById('kmmoto').value) || 0,
        fuel: document.getElementById('fuel').value,

        kwhmes: Number(document.getElementById('kwhmes').value) || 0,
        botijoesmes: parseInt(document.getElementById('botijoesmes').value) || 0,


        gastofood: parseFloat(document.getElementById('foodmes').value) || 0,
        tipodieta: document.getElementById('tipodieta').value
    };
}

function calcularCO2(dados) {
    let total = 0;

    if (dados.kmcarro > 0) {
        const co2carro = dados.kmcarro * fatores.transporte[dados.combustivel] * 52;
        total += co2carro;
    }

    if (dados.kmmoto > 0) {
        const fatormoto = `moto_${dados.combustivel}`;
        const co2moto = dados.kmmoto * fatores.transporte[fatormoto] * 52
        total += co2moto;
    }

    const co2energia = dados.kwhmes * fatores.casa.energia * 12;
    total += co2energia;

    if (dados.botijoesmes > 0) {
        const co2gas = dados.botijoesmes * fatores.casa.gas * 12;
        total += co2gas;
    }

    const co2food = dados.gastofood * fatores.alimentacao[dados.tipodieta] * 12;
    total += co2food;


    //console.log(`O total do calculo é igual a: ${Math.round(total)}`);

    return Math.round(total);
}