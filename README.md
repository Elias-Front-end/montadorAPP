# Montador Conecta

Plataforma operacional que conecta empresas (marcenarias/lojistas) a montadores de móveis, focada na execução confiável de serviços, controle de agenda, status, governança, avaliação e gestão operacional.

---

## Visão Geral do Produto

**Montador Conecta** é uma plataforma B2B SaaS que revoluciona a forma como marcenarias e lojistas contratam montadores de móveis. A plataforma garante execução de serviços com qualidade, criando um histórico confiável de profissionais e permitindo controle total do processo de montagem.

### Perfis de Usuário

| Perfil | Descrição |
|--------|-----------|
| **Montador** | Prestador de serviço que executa montagens |
| **Empresa** | Marceneiro/Lojista que contrata montadores |
| **Administrador** | Gerencia a plataforma e resolve conflitos |

---

## Arquitetura do Sistema

### Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| Backend | Node.js + NestJS |
| Banco de Dados | PostgreSQL + Redis (cache) |
| ORM | Prisma |
| Frontend Web | Next.js + React + TailwindCSS |
| Mobile | React Native |
| Autenticação | JWT |

### Estrutura do Projeto

```
/src
├── /modules
│   ├── auth        - Autenticação e autorização
│   ├── users      - Gestão de usuários
│   ├── services   - Gestão de serviços
│   ├── evaluations - Sistema de avaliações
│   ├── materials  - Gestão de materiais
│   ├── calendar   - Agenda
│   ├── payments   - Pagamentos (Fase 2+)
│   └── marketplace - Marketplace (Fase 3+)
├── /common         - Recursos compartilhados
├── /config         - Configurações
└── /database       - Migrações
```

---

## Funcionalidades por Fase

### Fase 1: MVP

**Objetivo:** Validar a conexão entre contratantes e montadores

| Módulo | Funcionalidades |
|--------|-----------------|
| **Autenticação** | Cadastro, login, recuperação de senha, perfis distintos |
| **Gestão de Serviços** | Criar, editar, listar, excluir serviços |
| **Convites** | Convidar montador, time fixo (VIP), aceitar/recusar |
| **Execução** | Iniciar, acompanhar, finalizar serviço |
| **Avaliação** | Nota 1-5 estrelas, feedback, score do montador |
| **Agenda** | Calendário, serviços agendados, disponibilidade |
| **Perfil** | Avaliações, histórico, habilidades, qualificações |
| **Materiais** | Solicitar materiais/peças com foto opcional |

**Fluxo Principal:**
```
Publicar serviço → Selecionar montador → Montador aceita → Executar → Finalizar → Avaliar
```

### Fase 2: Médio Prazo

**Objetivo:** Consolidação e monetização

| Módulo | Funcionalidades |
|--------|-----------------|
| **Planos Premium** | Assinaturas (Básico, Profissional, Empresarial) |
| **Reputação** | Badges Bronze, Prata, Ouro |
| **Agenda Avançada** | Visualização diária/semanal/mensal, drag-and-drop |
| **Painel Financeiro** | Ganhos, extrato, métricas |
| **Anúncios** | Espaço publicitário segmentado |
| **Suporte** | Chat, formulário, FAQ |
| **Busca + Mapa** | Filtros avançados, geolocalização |
| **MONTADOR CONECTA PRO** | Cursos, certificações, parcerias (Udemy, Senai, Alura) |

### Fase 3: Longo Prazo

**Objetivo:** Escala nacional e ecossistema completo

| Módulo | Funcionalidades |
|--------|-----------------|
| **Marketplace** | Compra de ferragens e materiais |
| **Gestão de Equipes** | Criar equipes, atribuir serviço coletivo |
| **Integrações** | SketchUp, Promob, ERP |
| **Pagamentos** | PIX, cartão, split, saque |
| **Mobile Apps** | Android/iOS com push notifications |
| **Inteligência Artificial** | Recomendação de montadores, chatbot |
| **Expansão Nacional** | Multi-região, parceiros locais |
| **Selo Conecta** | Certificação de qualidade |

---

## Banco de Dados

### Entidades Principais

| Entidade | Descrição |
|----------|-----------|
| **User** | Usuário base (email, senha, tipo, status) |
| **MontadorProfile** | Perfil do montador (habilidades, avaliação, badge) |
| **Company** | Dados da empresa contratante |
| **Service** | Serviço de montagem |
| **ServiceParticipation** | Participação de montador no serviço |
| **Evaluation** | Avaliação após conclusão |
| **MaterialRequest** | Solicitação de materiais/peças |
| **Calendar** | Agenda do montador |
| **Invite** | Convites para serviços ou time fixo |
| **Subscription** | Assinatura do plano premium |
| **Invoice** | Faturas de pagamento |
| **Notification** | Notificações do sistema |
| **Certificate** | Certificados de cursos |

### Relacionamentos

```
User ─┬─→ MontadorProfile (1:1)
      └─→ Company (1:1)

Company ─→ Service (1:N)
Service ─→ ServiceParticipation (N:N Montador)
Service ─→ Evaluation (1:N)
Service ─→ MaterialRequest (1:N)
Service ─→ Calendar (N:N Montador)
```

---

## Segurança

- **Autenticação:** JWT com access token (15min) + refresh token (7 dias)
- **Autorização:** RBAC (Role-Based Access Control)
- **Validação:** Zod para input validation
- **Proteção:** Rate limiting, CORS, Helmet.js
- **SQL Injection:** Prevenido via Prisma ORM

---

## Roadmap de Desenvolvimento

| Fase | Duração | Status |
|------|---------|--------|
| MVP (Fase 1) | ~22 dias | ⏳ Planejado |
| Fase 2 | ~33 dias | ⏳ Planejado |
| Fase 3 | ~91 dias | ⏳ Planejado |

---

## Tecnologias e Dependências

### Backend
- Node.js 20.x
- NestJS 10.x
- Prisma 5.x
- PostgreSQL 15.x
- Redis 7.x
- JWT

### Frontend
- Next.js 14.x
- React 18.x
- TailwindCSS 3.x
- shadcn/ui
- Zustand (estado)
- TanStack Query

### Mobile
- React Native 0.74.x
- React Navigation 6.x

### Infraestrutura
- AWS / Vercel
- AWS S3 (arquivos)
- SendGrid / Resend (email)

---

## Documentação

| Arquivo | Descrição |
|---------|-----------|
| `specs/SPEC-ARCHITECTURE.md` | Arquitetura detalhada |
| `specs/SPEC-DATABASE.md` | Schema do banco de dados |
| `specs/SPEC-MVP.md` | Especificação do MVP |
| `specs/SPEC-FASE2.md` | Especificação da Fase 2 |
| `specs/SPEC-FASE3.md` | Especificação da Fase 3 |
| `specs/SPEC-INDEX.md` | Índice geral das specs |

---

## Como Executar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrações do banco
npx prisma migrate dev

# Iniciar desenvolvimento
npm run dev
```

---

## Licença

MIT

---

*Última atualização: Abril 2026*
