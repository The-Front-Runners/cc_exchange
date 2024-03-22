
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

2. Instale as dependências:

```sh
npm install
```

3. Compile os contratos:

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
2. Em um novo terminal, faça o deploy localmente:

```sh
forge script script/Deploy.s.sol:DeployLocal --fork-url http://localhost:8545 --private-key sua-chave-privada --broadcast
```

Para o deploy na testnet da Optimism, configure o arquivo .env com sua chave privada e endpoint da RPC da Optimism, e então execute:

```sh
forge script script/Deploy.s.sol:DeployOptimismTestnet --rpc-url https://optimism-kovan.infura.io/v3/sua-infura-id --private-key sua-chave-privada --broadcast
```

## Uso
Após o deploy, você pode interagir com os contratos por meio de scripts ou diretamente em um console web3. Aqui está um exemplo de como uma empresa pode submeter uma validação e reivindicar tokens:

1. A empresa submete um pedido de validação:

```sh
ev.submitRequest("jsonHash", { from: COMPANY_ADDRESS });
```
2. O validador aprova o pedido:

```sh
ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether, { from: VALIDATOR_ADDRESS });
```
3. A empresa reivindica seus tokens:

```sh
ev.claimTokens(0, { from: COMPANY_ADDRESS });
```

## Contribuindo
Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.


## Licença
MIT