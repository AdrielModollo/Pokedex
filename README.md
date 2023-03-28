# DDD

A estrutura está de acordo com os princípios da arquitetura limpa (Clean Architecture) e do Domain-Driven Design (DDD).

A pasta "domain" é responsável por gerenciar o serviços, onde é concentrado toda regra de negócio. A pasta "infra" é responsável por abrigar a infraestrutura do sistema, incluindo a conexão com o banco de dados e os repositórios que lidam com a persistência dos dados. A pasta "interface" contém as interfaces do sistema, como os controladores da camada HTTP e os esquemas de validação. A pasta "middlewares" é onde são armazenados os middlewares do sistema, e a pasta "routes" abriga as rotas do sistema. O arquivo "index.js" é o ponto de entrada da aplicação.

Essa estrutura segue a separação de responsabilidades de forma clara, onde as camadas de baixo nível não dependem das camadas de nível mais alto, e as camadas de nível mais alto não conhecem os detalhes da implementação das camadas de baixo nível. Além disso, é possível aplicar conceitos de DDD, como a definição de domínios e regras de negócio em cada camada.

# Utilizando o git

1. Clone o repositório e entre na pasta
- `git clone https://github.com/AdrielModollo/Pokedex`
- `cd pokedex`

2. Certifique-se de que possui o Node instalado, e o postgres está configurado de acordo.(Caso for utilizar o docker não necessário!)

3. Instale as dependências
- `npm i`

4. Caso queirar adicionar uma nova feature ou deseja consertar um bug, crie uma branch a partir da `main`
- Examplo: `git checkout -b feat-error-middleware`

5. Faça o commit e envie ao repositório remoto
- `git add .`
- `git commit -am "Colocar um comentário fácil e objetivo para ser encontrado rapidamente."`
- `git push origin {nome-da-branch}`

# Iniciando o projeto

1. npm install

2. docker compose up --build ou npm run docker

3. crie um .env e configure seus acessos

4. npm start

Obs: Caso for utilizar com docker não é necessário iniciar a aplicação, apenas utilze a porta "3000" que já está configurada para o docker!

# Rotas configuradas na api

## USERS

    POST: localhost:PORTA/authenticate/register
    POST: localhost:PORTA/authenticate/login
    GET: localhost:PORTA/users/
    PUT: localhost:PORTA/users/:id
    DEL: localhost:PORTA/users/:id

## POKEDEX
    GET: localhost:PORTA/pokemon
    GET: localhost:PORTA/pokemon/:id
    GET: localhost:PORTA/pokemon/name/:name
    GET: localhost:PORTA/pokemon/types/?type1=&type2=


# Users

Você pode criar, atualizar, buscar ou até mesmo deletar os usuários criados na base. Para registrar ou logar com um usuário na base é necessário informar um JWT que será informado no .env. Com o campo "JWT_KEY" preenchido no .env informe no "Headers" em "Key" | Authorization com o valor estabelecido.

# Auth

Em todas as rotas é necessário uma autenticação, utilize a rota: localhost:PORTA/authenticate/login. Recupere o token
gerado e informe em "Headers" > "Key" | Authorization > "Value" | Bearer Token.

# Pokedex

Você filtrar todos os pokemons, e utilizar filtros específicos como por nome, id da pokedex, e tipo!

# Teste unitários

Testes unitários mockados utilizando Jest em Node.js, utilizado a técnica de substituir as dependências do módulo por funções mockadas que simulam o comportamento das mesmas. Isso nos permite isolar as funções que queremos testar e garantir que elas funcionam corretamente, sem depender de outros módulos externos.



