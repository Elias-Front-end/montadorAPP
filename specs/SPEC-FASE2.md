# MONTADOR CONECTA - Fase 2 (Médio Prazo)

## 1. Objetivo da Fase 2

Consolidar o uso da plataforma, aumentar retenção de usuários e iniciar monetização através de planos premium e assinaturas.

---

## 2. Funcionalidades

### 2.1 Planos Premium e Assinaturas

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 1.1 | Plano Básico | Acesso gratuito com funcionalidades limitadas |
| 1.2 | Plano Profissional | Acesso completo para montadores |
| 1.3 | Plano Empresarial | Acesso completo para empresas |
| 1.4 | Cobrança recorrente | Assinatura mensal/anual |
| 1.5 | Gestão de assinatura | Cancelar, upgrade, downgrade |
| 1.6 | Histórico de pagamentos | Visualizar faturas anteriores |
| 1.7 | Trial gratuito | 14 dias de teste |

### 2.2 Sistema de Reputação

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 2.1 | Badge Bronze | Montadores com score 3.0-4.0 |
| 2.2 | Badge Prata | Montadores com score 4.0-4.5 |
| 2.3 | Badge Ouro | Montadores com score 4.5-5.0 |
| 2.4 | Critérios automáticos | Cálculo baseado em avaliações |
| 2.5 | Exibição no perfil | Badge visível no perfil |
| 2.6 | Benefícios por badge | Vantagens por nível |

### 2.3 Agenda Avançada

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 3.1 | Visualização diária | Agenda do dia |
| 3.2 | Visualização semanal | Vista semanal |
| 3.3 | Visualização mensal | Calendário completo |
| 3.4 | Arraste e soltar | Reagendar compromissos |
| 3.5 | Cores por status | Diferentes cores por tipo |
| 3.6 | Conflictos | Alerta de agenda conflitante |

### 2.4 Painel Financeiro (Montador)

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 4.1 | Ganhos totais | Valor total recebido |
| 4.2 | Ganhos por período | Filtrar por data |
| 4.3 | Extrato detalhado | Lista de recebimentos |
| 4.4 | Previsão de ganhos | Próximos recebimentos |
| 4.5 | Métricas | Serviços por mês, média por serviço |

### 2.5 Anúncios Segmentados

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 5.1 | Espaços de anúncio | Área para propaganda |
| 5.2 | Segmentação geográfica | Anúncios por região |
| 5.3 | Segmentação por perfil | Anúncios por tipo de usuário |
| 5.4 | Tipos de anúncio | Banner, carousel, vídeo |

### 2.6 Suporte ao Cliente

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 6.1 | Chat em tempo real | Comunicação instantânea |
| 6.2 | Formulário de contato | ticket de suporte |
| 6.3 | FAQ | Perguntas frequentes |
| 6.4 | Central de ajuda | Base de conhecimento |
| 6.5 | Prioridade por plano | Suporte diferenciado |

### 2.7 Busca Avançada e Mapa

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 7.1 | Filtros por avaliação | Filtrar por nota mínima |
| 7.2 | Filtros por localização | Raio de distância |
| 7.3 | Filtros por habilidade | Especialidades |
| 7.4 | Filtros por preço | Faixa de valor |
| 7.5 | Mapa interativo | Visualizar no mapa |
| 7.6 | Geolocalização | Usar localização atual |

### 2.8 MONTADOR CONECTA PRO (Capacitação)

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 8.1 | Parceria Udemy | Cursos da plataforma |
| 8.2 | Parceria Senai | Cursos técnicos |
| 8.3 | Parceria Alura | Cursos online |
| 8.4 | Parceria Hotmart | Cursos diversos |
| 8.5 | Certificados | Certificação após conclusão |
| 8.6 | Selo no perfil | Exibição de certificações |
| 8.7 | Biblioteca de cursos | Catálogo integrado |

#### Cursos Sugeridos
- Elétrica básica
- Normas NR10 e NR35
- Instalação de móveis planejados
- Método 5S
- Gestão de tempo e atendimento
- Comunicação profissional
- Liderança de equipes

---

## 3. User Stories Adicionais

### 3.1 Como Empresa Assinante
- [ ] Quero assinar um plano premium
- [ ] Quero visualizar minhas faturas
- [ ] Quero cancelar minha assinatura
- [ ] Quero buscar montadores no mapa
- [ ] Quero filtrar montadores por avaliação
- [ ] Quero entrar em contato com suporte

### 3.2 Como Montador
- [ ] Quero visualizar meus ganhos
- [ ] Quero filtrar serviços por período
- [ ] Quero acessar cursos de capacitação
- [ ] Quero obter certificações
- [ ] Quero melhorar meu badge
- [ ] Quero ver minha agenda semanal

### 3.3 Como Administrador
- [ ] Quero gerenciar assinaturas
- [ ] Quero configurar planos
- [ ] Quero visualizar relatórios financeiros
- [ ] Quero gerenciar anúncios
- [ ] Quero atender suporte

---

## 4. Regras de Negócio Adicionais

| # | Regra | Descrição |
|---|-------|-----------|
| RN1 | Limite Básico | Plano gratuito limitado a 5 serviços/mês |
| RN2 | Comissão plataforma | 10% sobre cada serviço concluído |
| RN3 | Badge automático | Atualização automática conforme score |
| RN4 | Cancelamento | Período de carência de 7 dias |
| RN5 | Upgrade imediato | Acesso instantâneo após pagamento |

---

## 5. Integrações Fase 2

| Serviço | Finalidade |
|---------|------------|
| Stripe/mercadopago | Pagamentos recorrentes |
| SendGrid/Resend | E-mails transacionais |
| Twilio | SMS (alertas) |
| Mapbox/Google Maps | Mapa e geolocalização |
| Hotmart/Udemy API | Cursos (se disponível) |

---

## 6. Critérios de Aceitação

### 6.1 Planos
- [ ] Usuário consegue assinar plano
- [ ] Sistema cobra recorrentemente
- [ ] Funcionalidades liberadas conforme plano

### 6.2 Reputação
- [ ] Badge calculado automaticamente
- [ ] Exibido corretamente no perfil

### 6.3 Agenda
- [ ] Visualização funciona em todos os modos
- [ ] Reagendamento atualiza banco

### 6.4 Financeiro
- [ ] Valores corretos por período
- [ ] Extrato detalhado preciso

### 6.5 Busca
- [ ] Filtros funcionam corretamente
- [ ] Mapa exibe resultados

---

## 7. Escopo NÃO Incluído na Fase 2

- Marketplace de materiais
- Gestão de equipes
- Integração com SketchUp/Promob
- Pagamentos integrados (PIX)
- Apps mobile nativos
- IA de recomendação
- Expansão nacional
- Integração com ERP

---

## 8. Estimativa de Esforço

| Módulo | Estimativa |
|--------|------------|
| Planos Premium | 5 dias |
| Sistema de Reputação | 3 dias |
| Agenda Avançada | 5 dias |
| Painel Financeiro | 4 dias |
| Anúncios | 3 dias |
| Suporte | 4 dias |
| Busca + Mapa | 4 dias |
| MONTADOR CONECTA PRO | 5 dias |
| **Total** | **~33 dias** |

---

## 9. Dependências da Fase 1

Esta fase depende que o MVP esteja:
- [x] Autenticação completa
- [x] Gestão de serviços
- [x] Convites e participação
- [x] Execução e finalização
- [x] Avaliação obrigatória
- [x] Agenda básica
- [x] Perfil do montador
- [x] Gestão de materiais

---

*Fase 2 focado em monetização e retenção de usuários*
