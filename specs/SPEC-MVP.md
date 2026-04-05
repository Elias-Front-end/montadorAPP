# MONTADOR CONECTA - MVP (Fase 1)

## 1. Objetivo do MVP

Validar, de forma rápida e eficiente, a conexão entre marcenarias/lojistas (contratantes) e montadores (prestadores), garantindo que seja possível publicar, executar e avaliar serviços dentro da plataforma.

**Métrica principal:** Serviços concluídos com sucesso

---

## 2. Funcionalidades Principais

### 2.1 Autenticação e Perfis

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 1.1 | Cadastro de usuário | Registro individual com email e senha |
| 1.2 | Login | Autenticação por email/senha |
| 1.3 | Tipos de perfil | Montador / Empresa / Administrador |
| 1.4 | Recuperação de senha | Via email |

### 2.2 Gestão de Serviços (Contratante)

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 2.1 | Criar serviço | Publicar novo serviço de montagem |
| 2.2 | Listar serviços | Visualizar todos os serviços criados |
| 2.3 | Editar serviço | Alterar detalhes do serviço |
| 2.4 | Excluir serviço | Remover serviço pendente |
| 2.5 | Definir prazo | Data limite para execução |
| 2.6 | Detalhes do serviço | Descrição, endereço, observações |
| 2.7 | Status do serviço | Pendente → Em Execução → Finalizado |

### 2.3 Convite e Participação de Montadores

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 3.1 | Convidar montador | Enviar convite para serviço específico |
| 3.2 | Time fixo (VIP) | Adicionar montador ao time permanente |
| 3.3 | Montador aceita | Aceitar convite do serviço |
| 3.4 | Montador recusa | Recusar convite do serviço |
| 3.5 | Atuação exclusiva | Montador vinculado ao contratante |
| 3.6 | Atuação temporária | Por serviço específico |

### 2.4 Execução de Serviços

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 4.1 | Iniciar execução | Marcar serviço como em execução |
| 4.2 | Acompanhar status | Visualizar progresso |
| 4.3 | Visualizar equipe | Ver quem está executando |
| 4.4 | Finalizar serviço | Concluir montagem |
| 4.5 | Controle de prazos | Alertas de prazo próximo |

### 2.5 Avaliação (Obrigatória)

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 5.1 | Avaliar montador | Nota de 1 a 5 estrelas |
| 5.2 | Feedback textual | Comentário sobre o serviço |
| 5.3 | Score geral | Média das avaliações recebidas |
| 5.4 | Histórico de avaliações | Lista de avaliações anteriores |

### 2.6 Painel do Montador

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 6.1 | Listar montagens | Visualizar serviços confirmados |
| 6.2 | Status por serviço | Acompanhar cada serviço |
| 6.3 | Equipe do serviço | Ver outros participantes |
| 6.4 | Prazos | Visualizar datas de entrega |

### 2.7 Agenda e Disponibilidade

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 7.1 | Calendário | Visualizar serviços agendados |
| 7.2 | Compromissos | Eventos do dia |
| 7.3 | Disponibilidade | Dias disponíveis para trabalho |

### 2.8 Perfil Profissional do Montador

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 8.1 | Avaliações | Score médio e total |
| 8.2 | Histórico | Serviços executados |
| 8.3 | Habilidades | Especialidades do montador |
| 8.4 | Contato | Dados para contato |
| 8.5 | Qualificações | Certificações e cursos |
| 8.6 | Edição de perfil | Atualizar informações |

### 2.9 Gestão de Materiais e Peças (Diferencial)

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 9.1 | Solicitar material | Pedir material para execução |
| 9.2 | Pedir peça | Solicitar peça para ajuste |
| 9.3 | Descrição detalhada | Texto explicativo |
| 9.4 | Foto opcional | Upload de imagem |

---

## 3. Fluxo Principal

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   CONTRATANTE   │     │    MONTADOR     │     │   SISTEMA       │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                      │                       │
         │  1. Publicar serviço  │                       │
         │─────────────────────>│                       │
         │                      │                       │
         │                      │  2. Ver detalhes      │
         │                      │<──────────────────────│
         │                      │                       │
         │  3. Convite          │                       │
         │<─────────────────────│                       │
         │                      │                       │
         │  4. Selecionar       │                       │
         │─────────────────────>│                       │
         │                      │                       │
         │                      │  5. Aceitar/Recusar   │
         │                      │──────────────────────>│
         │                      │                       │
         │  6. Notificação       │                       │
         │<─────────────────────│                       │
         │                      │                       │
         │                      │  7. Iniciar execução  │
         │                      │──────────────────────>│
         │                      │                       │
         │                      │  8. Finalizar         │
         │                      │──────────────────────>│
         │                      │                       │
         │  9. Avaliar          │                       │
         │<─────────────────────│                       │
         │                      │                       │
         │  10. Score atualizado│                       │
         │<─────────────────────│                       │
