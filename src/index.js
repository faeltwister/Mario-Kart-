// CRIAR OS OBJETOS DOS PLAYERS E PONTOS
const player1 = {
    NOME : "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER : 3,
    PONTOS: 0,
};

const player2 = {
    NOME : "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER : 4,
    PONTOS: 0,
};



//rolagem do dado -> tem que ser asyncrono

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1 ;
}

//mapa
async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "Reta";
            break;
        case random < 0.66:
            result = "Curva";
            break;

        default:
            result = "Confronto";
            break;
    }

    return result;
}

async function logRollResult(characterName,block, diceResult, attrib){
    console.log(`Arena de ${block} - ${characterName} 🎲 rolou um dado de ${diceResult} + ${attrib} = ${diceResult + attrib}`);
}

async function playRaceEngine(character1, character2){
    for (let round = 1; round <=5; round++) {
        console.log(`🏁 Rodada: ${round}`);

        // sortear bloco -- esperando o resultado da função
        let block = await getRandomBlock();
        console.log(`O bloco escolhido foi: ${block}`);

        // rolar os dados

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade

        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if (block === "Reta") {
            TotalTestSkill1 = diceResult1 + character1.VELOCIDADE
            TotalTestSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(player1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(player2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE);

           
        
        }
        
        if (block === "Curva") {
            TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            
            await logRollResult(player1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(player2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if (block === "Confronto") {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} confrontou ${character2.NOME}`)
            await logRollResult(player1.NOME, "Poder", diceResult1, character1.PODER);
            await logRollResult(player2.NOME, "Poder", diceResult2, character2.PODER);
            
            //if ternário -> o valor do character1.pontos atual vai ser substituido diminuindo se poder for mais dq o 2 e se poder 2 for maior q 0 diminui1 ou 0

            //character1.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
            //character2.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;

            if(powerResult1 > powerResult2 && character2.PONTOS >0){
                console.log(`${character1.NOME} venceu o confronto com ${character2.NOME} 🐢`)
                console.log(`${character2.NOME} perdeu 1 ponto`)
                character2.PONTOS -- ;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto com ${character1.NOME} 🐢`)
                console.log(`${character1.NOME} venceu perdeu 1 ponto`)
                character1.PONTOS --;
            }
            
            
            console.log(powerResult1 === powerResult2 ? "Empate" : "");
        }

        if(TotalTestSkill1 > TotalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto.`)
            character1.PONTOS ++;
        }else if(TotalTestSkill2 > TotalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto.`)
            character2.PONTOS ++;
        }

        console.log("--------------------------");
    }

}

//declare winner

async function declareWinner(character1, character2){
    console.log("Resultado final..")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS)
        console.log(`\n ${character1.NOME} venceu a corrida! 🏆`);
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n ${character2.NOME} venceu a corrida! 🏆`)
    else
        console.log(`\n Empate!`);
    
}


//função autoinvocada

(async function main(){
    // função pra chamar as outras funções
    console.log(`🚨 A Corrida é entre ${player1.NOME} e ${player2.NOME}. \n🏁  Começando... \n`);
    await playRaceEngine(player1, player2) //aguarda a função ser executada primeiro
    await declareWinner(player1, player2) // aguarda pra ver quem ganhou
})();

