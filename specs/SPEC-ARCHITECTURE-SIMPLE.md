# Montador Conecta - Arquitetura Simplificada

## Princípios

1. **Simples** - Estrutura clara, fácil de entender
2. **Manutenível** - Código organizado, fácil de alterar
3. **Escalável** - Suporta crescimento gradual
4. **Funcional** - Focado em entregar valor

---

## Stack Tecnológico

| Camada | Tecnologia | Por quê |
|--------|------------|---------|
| Backend | Node.js + Express | Simples, popular, fácil contratar |
| Banco | PostgreSQL | Robustez, relacionamentos |
| ORM | Prisma | Type-safe, migrations easy |
| Frontend | Next.js (App Router) | SSR, roteamento simples |
| UI | TailwindCSS | Manutenção de estilos |
| Auth | JWT | Simples, stateless |
| Deploy | Vercel (Frontend) + Railway (Backend) | Deploy simples |

---

## Estrutura de Pastas

### Backend
```
/backend
├── /src
│   ├── /config          # Configurações
│   ├── /modules         # Módulos/features
│   │   ├── /auth
│   │   ├── /users
│   │   ├── /services
│   │   ├── /evaluations
│   │   └── /calendar
│   ├── /shared          # Código compartilhado
│   │   ├── /decorators
│   │   ├── /filters
│   │   └── /utils
│   ├── /database        # Prisma + migrations
│   └── main.ts          # Entry point
├── prisma/
│   └── schema.prisma    # Schema do banco
├── .env                 # Variáveis de ambiente
└── package.json
```

### Frontend
```
/frontend
├── /src
│   ├── /app             # Next.js App Router
│   │   ├── /(auth)      # Rotas auth
│   │   ├── /(dashboard) # Rotas protegidas
│   │   └── layout.tsx
│   ├── /components      # Componentes React
│   │   ├── /ui          # shadcn/ui
│   │   └── /features    # Componentes de negócio
│   ├── /lib              # Utilitários
│   │   ├── api.ts       # Axios config
│   │   └── utils.ts
│   └── /types           # Types
├── .env.local
├── next.config.js
└── package.json
```

---

## Arquitetura Backend

### Módulos (Modular monolith)

Cada módulo é autocontido:

```
/modules/users
├── users.controller.ts   # Endpoints REST
├── users.service.ts      # Lógica de negócio
├── users.module.ts       # Definição do módulo
├── users.dto.ts          # Data Transfer Objects
├── users.entity.ts       # Tipos/entities
└── users.repository.ts   # Acesso ao banco
```

### Padrão de Repository

```typescript
// repository.ts
export class UsersRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({ data })
  }
}

// service.ts
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(data: CreateUserDTO) {
    // lógica de negócio
    return this.repository.create(data)
  }
}
```

---

## Arquitetura Frontend

### Pastas por feature (NEXT.JS)

```
/app
├── page.tsx                    # Landing page
├── login/
│   └── page.tsx
├── dashboard/
│   ├── page.tsx               # Dashboard principal
│   ├── services/
│   │   ├── page.tsx           # Lista serviços
│   │   └── [id]/
│   │       └── page.tsx      # Detalhe serviço
│   ├── profile/
│   │   └── page.tsx
│   └── layout.tsx             # Layout com auth check
```

### Componentes de Feature

```typescript
// /components/features/services/
├── ServiceCard.tsx
├── ServiceForm.tsx
├── ServiceList.tsx
├── ServiceFilters.tsx
└── index.ts
```

---

## Banco de Dados

### Schema Prisma (Simplificado)

```prisma
// models principais
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  type      UserType
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  montador  MontadorProfile?
  company   Company?
}

model MontadorProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  habilidades     String[]
  avaliacaoMedia  Float    @default(0)
  user            User     @relation(fields: [userId], references: [id])
  services        ServiceParticipant[]
  evaluations     Evaluation[]
}

model Service {
  id          String        @id @default(cuid())
  titulo      String
  descricao   String?
  status      ServiceStatus
  companyId   String
  company     Company       @relation(fields: [companyId], references: [id])
  participants ServiceParticipant[]
  createdAt   DateTime      @default(now())
}

// outras entidades...
```

---

## API REST

### Prefix: `/api/v1`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /auth/login | Login |
| POST | /auth/register | Cadastro |
| GET | /users/me | Usuário atual |
| GET | /services | Lista serviços |
| POST | /services | Cria serviço |
| GET | /services/:id | Detalhe serviço |
| POST | /services/:id/invite | Convidar montador |
| POST | /services/:id/complete | Finalizar |
| POST | /evaluations | Avaliar montador |
| GET | /calendar | Agenda |

### Resposta Padrão

```json
{
  "success": true,
  "data": { },
  "message": "OK"
}

{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Recurso não encontrado"
  }
}
```

---

## Autenticação

### JWT Simples

```
Access Token: 15 min (headers)
Refresh Token: 7 dias (httpOnly cookie)
```

### Fluxo

```
1. Login → Access + Refresh Token
2. Request → Authorization: Bearer <token>
3. Token expirou → Refresh automático
4. Logout → Invalida refresh token
```

---

## Configuração de Ambiente

### Variáveis Essenciais

```env
# Backend
DATABASE_URL=postgresql://...
JWT_SECRET=sua-chave-secreta
FRONTEND_URL=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

---

## Deploy

### Backend (Railway/VPS)
```
npm run build
npm run start:prod
```

### Frontend (Vercel)
```
Push para main → Deploy automático
```

---

## Escalabilidade

### Nível 1: Monolito Simples
- Backend + Frontend
- Um servidor
- Banco único

### Nível 2: Separação
- Backend separado
- CDN para assets
- Redis para cache

### Nível 3: Microsserviços
- Dividir por domínio
- Message queue
- Multiple réplicas

---

## Manutenção

### Boas Práticas

1. **Commits pequenos** - Uma tarefa por commit
2. **Code review** - Sempre revisar
3. **Testes** - unitários nos services
4. **Docs** - README atualizado
5. **Types** - TypeScript estrito

### Estrutura de Branch

```
main
├── develop
│   ├── feature/nova-funcionalidade
│   ├── fix/correcao-bug
│   └── refactor/melhoria-codigo
```

---

## Resumo

| Aspecto | Abordagem |
|---------|------------|
| Backend | Express + Prisma |
| Frontend | Next.js + Tailwind |
| Banco | PostgreSQL único |
| Auth | JWT simples |
| Deploy | Vercel + Railway |
| Escalabilidade | Monolito → Separar quando necessário |

---

*Arquitetura focada em entregar valor rápido e evoluir conforme necessidade*
