<br />
<p align="center">
    <a href="https://github.com/othneildrew/Best-README-Template">
        <img src="src/images/document-logo.png" alt="Logo" width="300" height="300">
    </a>
  <h3 align="center">Projeto Front-End MindMiners</h3>

  <p align="center">
    O IRCalc é uma calculadora de Imposto de Renda sobre operações de compra e venda na Bolsa de Valores.
    <br />
    <br />
    <a href="https://github.com/isaacguerreiro/mindminers-project/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/isaacguerreiro/mindminers-project/issues">Requerir Feature</a>
  </p>
</p>




## Índice

* [Sobre o projeto](#sobre-o-projeto)
  * [Tecnologias](#tecnologias)
* [Começando](#começando)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [Licença](#licença)
* [Contato](#contato)



## Sobre o projeto

O projeto da MindMiners é uma aplicação front-end que tem como principal funcionalidade calcular o Imposto de Renda sobre operações de compra e venda na Bolsa de Valores.

Além do cálculo foram adicionados ao projeto:
* Gráfico com informações de Lucro, Prejuízo, Imposto de Renda e Total Líquido das operações dividas por mês.
* Tabela com valores de imposto de renda calculado por operação.
* Possibilidade de exportar tabelas na forma de arquivo csv.
* Gráfico com o valor investido em reais (R$) em cada ação operada da Bolsa de Valores.


### Tecnologias
Para se enquadrar dentro dos padrões de qualidade exigidos pela MindMiners foram utilizadas tecnologias recentes para a construção da aplicação.
* [Gatsby](https://www.gatsbyjs.org/)
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)
* [Highcharts](https://www.highcharts.com/)




## Começando

Para inicializar a aplicação é necessário alguns prerequisitos. Para subir localmente basta seguir alguns passos simples.

### Pré-requisitos

Para facilitar a inicialização o projeto foi utilizado Docker, uma tecnologia de abstração e virtualização de ambientes para software. Se você quiser saber se já tem docker e docker-compose instalados localmente basta rodar:

* docker
```sh
docker -v
```
* docker-compose
```sh
docker-compose -v
```
Caso um ou ambos não estejam instalados basta rodar um arquivo sh criado especialmente pra instalação das duas ferramentas. Para isso execute:

```sh
sudo bash install-docker.sh
```

### Instalação

1. Execute o comando
```sh
sudo docker-compose up --build
```
2. Assim que o container estiver rodando, acesse o link: <a href="localhost:3000">https://localhost:3000</a>

3. Após a primeira execução, basta usar o comando
```sh
sudo docker-compose up
```


## Licença

Distribuido sobre o MIT License. Veja o arquivo `LICENSE` para mais informações.




## Contato

Isaac Guerreiro - isaacguerreirocom@gmail.com

Link do projeto: [https://github.com/isaacguerreir/mindminers-project](https://github.com/isaacguerreir/mindminers-project)
