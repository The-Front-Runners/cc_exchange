## Interface do dApp CC Exchange

Esta interface é responsável para a interação do usuário com o dApp CC Exchange. A interface é composta por 4 telas principais: 

1. Dashboard: Tela inicial do dApp, onde o usuário pode visualizar o saldo de $CC, o nível da pegada de carbono em seu país, o balanço geral de carbono (consumidos, produzidos e saldo) e informações sobre como você pode neutralizar o carbono da empresa destino.

2. Transacionar $CC: Tela onde o usuário pode comprar $CC. O usuário pode escolher a quantidade de $CC que deseja comprar através de um widget para a dex da uniswap.

3. Contratos de Carbono: Tela onde o usuário pode visualizar os contratos de carbono que ele possui. O usuário pode visualizar o status de cada solicitação. Cada solicitação depende de um validador registrado para ser aprovada. Ao ser aprovada, o card do contrato de carbono é atualizado com o status de aprovado, possibilitando a empresa que fez a requisição coletar seus tokens de carbono.

4. Submissão de requisições: Tela onde o usuário pode submeter uma requisição de contrato de carbono. O usuário deve escolher um dos validadores registrados, nomear a requisição e submeter um link para o documento de validação. A requisição é enviada para um validador registrado, que pode aprovar ou rejeitar a requisição.

## Como rodar o projeto
```bash
## Instale as dependências
npm install
 
## Em um terminal separado, rode o servidor local do projeto
anvil

## Em um segundo terminal, faça deploy dos contratos na rede local
cd ../smartcontracts 
./deploy-cc-on-local.sh
./deploy-ev-on-local.sh

## Rode o projeto
npm run dev
```

## Rodar projeto completo com docker
```bash
docker-compose up
```


