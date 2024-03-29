# HelpingPaw 🤝

Desenvolvido por Christian State e Leonardo Albergaria.

## 📝 Sobre o projeto

HelpingPaw é um hub interativo web, que busca promover a adoção e caridade animal, permitindo a criação de posts, de ajuda e de oferta de algum recurso, que são exibidos para todos os usuários do sistema.

### 🔨 Tecnologias utilizadas
* [Nodejs](https://nodejs.org/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Reactjs](https://pt-br.reactjs.org/)
* [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
* [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
* [Node Package Manager](https://www.npmjs.com/)


## ⌨️ Setup
Aqui se encontram as instruções de instalação do projeto. É recomendável a instalação em um ambiente linux, para evitar demais problemas. Para ter uma cópia local e executar o projeto basta seguir os próximos passos:

### Pré-requisitos
Para a intalação do backend você precisa ter instalado:
* nodejs - v16.x.x
* npm - v8.x.x

E para o frontend:
* reactjs - v18.x.x
* npm - v8.x.x

## 💻 Instalação
Antes de tudo, é necessário clonar o repositório:
```sh
git clone https://github.com/LeoAlbergaria/HelpingPaw.git
```

### Configurando o banco de dados
HelpingPaw utiliza um banco de dados MongoDB, o qual pode ser instalado localmente ou utilizado a plataforma em nuvem MongoDB Atlas.

Nós utilizamos o serviço em nuvem para tornar o processo de desenvolvimento mais rápido, caso você escolha por instalar o banco localmente, fica a seu encargo a instalação do mesmo.

Uma vez que se tenha o banco de dados, é necessário criar na pasta `./backend` o arquivo `.env`, com duas variáveis de ambiente:
* `CONNECTIONSTRING`
* `SECRET`

`CONNECTIONSTRING` deve receber a string de conexão ao banco de dados MongoDB, enquanto que `SECRET` deve receber alguma palavra chave que se desejar.

### ⚙️ Inicializando o back-end
```bash
  # Entrando no diretório:
  $ cd backend
  # Instalando as dependências:
  $ npm i
  # Executando a aplicação:
  $ npm start
```
Esse servidor executa na porta 3000.

### 👁‍🗨 Inicializando o front-end
```bash
  # Enter front-end directory:
  $ cd frontend
  # Install the dependencies:
  $ npm i
  # Run the aplication on development mode:
  $ npm start
```
Esse servidor executa na porta 3001.

## 😸 Utilização
Agora que está tudo pronto, basta acessar `http://localhost:3001` em seu navegador para começar a utilizar o hub.
<p align="center">
    <img src="docs/images/logo.png" width="80px" />
</p>

### Features
* Login com conta própria do sistema
* Cadastro de uma nova conta
<p align="center">
    <img src="docs/images/cadastrologin.gif" width="55%" height="auto" />
</p>

* Visualizar e filtrar posts do sistema
<p align="center">
    <img src="docs/images/posts.gif" width="55%" height="auto" />
</p>

* Cadastrar um novo post
* Alterar informações do usuário
* Excluir posts
<p align="center">
    <img src="docs/images/novopostusuario.gif" width="55%" height="auto" />
</p>