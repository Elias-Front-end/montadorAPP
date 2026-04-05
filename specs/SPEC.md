# MONTADOR CONECTA - Especificação Completa do Projeto

## 1. Visão Geral do Produto

**Nome:** Montador Conecta  
**Tipo:** Plataforma Web/Mobile (SaaS)  
**Modelo de Negócio:** Marketplace B2B com monetization futura  

Plataforma operacional que conecta empresas (marcenarias/lojistas) a montadores, focada na execução confiável de serviços, controle de agenda, status, governança, avaliação e gestão operacional.

**Perfis de Usuário:**
- **Montador** (Prestador de serviço)
- **Empresa** - Marceneiro/Lojista (Contratante)
- **Administrador** (Plataforma)

---

## 2. Objetivo do MVP

- Garantir execução de serviços concluídos com sucesso
- Reduzir falhas operacionais
- Criar histórico confiável de montadores
- Permitir controle e mediação pelo administrador

**Métrica principal:** Serviços concluídos

---

## 3. Funcionalidades do MVP (Fase 1)

### 3.1 Autenticação e Perfis
- [ ] Cadastro e login individual por tipo de usuário
- [ ] Perfis distintos: Montador / Empresa / Administrador
- [ ] Acesso a funcionalidades específicas por perfil

### 3.2 Gestão de Serviços (Contratante)
- [ ] Criar novos serviços de montagem
- [ ] Listar e gerenciar serviços criados
- [ ] Definir prazos, detalhes e responsáveis
- [ ] Status do serviço: Pendente → Em Execução → Finalizado

### 3.3 Convite e Participação de Montadores
- [ ] Enviar convite para serviço específico
- [ ] Adicionar montador ao time fixo (montador VIP)
- [ ] Atuação exclusiva ou temporária

### 3.4 Execução de Serviços
- [ ] Montador aceita ou recusa convite
- [ ] Início e acompanhamento do serviço
- [ ] Finalização com prazo definido pelo contratante
- [ ] Visualização da equipe envolvida

### 3.5 Avaliação (Obrigatória)
- [ ] Contratante avalia montador após conclusão
- [ ] Sistema de notas (1-5 estrelas)
- [ ] Feedback textual
- [ ] Score geral do montador

### 3.6 Painel do Montador
- [ ] Visualização de todas as montagens envolvidas
- [ ] Acompanhamento de status de cada serviço
- [ ] Controle de prazos
- [ ] Visualização de equipe

### 3.7 Agenda e Disponibilidade
- [ ] Calendário com serviços agendados
- [ ] Controle de compromissos
- [ ] Dias disponíveis para novos trabalhos

### 3.8 Perfil Profissional do Montador
- [ ] Exibição de avaliações recebidas
- [ ] Histórico de serviços
- [ ] Habilidades e especialidades
- [ ] Dados de contato
- [ ] Qualificações

### 3.9 Gestão de Materiais e Peças (Diferencial MVP)
- [ ] Solicitação de materiais
- [ ] Pedido de peças para ajustes/correções
- [ ] Descrição detalhada
- [ ] Upload opcional de fotos

---

## 4. Fluxo Principal do MVP

```
1. Contratante: Publicar serviço
2. Contratante: Selecionar montador (por filtro score/habilidades/perfil)
3. Montador: Aceita ou recusa
4. Se aceitar → Executar montagem
5. Finalizar → Contratante avalia montador
```

---

## 5. Fase 2 (Médio Prazo) - Consolidação e Monetização

### 5.1 Planos Premium
- [ ] Planos pagos e assinaturas
- [ ] Funcionalidades exclusivas por plano

### 5.2 Sistema de Reputação
- [ ] Badge: Bronze, Prata, Ouro
- [ ] Critérios automatizados

### 5.3 Agenda Avançada
- [ ] Agenda detalhada de serviços
- [ ] Visualização por dia/semana/mês

### 5.4 Painel Financeiro
- [ ] Controle de ganhos do montador
- [ ] Histórico de pagamentos

### 5.5 Anúncios Segmentados
- [ ] Espaço para anúncios
- [ ] Segmentação por região/especialidade

### 5.6 Suporte
- [ ] Chat em tempo real
- [ ] Formulário de suporte

### 5.7 Busca Avançada
- [ ] Filtros avançados
- [ ] Mapa em tempo real