```

---

## 4. User Stories

### 4.1 Como Empresa (Contratante)
- [ ] Quero me cadastrar e fazer login na plataforma
- [ ] Quero criar um serviço de montagem com detalhes e prazo
- [ ] Quero visualizar todos os serviços que criei
- [ ] Quero enviar convite para um montador específico
- [ ] Quero adicionar um montador ao meu time fixo
- [ ] Quero acompanhar o status de cada serviço
- [ ] Quero avaliar o montador após conclusão
- [ ] Quero solicitar materiais/peças com foto opcional

### 4.2 Como Montador
- [ ] Quero me cadastrar e fazer login na plataforma
- [ ] Quero visualizar os serviços que recebi convite
- [ ] Quero aceitar ou recusar um convite
- [ ] Quero ver minha agenda de serviços
- [ ] Quero atualizar minha disponibilidade
- [ ] Quero iniciar e finalizar um serviço
- [ ] Quero editar meu perfil profissional
- [ ] Quero ver minhas avaliações e score

### 4.3 Como Administrador
- [ ] Quero validar novos usuários
- [ ] Quero visualizar todos os serviços
- [ ] Quero intervir em serviços com problemas
- [ ] Quero resolver conflitos entre partes

---

## 5. Regras de Negócio

| # | Regra | Descrição |
|---|-------|-----------|
| RN1 | Avaliação obrigatória | Contratante deve avaliar montador apósfinalização |
| RN2 | Convite único | Montador não pode aceitar dois convites para mesma data |
| RN3 | Prazo automático | Sistema alerta 24h antes do prazo |
| RN4 | Perfil incompleto | Montador com perfil incompleto não recebeconvites |
| RN5 | Cancelamento | Apenas serviços pendentes podem ser cancelados |

---

## 6. Critérios de Aceitação

### 6.1 Autenticação
- [ ] Usuário consegue se cadastrar com email válido
- [ ] Usuário consegue fazer login com credenciais corretas
- [ ] Usuário recebe erro ao inserir credenciais incorretas
- [ ] Usuário consegue recuperar senha via email

### 6.2 Serviços
- [ ] Contratante consegue criar serviço com todos os campos
- [ ] Contratante consegue listar seus serviços
- [ ] Contratante consegue editar serviço pendente
- [ ] Status muda conforme evolução

### 6.3 Convites
- [ ] Contratante consegue enviar convite
- [ ] Montador recebe notificação de convite
- [ ] Montador consegue aceitar/recusar
- [ ] Sistema atualiza status do convite

### 6.4 Execução
- [ ] Montador consegue iniciar execução
- [ ] Montador consegue finalizar execução
- [ ] Contratante visualiza status atualizado

### 6.5 Avaliação
- [ ] Apenas contratante pode avaliar
- [ ] Avaliação é obrigatória após finalização
- [ ] Score do montador é atualizado

---

## 7. Escopo NÃO Incluído no MVP

- Planos pagos e assinaturas
- Sistema de reputação (Bronze/Prata/Ouro)
- Agenda avançada com visualização
- Painel financeiro
- Anúncios segmentados
- Chat de suporte
- Mapa em tempo real
- Marketplace de materiais
- Integração com SketchUp/Promob
- Pagamentos integrados
- Apps mobile
- IA de recomendação
- Programa de certificação (PRO)

---

## 8. Estimativa de Esforço

| Módulo | Estimativa |
|--------|------------|
| Autenticação | 3 dias |
| Gestão de Serviços | 5 dias |
| Convites | 3 dias |
| Execução | 2 dias |
| Avaliação | 2 dias |
| Agenda | 3 dias |
| Perfil | 2 dias |
| Materiais | 2 dias |
| **Total** | **~22 dias** |

---

*MVP focado em validar o fluxo completo: Publicar → Designar → Executar → Finalizar → Avaliar*
