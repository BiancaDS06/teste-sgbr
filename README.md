# Projeto Giphy Explorer - Teste Técnico SGBR

Este projeto foi desenvolvido como parte de um teste técnico para a vaga de Programador Web Front-End na **SGBR® Sistemas**, empresa especializada em soluções de automação comercial.

A aplicação consome a **API do GIPHY** e permite aos usuários:

- Visualizar GIFs em alta (trending)  
- Pesquisar GIFs por palavra-chave  
- Explorar GIFs por categoria  
- Adicionar e remover GIFs de uma lista de favoritos, com persistência local  

---

## 🛠️ Tecnologias utilizadas

- [Vue 3](https://vuejs.org/) (Composition API)  
- [Quasar Framework 2](https://quasar.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Pinia](https://pinia.vuejs.org/)  
- [Axios](https://axios-http.com/)  
- [Vue Router](https://router.vuejs.org/)  
- [LocalStorage (plugin Quasar)](https://quasar.dev/quasar-plugins/web-storage)  
- [GIPHY API](https://developers.giphy.com)  

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- Node.js (v18 ou superior)  
- NPM ou Yarn  

---

## 🚀 Instalação e Execução

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
# ou yarn install
quasar dev

IMPORTANTE:
Crie um arquivo .env na raiz do projeto com o conteúdo abaixo antes de rodar o servidor:

env
VITE_GIPHY_API_KEY=sua_chave_api_aqui
Você pode obter uma chave gratuita em: https://developers.giphy.com
