# Frontend - Teste Técnico Full Stack (eMiolo.com)

Este diretório contém o frontend de uma aplicação robusta desenvolvida em Nuxt 3. O projeto integra autenticação moderna, consumo de APIs externas (SWAPI) e monitoramento de dados de Inteligência Artificial em tempo real via WebSockets.

---

## Stack Tecnológica

- **Framework:** Nuxt 3 (Vue.js)
- **Linguagem:** TypeScript
- **Comunicação:** 
    - HTTP/REST: Fetch API para SWAPI e Backend local.
    - WebSockets (Socket.io) para o stream de inferências.

---

## Funcionalidades Implementadas

### 1. Autenticação e Segurança
- **Google OAuth2:** Fluxo completo de login utilizando contas Google.
- **Persistência de Sessão:** Integração com o backend para identificação do usuário logado.
- **Gestão de Usuários:** Listagem de todos os usuários cadastrados na base de dados do sistema.

### 2. Integração com Star Wars API (SWAPI)
- **Personagens:** Listagem dinâmica e detalhamento individual de cada personagem.
- **Planetas:** Navegação completa pelos planetas do universo Star Wars.
- **Navegação Inteligente:** Sistema de roteamento dinâmico para exploração de dados.

### 3. Módulo de Inferência de IA (Real-time)
- **Dashboard de Estatísticas:** Métricas de performance (latência, total de eventos e risco).
- **Player Simulado:** Renderização de bounding boxes e badges de risco sobre vídeo, atualizados via Socket.io.
- **Feed Reativo:** Histórico dos últimos 10 eventos detectados com controle de memória para performance.

---

## Estrutura de Arquivos

```
app/
├── components/
│   ├── dashboardComponents/
│   │    ├── DashboardStats.vue
│   │    ├── ListaEventos.vue          
│   │    └── PlayerFake.vue    
│   ├── BackButton.vue          
│   └── UserCard.vue          
├── pages/
│   ├── index.vue               
│   ├── home.vue                
│   ├── users.vue               
│   ├── swapi/
|   |   ├── people/
|   |   |   ├── index.vue
|   |   |   └── [id].vue
|   |   └── planets/
|   |       ├── index.vue  
|   |       └── [id].vue
│   └── dashboard/
|       └── index.vue              
└── service/
    └── socket.ts               
```

---

## Como executar o projeto

```

Clone o repositório:
git clone https://github.com/RoberthVieira/emioloTeste.git

Instale as dependências:
npm install

Execute o servidor de desenvolvimento:
npx nuxi dev --port 3001

Acesse em:
http://localhost:3001

```
---

### Diferenciais Técnicos Aplicados

- Uso de requestId único gerado no frontend para rastrear as sessões de inferência.
- **Limitação de Memória**: O feed de eventos é programado para manter apenas os últimos 10 itens, evitando sobrecarga do navegador durante transmissões longas.

---
