# Auth Users

A estrutura está de acordo com os princípios da arquitetura limpa (Clean Architecture) e do Domain-Driven Design (DDD).

A pasta "infra" é responsável por abrigar a infraestrutura do sistema, incluindo a conexão com o banco de dados e os repositórios que lidam com a persistência dos dados. A pasta "interface" contém as interfaces do sistema, como os controladores da camada HTTP e os esquemas de validação. A pasta "middlewares" é onde são armazenados os middlewares do sistema, e a pasta "routes" abriga as rotas do sistema. O arquivo "index.js" é o ponto de entrada da aplicação.

Essa estrutura segue a separação de responsabilidades de forma clara, onde as camadas de baixo nível não dependem das camadas de nível mais alto, e as camadas de nível mais alto não conhecem os detalhes da implementação das camadas de baixo nível. Além disso, é possível aplicar conceitos de DDD, como a definição de domínios e regras de negócio em cada camada.

O Docker está sendo executado na porta 3000.

A aplicação pode ser executado na porta 3001.# Pokedex
