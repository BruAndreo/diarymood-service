# Diary Mood Service

API para registro de humor(mood) diário.

*Aplicação para uso pessoal*

## Motivação

O projeto foi criado com o intuido de facilitar o registro de humor de uma pessoa.
Neste caso em especifico, foi feita essa API para receber, validar e inserir os dados em um banco de dados

Qualquer pessoa pode realizar o pull do projeto e utilizar para uso pessoal.

## Instalação

Como pré requisito, será necessário instalar os seguintes softwares e versões para conseguir rodar o projeto localmente:
  - NodeJS >= 18.x
  - NPM
  - Docker
  - Docker Compose

### Configurações de Ambiente

Primeiramente, duplique e renomeie os arquivos `.env`

```SHELL
CP .database.env.sample .database.env
CP .env.sample .env
```

Abra o aquivo `.database.env` e preencha as configurações relacionadas ao docker do MongoDB.

Realize o mesmo processo de configuração para o `.env` do projeto.

### Rodando Localmente

Para rodar localmente, tenha os softwares acima instalados.

Primeiramente, faça o download da imagem docker do [MongoDB](https://hub.docker.com/_/mongo).

Após isso, realize o download do projeto na sua máquina local e entre no diretório do projeto.

[Configure as variaveis de ambiente do projeto.](#configurações-de-ambiente)

Suba o container do banco de dados MongoDB, utilizando o seguinte comando para utilizar as variaveis de ambientes configuradas.

```SHELL
docker run --env-file .database.env mongo
```

Após terminar, instale as dependencias e rode localmente o projeto.

```SHELL
npm install
npm start
```

[Aqui](#request-e-body) você pode consultar a forma como as requests devem ser feitas

### Rodando com docker-compose

Primeiro realize o processo para configurações do envs.
Com isso pronto, basta utilizar o seguinte comando


```SHELL
docker compose up
```

[Aqui](#request-e-body) você pode consultar a forma como as requests devem ser feitas

## Request e Body

O projeto tem apenas um endpoint. O de cadastrar um novo *Mood*.

O endpoint `/moods` deve ser chamado com o verbo HTTP `POST`.
No body do projeto deve conter o seguinte *JSON*:

```JSON
{
	"mood": "Bom",
	"context": "Dia bacana para testar o dockerfile",
	"goods": ["relacionamento"],
	"bads": ["trabalho"]
}
```

O retorno de sucesso terá o `status code` 201.
