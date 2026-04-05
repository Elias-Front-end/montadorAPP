# MONTADOR CONECTA - Índice de Specs

## Arquivos de Especificação

| # | Arquivo | Descrição | Fase |
|---|---------|-----------|------|
| 1 | `SPEC-ARCHITECTURE.md` | Arquitetura geral do sistema | Todas |
| 2 | `SPEC-DATABASE.md` | Schema do banco de dados | Todas |
| 3 | `SPEC-MVP.md` | Especificação do MVP (Fase 1) | Fase 1 |
| 4 | `SPEC-FASE2.md` | Especificação da Fase 2 | Fase 2 |
| 5 | `SPEC-FASE3.md` | Especificação da Fase 3 | Fase 3 |

---

## Estrutura de Dependências

```
SPEC-ARCHITECTURE.md
         │
         ├── SPEC-DATABASE.md
         │
         └── SPEC-MVP.md (Fase 1)
                    │
                    ├── SPEC-FASE2.md
                    │          │
                    │          └── SPEC-FASE3.md
                    │
                    └── SPEC-FASE3.md
```

---

## Resumo por Fase

### Fase 1: MVP
**Duração estimada:** ~22 dias  
**Objetivo:** Validar conexão entre contratantes e montadores

**Entregáveis:**
- [x] Autenticação e perfis
- [x] Gestão de serviços
- [x] Convite de montadores
- [x] Execução de serviços
- [x] Avaliação obrigatória
- [x] Agenda básica
- [x] Perfil profissional
- [x] Gestão de materiais

---

### Fase 2: Médio Prazo
**Duração estimada:** ~33 dias  
**Objetivo:** Consolidação e monetização

**Entregáveis:**
- [ ] Planos premium
- [ ] Sistema de reputação (Bronze/Prata/Ouro)
- [ ] Agenda avançada
- [ ] Painel financeiro
- [ ] Anúncios segmentados
- [ ] Suporte ao cliente
- [ ] Busca avançada + mapa
- [ ] MONTADOR CONECTA PRO

**Dependências:**
- [x] MVP completo

---

### Fase 3: Longo Prazo
**Duração estimada:** ~91 dias  
**Objetivo:** Escala nacional e ecossistema completo

**Entregáveis:**
- [ ] Marketplace
- [ ] Gestão de equipes
- [ ] Integrações (SketchUp, Promob)
- [ ] Pagamentos integrados
- [ ] Apps mobile
- [ ] Inteligência artificial
- [ ] Expansão nacional
- [ ] Integração ERP
- [ ] Selo Conecta

**Dependências:**
- [x] MVP completo
- [x] Fase 2 completa

---

## Checklist de Desenvolvimento

### Fase 1 - MVP
- [ ] Setup projeto
- [ ] Autenticação
- [ ] CRUD usuários
- [ ] Criar serviço
- [ ] Convite de montador
- [ ] Aceite/recusa
- [ ] Execução e finalização
- [ ] Sistema de avaliação
- [ ] Perfil do montador
- [ ] Agenda básica
- [ ] Gestão de materiais

### Fase 2 - Médio Prazo
- [ ] Planos premium
- [ ] Sistema de reputação
- [ ] Agenda avançada
- [ ] Painel financeiro
- [ ] Anúncios
- [ ] Suporte
- [ ] Filtros e mapa
- [ ] MONTADOR CONECTA PRO

### Fase 3 - Longo Prazo
- [ ] Marketplace
- [ ] Gestão de equipes
- [ ] Integrações projeto
- [ ] Pagamentos
- [ ] Apps mobile
- [ ] IA
- [ ] Expansão nacional
- [ ] ERP
- [ ] Selo Conecta

---

## Tech Stack

### Backend
- Node.js 20.x
- NestJS 10.x
- Prisma 5.x
- PostgreSQL 15.x

### Frontend
- Next.js 14.x
- React 18.x
- TailwindCSS 3.x

### Mobile
- React Native 0.74.x

### Infra
- AWS / Vercel
- Redis 7.x

---

## Contato do Projeto

- **Repositório:** `https://github.com/...`
- **Documentação API:** `/api/docs`
- **Trello/Notion:** [link]

---

*Última atualização: Abril 2026*