### 5.8 MONTADOR CONECTA PRO (Capacitação)
- [ ] Parcerias com plataformas (Udemy, Senai, Alura, Hotmart)
- [ ] Certificados com selos no perfil
- [ ] Cursos sugeridos:
  - Elétrica básica
  - Normas NR10 e NR35
  - Instalação de móveis planejados
  - Método 5S
  - Gestão de tempo e atendimento

---

## 6. Fase 3 (Longo Prazo) - Escala Nacional

### 6.1 Marketplace
- [ ] Marketplace de ferragens e materiais
- [ ] Catálogo de produtos

### 6.2 Gestão de Equipes
- [ ] Criação e gestão de equipes
- [ ] Liderança de equipes

### 6.3 Integrações
- [ ] Integração com SketchUp
- [ ] Integração com Promob
- [ ] Integração com ERPs

### 6.4 Pagamentos
- [ ] Pagamentos via PIX
- [ ] Pagamentos via cartão
- [ ] Split de pagamentos

### 6.5 Aplicativos Mobile
- [ ] App Android
- [ ] App iOS
- [ ] Notificações push

### 6.6 Inteligência Artificial
- [ ] IA para recomendação de montadores
- [ ] Matching inteligente

### 6.7 Expansão
- [ ] Expansão nacional
- [ ] Multiple regiões

### 6.8 Selo Conecta
- [ ] Certificação de qualidade
- [ ] Selo oficial

---

## 7. Estrutura de Dados (Entidades Principais)

### Usuário
- id, nome, email, senha, telefone, tipo (montador/empresa/admin)
- created_at, updated_at

### PerfilMontador
- usuario_id, cpf, cnpj, foto_perfil, bio
- habilidades (array), especialidades (array)
- avaliacao_media, total_avaliacoes
- badge (bronze/prata/ouro), plano

### Empresa
- usuario_id, cnpj, nome_fantasia, razao_social
- endereco, telefone, foto_logo

### Servico
- empresa_id, titulo, descricao, endereco
- data_inicio, data_fim, prazo
- status (pendente/em_execucao/finalizado)
- valor, observacoes

### ParticipacaoServico
- servico_id, montador_id
- funcao (titular/auxiliar)
- status_convite (pendente/aceito/recusado)
- data_inicio_execucao, data_fim_execucao

### Avaliacao
- servico_id, montador_id, empresa_id
- nota (1-5), comentario
- created_at

### SolicitacaoMaterial
- servico_id, empresa_id
- descricao, foto_url
- tipo (material/peça)
- status (pendente/aprovado/rejeitado)

### Agenda
- montador_id, servico_id
- data, hora, tipo (agendamento/disponivel)

---

## 8. Tech Stack Sugerido

### Backend
- **Linguagem:** Node.js ou Python
- **Framework:** NestJS ou Django
- **Banco de Dados:** PostgreSQL
- **Auth:** JWT + OAuth

### Frontend
- **Framework:** React.js ou Next.js
- **UI:** TailwindCSS + shadcn/ui
- **Estado:** React Query / Zustand

### Mobile
- **Framework:** React Native ou Flutter

### Infraestrutura
- **Cloud:** AWS / Vercel / Railway
- **Storage:** AWS S3 (fotos)
- **Email:** Resend / SendGrid

---

## 9. Priorização Sugerida

### Sprint 1-2: Foundation
- [ ] Setup projeto
- [ ] Autenticação completa
- [ ] CRUD usuários

### Sprint 3-4: Core MVP
- [ ] Criar serviço
- [ ] Convite de montador
- [ ] Aceite/recusa
- [ ] Execução e finalização

### Sprint 5-6: Avaliação e Perfil
- [ ] Sistema de avaliação
- [ ] Perfil do montador
- [ ] Score e histórico

### Sprint 7-8: Diferenciais MVP
- [ ] Agenda
- [ ] Gestão de materiais
- [ ] Notificações

### Sprint 9-10: polish
- [ ] Dashboard completo
- [ ] Filtros de busca
- [ ] UI/UX refinamentos
- [ ] Testes

---

## 10. Resultado Esperado

- Plataforma operacional funcional
- Base sólida para crescimento
- Escalabilidade técnica e comercial
- Validação de market fit
- Receita inicial (Fase 2)

---

*Documento vivo - Atualizar conforme evoluçao do projeto*
