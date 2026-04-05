# MONTADOR CONECTA - Banco de Dados

## 1. Visão Geral

**Banco:** PostgreSQL 15.x  
**ORM:** Prisma 5.x  
**Hosting:** AWS RDS / Supabase  

---

## 2. Schema do Banco

```sql
-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

## 3. Entidades

### 3.1 User (Usuário)

```typescript
// users
- id              UUID        PRIMARY KEY
- email           VARCHAR(255) UNIQUE NOT NULL
- password_hash   VARCHAR(255) NOT NULL
- name            VARCHAR(255) NOT NULL
- phone           VARCHAR(20)
- type            ENUM('montador', 'empresa', 'admin')
- status          ENUM('pending', 'active', 'inactive', 'blocked')
- email_verified  BOOLEAN     DEFAULT FALSE
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.2 PerfilMontador (Perfil do Montador)

```typescript
// montador_profiles
- id              UUID        PRIMARY KEY
- user_id         UUID        FOREIGN KEY → users.id
- cpf             VARCHAR(14) UNIQUE
- cnpj            VARCHAR(18)
- foto_perfil     VARCHAR(500)
- bio             TEXT
- habilidades     TEXT[]      // array de strings
- especialidades  TEXT[]      // array de strings
- avaliacao_media DECIMAL(3,2) DEFAULT 0
- total_avaliacoes INTEGER    DEFAULT 0
- badge           ENUM('none', 'bronze', 'prata', 'ouro')
- plano           ENUM('basico', 'profissional') DEFAULT 'basico'
- disponibilidade JSON        // { "monday": [...], "tuesday": [...] }
- endereco        JSON        // { "rua": "", "cidade": "", "estado": "", "cep": "", "lat": "", "lng": "" }
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.3 Empresa (Contratante)

```typescript
// companies
- id              UUID        PRIMARY KEY
- user_id         UUID        FOREIGN KEY → users.id
- cnpj            VARCHAR(18) UNIQUE
- nome_fantasia   VARCHAR(255)
- razao_social    VARCHAR(255)
- foto_logo       VARCHAR(500)
- endereco        JSON
- telefone        VARCHAR(20)
- plano           ENUM('basico', 'empresarial') DEFAULT 'basico'
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.4 Servico (Serviço)

```typescript
// services
- id              UUID        PRIMARY KEY
- company_id      UUID        FOREIGN KEY → companies.id
- titulo          VARCHAR(255) NOT NULL
- descricao       TEXT
- endereco        JSON
- data_inicio     DATE
- data_fim        DATE
- prazo           DATETIME
- status          ENUM('pendente', 'em_execucao', 'finalizado', 'cancelado')
- valor           DECIMAL(10,2)
- observacoes     TEXT
- prioridade     ENUM('baixa', 'media', 'alta', 'urgente')
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.5 ParticipacaoServico (Participação em Serviço)

```typescript
// service_participations
- id                      UUID        PRIMARY KEY
- service_id              UUID        FOREIGN KEY → services.id
- montador_id             UUID        FOREIGN KEY → montador_profiles.id
- funcao                  ENUM('titular', 'auxiliar')
- status_convite          ENUM('pendente', 'aceito', 'recusado')
- data_inicio_execucao    DATETIME
- data_fim_execucao       DATETIME
- created_at              TIMESTAMP   DEFAULT NOW()
- updated_at              TIMESTAMP   DEFAULT NOW()
```

### 3.6 Avaliacao (Avaliação)

```typescript
// evaluations
- id              UUID        PRIMARY KEY
- service_id      UUID        FOREIGN KEY → services.id
- montador_id     UUID        FOREIGN KEY → montador_profiles.id
- company_id      UUID        FOREIGN KEY → companies.id
- nota            INTEGER     NOT NULL CHECK (nota >= 1 AND nota <= 5)
- comentario      TEXT
- created_at      TIMESTAMP   DEFAULT NOW()
```

### 3.7 SolicitacaoMaterial (Solicitação de Material)

```typescript
// material_requests
- id              UUID        PRIMARY KEY
- service_id      UUID        FOREIGN KEY → services.id
- company_id      UUID        FOREIGN KEY → companies.id
- montador_id     UUID        FOREIGN KEY → montador_profiles.id
- tipo            ENUM('material', 'peca')
- descricao       TEXT        NOT NULL
- foto_url        VARCHAR(500)
- status          ENUM('pendente', 'aprovado', 'rejeitado', 'comprado')
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.8 Agenda (Agenda)

