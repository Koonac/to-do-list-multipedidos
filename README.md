# 📝 To-Do List - Laravel + AngularJS 1.6
Uma aplicação web de lista de tarefas construída com **Laravel 11** (API RESTful) e **AngularJS 1.6** (SPA), com autenticação via **JWT**.

---

## 🚀 Funcionalidades

- Registro e login de usuários
- Listagem de tarefas com filtros (todas, em progresso, concluídas)
- Criação, edição e exclusão de tarefas
- Marcar tarefa como concluída
- Proteção de rotas (autenticação)
- Responsivo e com UX minimalista

---

## 🛠️ Tecnologias utilizadas

- [Laravel](https://laravel.com/) 11
- AngularJS 1.6
- Tailwind CSS
- Docker + docker-compose
- MySQL
- PHP 8.2
- Clean Architecture + princípios SOLID

---

## 📦 Como rodar o projeto (via Docker)

### 🔧 1. Clonar o repositório
```bash
git clone https://github.com/Koonac/to-do-list-multipedidos.git
cd to-do-list-multipedidos
```

### 📄 2. Copiar o arquivo .env
O .env.example já está configurado para rodar com Docker:

```bash
cp .env.example .env
```

### 🔍 3. Verificar arquivos Docker
Antes de subir os containers, certifique-se de que:

- O arquivo docker-compose.yml está adequado ao seu sistema (Linux, macOS, Windows).

- O Dockerfile está compatível com sua versão do Docker.

- As portas definidas no docker-compose.yml (ex: 8000, 3306, 4200) não estejam em uso.

Se necessário, edite as portas no docker-compose.yml.

### 🚀 4. Subir os containers
```bash
docker-compose up --build -d
```

### 📦 5. Instalar dependências PHP e Migrations
Acesse o container do laravel:
```bash
# Acessando container
docker exec -it laravel-app bash

# Instalando dependências
composer install

# Rodando migrations
php artisan migrate
```

### 🗃️ 6. Instalar pacotes npm
Acesse a pasta do angular `...\to-do-list-multipedidos\angular1.6`:
```bash
# Instalando dependências
npm install
```

---

## 🔐 Autenticação
A autenticação é baseada em JWT. Após login, o token é armazenado no localStorage e enviado automaticamente nas requisições protegidas.

---

## 🧪 Testes
Para rodar os testes de api no laravel.

Acesse o container do Laravel
```bash
docker exec -it laravel-app bash
```

Dentro do container, rode:
```bash
php artisan test
```
