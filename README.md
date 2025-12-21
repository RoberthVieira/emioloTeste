# Teste Técnico – Desenvolvedor Full Stack (Emiolo)

---

## 1. Visão Geral e Objetivo do Projeto

Este projeto simula um sistema de monitoramento de vídeo com análise de IA em tempo real. O objetivo principal foi demonstrar a capacidade de estruturar uma solução Full Stack funcional, utilizando NestJS e Nuxt 3, focando na organização do código, fluxo de dados e decisões arquiteturais (ADR).

Nota importante: Para garantir a entrega do "core" da aplicação no prazo, o sistema utiliza dados de inferência simulados. Isso permite demonstrar a integração técnica e a reatividade da interface sem a complexidade de um modelo de IA real neste estágio. 

---

# 2. Escopo Entregue

Foram implementadas as principais partes solicitadas no desafio, com foco no funcionamento do core da aplicação e no entendimento no fluxo principal do projeto.

Funcionalidades opcionais ou mais avançadas foram consideradas apenas após a consolidação da base. Algumas partes do projeto de referencia não foram implementadas integralmente, seja por limitação de tempo, escopo ou por serem essenciais para demostrar o reciocinio tecnico proposto no desafio.

A proposta foi garantir clareza estrutural, organização do codigo e funcionamento consistente do fluxo principal

--- 

# 3. Stack Usada 
- **Linguagem:** TypeScript / Node
- **Frameworks:** NestJS, Nuxt 3 (Vue.js)
- **Banco de Dados:** MongoDB Atlas (via Mongoose)
- **Comunicação Real-time:** WebSockets (Socket.io)
- **Autenticação (WebSocket):** WebSockets (Socket.io)
- **Versionamento:** Git

---

## 4. Fluxo macro da Aplicação

**1 - Inicialização do Frontend**
- O usuário acessa a interface web
- O frontend gera um requestId único para a sessão de inferência.

**2 - Conexão em Tempo Real**
- O frontend estabelece conexão com o backend via WebSocket (Socket.io).
- O estado da conexão é refletido na interface.

**3 - Simulação de análise**
- O sistema inicia uma simulação de análise de vídeo.
- Não há captura real de câmera: os dados são gerados para representar um cenário de uso real.

**4 - Envio de resultados**
- O servidor envia continuamente informações simuladas, como:
    - Tipos de eventos detectados
    - Nivel de risco
    - Grau de confiança
    - Area detectada 

**5 - Atualização da interface**
- A interface reage imediatamente aos dados recebidos:
    - Mostra alertas visuais sobre o vídeo simulado
    - Atualiza a lista de eventos recentes
    - Exibe indicadores de risco e confiança

**6 - Monitoramento e Métricas**
- O sistema apresenta dados gerais de funcionamento, como:
    - Quantidade de eventos processados
    - Tempo médio de resposta
- Esses dados ajudam a visualizar a “saúde” da aplicação.

**7 - Encerramento**
- Ao sair da página, a conexão é encerrada corretamente.
- Nenhum dado sensivel é armazenado 

---

## 5. Arquitetura Geral & ADR (Decisões de Arquitetura)

Adotei uma separação clara de responsabilidades para facilitar a manutenção e evolução:

- Comunicação Híbrida: * WebSockets: Para o fluxo constante e pesado de inferências (Real-time).
- HTTP (REST): Para dados estáticos ou de consulta pontual (Métricas).
- Backend (NestJS): Estruturado em módulos independentes (inference, events e health). O uso de módulos permite que o motor de IA seja substituído no futuro sem afetar o restante do sistema.
- Frontend (Nuxt 3): Organizado em componentes reativos especializados (Player, Listagem e Stats).

--- 

## 6. Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Passo a Passo

```
1. Clone o repositório:
   git clone https://github.com/RoberthVieira/emioloTeste.git

2. Configuração do Backend:
    - `cd backend`
    - `npm install`
    - `npm run start:dev` (O servidor rodará em http://localhost:3000)

3. Configuração do Frontend:
    - Abrir um novo terminal
    - `cd frontend`
    - `npm install`
    - `npm run dev` (O site rodará em http://localhost:3001)
```

## 7. Uso de Inteligência Artificial como Co-piloto

Este projeto foi desenvolvido com o apoio estratégico das ferramentas ChatGPT e Gemini, que atuaram como mentores técnicos durante o processo. Como as stacks utilizadas (NestJS e Nuxt 3) representaram um novo território de aprendizado para mim, o uso da IA foi fundamental para:

