# Backend — Teste Técnico Full Stack (eMiolo.com)

Este é o backend do teste técnico da eMiolo.com, implementado com NestJS e MongoDB.
Ele simula um sistema de inferência de Inteligência Artificial em tempo real, com integração REST + WebSockets, persistência em banco e observabilidade básica.

---

## Stack Tecnológica

- **Framework:** NestJS
- **Linguagem:** TypeScript / Node
- **Banco de Dados:** MongoDB Atlas (via Mongoose)
- **Comunicação Real-time:** WebSockets (Socket.io)
- **Autenticação (WebSocket):** WebSockets (Socket.io)
- **Observabilidade:** Endpoint /health/metrics para métricas do sistema

---

## Estrutura do Projeto

```
src/
├── app.module.ts                 # Módulo principal
├── main.ts                       # Inicialização do servidor
├── events/                      # Persistência e serviços de eventos de inferência
│   ├── events.schema.ts
│   ├── events.service.ts
│   └── events.module.ts
├── inference/                  # Inferência (Provider Pattern + Controller + Gateway)
│   ├── inference.constants.ts
│   ├── inference.controller.ts
│   ├── inference.service.ts
│   ├── inference.module.ts
|   ├── inference.getway.ts
│   ├── providers/
│   │   └── mock-inference.provider.ts
│   └── interfaces/
│       └── inference-provider.interface.ts
├── health/                     # Observabilidade
│   ├── health.controller.ts
│   ├── metrics.service.ts
│   └── health.module.ts
└── ...                          # Outras dependências (config, providers, etc.)
```

---

## Como Rodar

### Pré-requisito
- Node.js (>= 18)
- NPM ou Yarn
- MongoDB rodando localmente ou via Atlas
- Se estiver usando MongoDB Atlas coloque o URI no arquivo .env 

```
Clone o repositório:
git clone https://github.com/RoberthVieira/emioloTeste.git

Instale as dependências:
npm install

Execute o servidor de desenvolvimento:
npm run dev

Acesse em:
http://localhost:3000

```

--- 

## Endpoints Disponiveis

### POST /inference/frames
Recebe um array de frames e retorna simulação de resultados de inferencia:

```
POST /inference/frames
{
  "frames": ["...","..."]
}
```

Retorno de exemplo:

```
{
  "emotions": [...],
  "ppe": [...],
  "risk": {...},
  "latency_ms": 14
}
```


## WebSockets - streaming em tempo real

### Endereço:
```
ws://localhost:3000
```

### Eventos disparados pelo cliente:
```
start-inference {resquestId}
```

###Resposta enviada pelo servidor a cada 500ms:
```
{
  "ts": "...",
  "frameId": "...",
  "overlay": {"boxes": [...], "emotions": [...], "risk": {...} }
}
```

## Get/health/metrics

### Retorna métricas simples do sistema:
```
GET /health/metrics
```

### Exemplo de retorno:
```
"eventsProcessed": 10,
"averageLatencyMs": 14,
"errorRate": 0.0,
"uptimeSeconds": 123
```

---

## Observabilidade

O endpoint /health/metrics foi criado para demonstrar observabilidade simples:
- total de eventos processados
- Latência média
- Taxa de erro
- Tempo de uptime 

---

## Padrões Arquiteturais

### Provider Pattern
O módulo de inferência foi construído com o padrão Provider Pattern, permitindo facilmente substituir:
- MockProvider(atual)
- LLMProvider (futura integração com modelo de IA)