```typescript
// calendars
- id              UUID        PRIMARY KEY
- montador_id     UUID        FOREIGN KEY → montador_profiles.id
- service_id      UUID        FOREIGN KEY → services.id
- data            DATE        NOT NULL
- hora_inicio     TIME
- hora_fim        TIME
- tipo            ENUM('agendamento', 'disponivel', 'feriado')
- titulo          VARCHAR(255)
- descricao       TEXT
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.9 Convite (Convite)

```typescript
// invites
- id              UUID        PRIMARY KEY
- company_id      UUID        FOREIGN KEY → companies.id
- montador_id     UUID        FOREIGN KEY → montador_profiles.id
- tipo            ENUM('servico', 'time_fixo')
- service_id      UUID        FOREIGN KEY → services.id (nullable)
- status          ENUM('pendente', 'aceito', 'recusado', 'expirado')
- mensagem        TEXT
- created_at      TIMESTAMP   DEFAULT NOW()
- expires_at      DATETIME
```

### 3.10 Assinatura (Assinatura)

```typescript
// subscriptions
- id              UUID        PRIMARY KEY
- user_id         UUID        FOREIGN KEY → users.id
- plano           ENUM('basico', 'profissional', 'empresarial')
- status          ENUM('active', 'past_due', 'canceled', 'trialing')
- start_date      DATE
- end_date        DATE
- valor           DECIMAL(10,2)
- periodo         ENUM('mensal', 'anual')
- created_at      TIMESTAMP   DEFAULT NOW()
- updated_at      TIMESTAMP   DEFAULT NOW()
```

### 3.11 Fatura (Fatura)

```typescript
// invoices
- id              UUID        PRIMARY KEY
- subscription_id UUID        FOREIGN KEY → subscriptions.id
- user_id         UUID        FOREIGN KEY → users.id
- valor           DECIMAL(10,2)
- status          ENUM('paid', 'pending', 'failed', 'refunded')
- data_pagamento  DATE
- data_vencimento DATE
- link_pagamento  VARCHAR(500)
- created_at      TIMESTAMP   DEFAULT NOW()
```

### 3.12 Notificacao (Notificação)

```typescript
- id              UUID        PRIMARY KEY
- user_id         UUID        FOREIGN KEY → users.id
- titulo          VARCHAR(255)
- mensagem        TEXT
- tipo            ENUM('convite', 'avaliacao', 'servico', 'sistema', 'pagamento')
- lida            BOOLEAN     DEFAULT FALSE
- created_at      TIMESTAMP   DEFAULT NOW()
```

### 3.13 Certificate (Certificado)

```typescript
// certificates
- id              UUID        PRIMARY KEY
- montador_id     UUID        FOREIGN KEY → montador_profiles.id
- curso_nome      VARCHAR(255)
- plataforma      VARCHAR(255)
- data_conclusao  DATE
- url_certificado VARCHAR(500)
- created_at      TIMESTAMP   DEFAULT NOW()
```

---

## 4. Relacionamentos

```sql
-- USER → MONTADOR
users 1:1 montador_profiles

-- USER → EMPRESA
users 1:1 companies

-- EMPRESA → SERVIÇO
companies 1:N services

-- SERVIÇO → PARTICIPAÇÃO
services N:N montador_profiles (via service_participations)

-- SERVIÇO → AVALIAÇÃO
services 1:N evaluations

-- SERVIÇO → SOLICITAÇÃO MATERIAL
services 1:N material_requests

-- SERVIÇO → AGENDA
services N:N calendars

-- MONTADOR → AGENDA
montador_profiles 1:N calendars

-- CONVITE
companies N:N montador_profiles (via invites)

-- ASSINATURA
users 1:N subscriptions
```

---

## 5. Índices

```sql
-- Autenticação
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(type);
CREATE INDEX idx_users_status ON users(status);

-- Serviços
CREATE INDEX idx_services_company ON services(company_id);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_prazo ON services(prazo);

-- Avaliações
CREATE INDEX idx_evaluations_montador ON evaluations(montador_id);
CREATE INDEX idx_evaluations_service ON evaluations(service_id);

-- Agenda
CREATE INDEX idx_calendars_montador ON calendars(montador_id);
CREATE INDEX idx_calendars_data ON calendars(data);

-- Buscas
CREATE INDEX idx_montador_especialidades ON montador_profiles USING GIN(especialidades);
CREATE INDEX idx_montador_habilidades ON montador_profiles USING GIN(habilidades);
CREATE INDEX idx_montador_badge ON montador_profiles(badge);
```

---

## 6. migrations

### Migration 001 - Initial Schema
- users
- montador_profiles
- companies
- services
- service_participations
- evaluations
- material_requests
- calendars
- invites

### Migration 002 - Payments
- subscriptions
- invoices

### Migration 003 - Notifications
- notifications
- certificates

---

## 7. Modelos Prisma

```typescript
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserType {
  montador
  empresa
  admin
}

enum UserStatus {
  pending
  active
  inactive
  blocked
}

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  passwordHash    String    @map("password_hash")
  name            String
  phone           String?
  type            UserType
  status          UserStatus @default(pending)
  emailVerified   Boolean   @default(false) @map("email_verified")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  montadorProfile MontadorProfile?
  company         Company?
  subscriptions   Subscription[]
  notifications   Notification[]

  @@map("users")
}
```

---

## 8. Dados de Exemplo (Seed)

```typescript
// Seed para desenvolvimento
const users = [
  { email: 'admin@montadorconecta.com.br', type: 'admin' },
  { email: 'empresa@exemplo.com', type: 'empresa' },
  { email: 'montador@exemplo.com', type: 'montador' },
]
```

---

## 9. Politicas de Backup

- Backup diário automático (retention 30 dias)
- Backup manual antes de migrations
- Point-in-time recovery (7 dias)
- Teste de restore mensal

---

## 10. Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/montador_conecta
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://localhost:6379
```

---

*Schema sujeito a ajustes conforme evolução do projeto*