- **Aceleração da Curva de Aprendizado:** Compreensão rápida da estrutura de módulos do NestJS e do ciclo de vida do Nuxt 3.
- **Tomada de Decisão Guiada:** Muitas das decisões lógicas e padrões de arquitetura foram propostos pela IA sob minha supervisão e direcionamento, garantindo que a solução atendesse aos requisitos do desafio.
- **Implementação de Boilerplate e Lógica:** Auxílio na escrita de componentes e serviços, onde atuei refinando o código gerado para que fizesse sentido dentro do fluxo macro da aplicação.
- **Validação:** Uso da IA para explicar erros de tipagem (TypeScript) e garantir a correta integração entre o servidor de WebSocket e a interface reativa.

---

## 8. Questões Dissertativas (Parte 3 do Desafio)

**1** - Para substituir o simulador por uma IA real sem quebrar a aplicação, eu utilizaria uma Interface. Na prática, isso funciona como um 'molde' que define exatamente como os dados devem sair. 
Como o NestJS permite trocar as peças do sistema facilmente, eu apenas substituiria a classe simulada pela classe da IA real no módulo principal. 
Em seguida eu criaria um tradutor (Adapter) para garantir que, não importa se a IA vem da Azure ou de um arquivo local, o resultado final entregue ao Frontend seja sempre no mesmo formato que ele já conhece.
Assim o restante do sistema e a interface do usuário continuariam funcionando normalmente, sem precisar de ajustes, pois a forma como os dados chegam não mudou.

**2** - Para avaliar a qualidade do modelo em produção, eu focaria no monitoramento contínuo dos resultados para garantir que eles mantenham a consistência.
Minha estratégia seria observar se as classificações e os níveis de confiança continuam fazendo sentido com o passar do tempo. Se os resultados começarem a mudar de forma brusca ou sem motivo aparente, seria um sinal de alerta.
Para a detecção de drifts eu analisaria se o padrão das imagens de entrada mudou, como iluminação ou qualidade da imagem. Se a IA passar a entregar resultados fora do comum com muita frequência, isso indicaria que o modelo precisa ser reajustado 
Para evitar o viés, eu realizaria testes periódicos utilizando diferentes tipos de perfis e cenários com objetivo de análisar se o modelo mantem a precisão em todos os tipos de imagens e cenários.

**3** - A minha prioridade seria proteger a privacidade e guardar apenas o que for essencial. Primeiro, eu aplicaria um borrão (anonimização) nos rostos antes de guardar qualquer imagem. Segundo, eu daria preferência por salvar apenas os dados do evento (como o nível de risco) e apagaria a imagem logo em seguida. Por fim, os dados teriam um prazo para serem excluídos automaticamente do sistema.

**4** - Minha estratégia seria não trocar tudo de uma vez.
Primeiro eu não substituiria a IA para todos os usuários simultaneamente. Implementaria a mudança primeiro para um pequeno percentual. Isso permitiria validar o comportamento da nova IA em um ambiente real sem colocar em risco a experiência de todos os usuários.
Segundo utilizaria o Dashboard de Métricas desenvolvido neste projeto para acompanhar o desempenho em tempo real. 
Por ultimo caso a nova implementação apresente qualquer instabilidade, o sistema estaria preparado para uma reversão imediata para o provedor anterior. Ter esse 'plano de emergência' garante a continuidade do serviço e a confiança do usuário final.

---

## 9. Limitações e Melhorias Futuras

**Limitação:** O player de vídeo e as inferências são simulações visuais para este teste.

- Melhoria 1: Integração com um provedor real de IA (ex: TensorFlow.js ou Azure Cognitive Services).
- Melhoria 2: Implementação de autenticação completa (OAuth2/Google).
- Melhoria 3: Adição de testes automatizados (Unitários e E2E) para garantir a resiliência do stream.

---

## 10. Conclusão

Realizar este desafio foi uma experiência extremamente recompensadora e, acima de tudo, desafiadora. Mais do que apenas um teste de código, este projeto representou um mergulho intensivo em novas tecnologias e conceitos que eu ainda não dominava.
Estou muito satisfeito com o resultado alcançado dentro do prazo proposto. O fato de ter utilizado stacks que não faziam parte do meu dia a dia me forçou a evoluir rapidamente, utilizando ferramentas de IA como mentores e documentações oficiais como guia.

### Principais Aprendizados
- **Ecossistema NestJS:** Compreender a arquitetura modular, injeção de dependência e como o Nest organiza a lógica de backend de forma escalável.
- **Nuxt 3 & Reatividade:** Explorar o poder do Vue.js com Nuxt para criar uma interface que reage a fluxos de dados complexos em tempo real.
- **Comunicação Real-time:** Implementar WebSockets (Socket.io) para gerenciar o tráfego de dados entre servidor e cliente sem a necessidade de múltiplos refreshs.
- **Arquitetura Orientada a IA:** Entender como estruturar um sistema que precisa estar pronto para receber modelos de inteligência artificial, separando a lógica de negócio da lógica de inferência.

