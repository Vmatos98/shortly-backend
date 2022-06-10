# Shortly

## Deploy:
Link de consulta do Heroku: 
https://shortly-projeto16-driven.herokuapp.com/

## Sobre:
Projeto back end de um encurtador de links que conta com sistema de login e armazenamento de dados em database SQL.
Projeto 16 do curso de desenvolvimento web da DRIVEN
#
## Ferramentas:
<p float="left">
 <img style='height: 40px' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
<img style='height: 40px' alt="Node-JS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
<img style='height: 40px' alt="postgresql" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg"/>
 <img style='height: 40px' alt="Heroku" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg"/>
  <img style='height: 40px' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
  <img style='height: 40px' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
</p>

#
## Funções:
### testes em localhost, para uso da versão web usar link do Heroku
> Algumas rotas necessitam de autenticação via token gerado ao realizar login
> Todas as rotas autenticadas devem receber um header Authorization no formato Bearer TOKEN<br> 
> Por esse motivo as funções que necessitam de autenticação estarão marcadas com '*' no início 
<br/>

### POST:
#### Cadastrar novo user: 
 ~~~
 localhost:4000/signup
 ~~~ 
#### Exemplo de body:
~~~ 
{
	"name": "User",
    "email": "user@mail.com",
    "password": "senhasegura",
    "confirmPassword": "senhasegura"
}
~~~
---
#### Realizar login: 
 ~~~
 localhost:4000/signin
 ~~~ 
#### Exemplo de body:
~~~ 
{
    "email": "user@mail.com",
    "password": "senhasegura"
}
~~~
---
#### *Encurtar link: 
 ~~~
 localhost:4000/urls/shorten
 ~~~ 
#### Exemplo de body:
~~~ 
{
 "url":"https://www.linkedin.com/in/victor-matos-7b3609165/"
}
~~~
#### Retorno:
~~~
{
  "shortUrl": "LhOKEb1IZN"
}
~~~
---
### GET:
#### Acessar url encurtada: 
 ~~~
 localhost:4000/urls/open/<inserir_url_encurtada>
 ~~~
 #### Retorno:
### Redireciona para o site de destino
---
#### *Obter dados de uma url pelo id: 
 ~~~
 localhost:4000/urls/id
 ~~~
 #### Retorno:
~~~
{
  "id": 1,
  "shortUrl": "GpF0R4-Nk2",
  "url": "https://github.com/Vmatos98/shortly-backend"
}
~~~
---
#### *Obter dados de um usuario pelo id: 
 ~~~
 localhost:4000/users/id
 ~~~
 #### Retorno:
~~~
{
 {
  "id": 1,
  "name": "User1",
  "visitCount": "4",
  "shortenedUrls": [
    {
      "id": 2,
      "url": "https://github.com/Vmatos98/shortly-backend",
      "shortUrl": "gljPjWVHeD",
      "visitCount": 0
    },
    {
      "id": 1,
      "url": "https://github.com/Vmatos98/shortly-backend",
      "shortUrl": "GpF0R4-Nk2",
      "visitCount": 4
    }
}
~~~
---
#### Obter ranking dos 10 users com links mais visitados: 
 ~~~
 localhost:4000/ranking
 ~~~
 #### Retorno:
~~~
[
  {
    "id": 1,
    "name": "User1",
    "visitCount": "4",
    "linksCount": "15"
  },
  {
    "id": 11,
    "name": "User11",
    "visitCount": "2",
    "linksCount": "4"
  },
  {
    "id": 7,
    "name": "User7",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 9,
    "name": "User9",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 10,
    "name": "User10",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 5,
    "name": "User5",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 4,
    "name": "User4",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 2,
    "name": "User2",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 3,
    "name": "User3",
    "visitCount": "0",
    "linksCount": "0"
  },
  {
    "id": 6,
    "name": "User6",
    "visitCount": "0",
    "linksCount": "0"
  }
]
~~~
