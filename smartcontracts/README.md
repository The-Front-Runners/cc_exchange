
# CC Exchange 

## Visão Geral
Este projeto consiste em um dApp (aplicativo descentralizado) voltado para a manipulação de tokens de crédito de carbono. Ele é construído sobre a rede Optimism, uma solução de escalabilidade de camada 2 para Ethereum, que oferece transações mais rápidas e custos reduzidos. O contrato do token segue o padrão ERC20, e o EmissionValidator permite que empresas submetam suas validações para uma instituição validadora e reivindiquem seus tokens após a aprovação.

## Pré-requisitos
- Node.js
- Foundry

## Instalação
1. Clone o repositório:

```sh
git clone https://github.com/The-Front-Runners/cc_exchange.git
cd seu-repositorio
```

2. Compile os contratos:

```sh
forge build
```

## Testando
Para executar os testes unitários, utilize o seguinte comando:

```sh
forge test
```

Para testar a interação completa do EmissionValidator, você pode usar o seguinte teste end-to-end:

```sh
forge test -vv --match-contract EmissionValidatorTest
```

## Deploy
Para fazer o deploy dos contratos tanto localmente (usando Anvil) quanto na testnet da Optimism, siga os passos abaixo:

1. Inicie o Anvil:

```sh
anvil
```
2. Em um novo terminal, faça o deploy do contrato de créditos de carbono localmente:

```sh
./deploy-cc-on-local.sh
```

3. Em outro terminal, faça o deploy do contrato EmissionValidator localmente:

```sh
./deploy-ev-on-local.sh
```

Para o deploy na testnet da Optimism, configure o arquivo .env com sua chave privada e endpoint da RPC da Optimism, e então execute:

```sh
./deploy-cc-on-testnet.sh
```

```sh
./deploy-ev-on-testnet.sh
```
Não se esqueça de atualizar o .env conforme o .env.example.

## Uso (IMPORTANTE)
Após o deploy, você pode interagir com os contratos por meio de scripts ou diretamente em um console web3. Aqui está um exemplo de como uma empresa pode submeter uma validação e reivindicar tokens:

1. A empresa submete um pedido de validação:

```sh
ev.submitRequest("jsonHash");
```
2. O validador aprova o pedido:

```sh
ev.validateRequest(0, 1, 1000 ether);
```
arg1: índice do pedido
arg2: 1 para aprovar, 2 para rejeitar
arg3: quantidade de tokens a serem disponibilizados

3. A empresa reivindica seus tokens:

```sh
ev.claimTokens(0);
```

**IMPORTANTE** 

Lembre-se que este é o fluxo corrente, caso esteja fazendo deploy do zero, o owner deve adicionar a empresa como um validador antes de submeter um pedido de validação. Essa ação pode ser feita através da função *addValidator* do contrato EmissionValidator.

Além disso, o contrato EmissionValidator precisa receber tokens de carbono, que devem ser providenciados pelo owner do contrato através da função *fundWithCarbonCredits*. 

Não se esqueça de que os tokens $CC devem ser aprovados pelo owner antes de chamar a função *fundWithCarbonCredits*.

## Contribuindo
Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.


## Licença
MIT