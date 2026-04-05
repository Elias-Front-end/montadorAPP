# MONTADOR CONECTA - Arquitetura do Sistema

## 1. Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Web App   │  │  Mobile iOS │  │Mobile Android│             │
│  │  (Next.js)  │  │(React Native)│ (React Native)│             │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                              │
│                    (nginx / Cloudflare)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    NESTJS / DJANGO                        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │ Auth     │ │ Services │ │ Users    │ │ Payments │   │   │
│  │  │ Module   │ │ Module   │ │ Module   │ │ Module   │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BANCO DE DADOS                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │    Redis     │  │   AWS S3    │          │
│  │  (Principal) │  │    (Cache)  │  │  (Arquivos) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

### 2.1 Backend
| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Linguagem | Node.js | 20.x |
| Framework | NestJS | 10.x |
| ORM | Prisma | 5.x |
| Banco Dados | PostgreSQL | 15.x |
| Cache | Redis | 7.x |
| Autenticação | JWT | - |
| Documentação | Swagger | - |

### 2.2 Frontend Web
| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Framework | Next.js | 14.x |
| UI Library | React | 18.x |
| Estilização | TailwindCSS | 3.x |
| Components | shadcn/ui | - |
| Estado | Zustand | 4.x |
| Requisições | TanStack Query | 5.x |
| Formulários | React Hook Form | 7.x |
| Validação | Zod | 3.x |

### 2.3 Mobile
| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Framework | React Native | 0.74.x |
| Navigation | React Navigation | 6.x |
| Estado | Zustand | 4.x |
| HTTP | Axios | - |

### 2.4 Infraestrutura
| Componente | Serviço |
|------------|---------|
| Cloud | AWS / Vercel |
| Storage | AWS S3 |
| Email | Resend |
| Monitoramento | Sentry |
| CI/CD | GitHub Actions |

---

## 3. Estrutura de Pastas Backend

```
/src
├── /modules
│   ├── /auth
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── /strategies
│   │   └── /guards
│   ├── /users
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── /dto
│   │   └── /entities
│   ├── /services
│   │   ├── services.controller.ts
│   │   ├── services.service.ts
│   │   ├── services.module.ts
│   │   ├── /dto
│   │   └── /entities
│   ├── /evaluations
│   ├── /materials
│   ├── /calendar
│   ├── /notifications
│   └── /payments
│   ├── /subscriptions
│   └── /marketplace
├── /common
│   ├── /decorators
│   ├── /filters
│   ├── /guards
│   ├── /interceptors
│   └── /pipes
├── /config
│   ├── database.ts
│   └── redis.ts
├── /database
│   └── /migrations
└── /shared
    ├── /dto
    ├── /interfaces
    └── /utils
```

---

## 4. Estrutura de Pastas Frontend

```
/app                    # Next.js App Router
├── /(auth)
│   ├── /login
│   ├── /register
│   └── /forgot-password
├── /(dashboard)
│   ├── /dashboard
│   ├── /services
│   ├── /calendar
│   ├── /profile
│   └── /settings
├── /admin
│   ├── /users
│   ├── /services
│   └── /reports
├── layout.tsx
├── page.tsx
└── not-found.tsx

/components
├── /ui                  # Componentes base (shadcn)
├── /forms               # Formulários reutilizáveis
├── /layout              # Componentes de layout
└── /services            # Componentes de negócio

/lib
├── /api                 # Axios instance
├── /hooks                # Custom hooks
├── /utils               # Funções utilitárias
└── /constants           # Constantes

/stores                  # Zustand stores
/styles                 # Tailwind config
/types                  # TypeScript types
└── public               # Assets estáticos
```

---

## 5. Padrões de Código

### 5.1 REST API
```
GET    /api/v1/users          # Listar
GET    /api/v1/users/:id      # Detalhar
POST   /api/v1/users          # Criar
PATCH   /api/v1/users/:id     # Atualizar
DELETE /api/v1/users/:id      # Deletar
```

### 5.2 Padrao de Resposta
```typescript
// Sucesso
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Erro
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

### 5.3 Nomenclatura
- **Arquivos:** kebab-case (user.service.ts)
- **Classes/Interfaces:** PascalCase (UserService)
- **Variáveis/Funções:** camelCase (getUserById)
- **Constantes:** UPPER_SNAKE_CASE (MAX_RETRY)
- **Banco de dados:** snake_case (created_at)

---

## 6. Segurança

### 6.1 Autenticação
- JWT com access token (15min) + refresh token (7 dias)
- Refresh token armazenado em httpOnly cookie
- Logout invalida refresh token

### 6.2 Autorização
- RBAC (Role-Based Access Control)
- Roles: admin, company, montador
- Permissions por módulo

### 6.3 Outras Medidas
- Rate limiting (100 req/min)
- CORS configurado
- Helmet.js
- Input validation com Zod
- SQL injection prevention (Prisma)
- XSS prevention

---

## 7. Mensageria e Eventos

### 7.1 Eventos do Sistema
```typescript
// Eventos emitidos
- user.created
- service.created
- service.assigned
- service.completed
- evaluation.created
- payment.completed

// Handlers
- Enviar email
- Enviar push notification
- Atualizar cache
- Gerar relatório
```

### 7.2 Filas (Redis/Bull)
```typescript
- sendEmail
- processPayment
- generateReport
- cleanupCache
```

---

## 8. Escalabilidade

### 8.1 Horizontal
- Load balancer
- Multiple instances
- Auto-scaling

### 8.2 Cache
- Redis para sessões
- Redis para queries frequentes
- CDN para assets

### 8.3 Banco
- Read replicas
- Connection pooling
- Index otimizados

---

## 9. Monitoring

### 9.1 Logs
- Estruturados (JSON)
- Níveis: ERROR, WARN, INFO, DEBUG
- Aggregação: Datadog / CloudWatch

### 9.2 Métricas
- Response time
- Error rate
- Request count
- CPU/Memory usage

### 9.3 Alerts
- Slack/Discord
- Email
- SMS (crítico)

---

## 10. CI/CD Pipeline

```yaml
# GitHub Actions
1. Checkout
2. Install dependencies
3. Lint & Typecheck
4. Run tests
5. Build
6. Deploy to staging
7. Run e2e tests
8. Deploy to production
```

---

*Arquitetura sujeita a ajustes conforme evolução do projeto*
