# MONTADOR CONECTA - Manual de Deploy

## Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- npm ou yarn

---

## Configuração do Banco

1. Criar banco de dados PostgreSQL:
```sql
CREATE DATABASE montador_conecta;
```

2. Configurar variáveis de ambiente:
```env
# Backend (.env)
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/montador_conecta
JWT_SECRET=sua-chave-secreta-aqui
FRONTEND_URL=https://seu-dominio.com
```

---

## Backend (Railway/Vercel/Render)

### Build:
```bash
cd backend
npm install
npx prisma generate
npm run build
npm run start:prod
```

### Variáveis de ambiente necessárias:
- `DATABASE_URL` - Conexão PostgreSQL
- `JWT_SECRET` - Chave para tokens JWT
- `FRONTEND_URL` - URL do frontend (para CORS)
- `PORT` - Porta do servidor (padrão: 4000)

---

## Frontend (Vercel)

### Build:
```bash
cd frontend
npm install
npm run build
```

### Variáveis de ambiente:
- `NEXT_PUBLIC_API_URL` - URL da API (ex: https://api.seudominio.com/api/v1)

---

## Deploy Rápido

### Railway (Recomendado)
1. Conectar repositório GitHub
2. Adicionar variáveis de ambiente
3. Deploy automático

### Vercel (Frontend)
1. Importar projeto
2. Configurar variáveis
3. Deploy automático

---

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /auth/register | Cadastro |
| POST | /auth/login | Login |
| POST | /auth/forgot-password | Recuperação de senha |
| POST | /auth/reset-password | Nova senha |
| POST | /auth/refresh | Refresh token |
| GET | /users/me | Perfil atual |
| PATCH | /users/me | Atualizar perfil |
| GET | /users/montadores | Buscar montadores |
| GET | /services | Lista serviços (empresa) |
| POST | /services | Criar serviço |
| GET | /services/:id | Detalhes serviço |
| PATCH | /services/:id | Atualizar serviço |
| DELETE | /services/:id | Deletar serviço |
| POST | /services/:id/convidar | Convidar montador |
| POST | /services/:id/iniciar | Iniciar execução |
| POST | /services/:id/finalizar | Finalizar serviço |
| GET | /services/convites | Lista convites (montador) |
| POST | /services/convites/:id/responder | Responder convite |
| POST | /evaluations | Criar avaliação |
| POST | /calendar | Criar evento |
| GET | /calendar | Lista eventos |
| POST | /materials | Solicitar material |

---

## Fluxo de Uso

### 1. Empresa (Contratante)
- Cadastrar → Login → Criar Serviço → Convidar Montador → Acompanhar → Avaliar

### 2. Montador
- Cadastrar → Login → Ver Convites → Aceitar → Executar → Finalizar

---

## Troubleshooting

### Erro de conexão banco
- Verificar DATABASE_URL
- Verificar se PostgreSQL está rodando

### Erro CORS
- Verificar FRONTEND_URL no backend

### Erro de autenticação
- Verificar JWT_SECRET
- Limpar cookies/localStorage

---

## Produção

Para produção, considere:
- [ ] Configurar SMTP para emails
- [ ] Usar CDN para imagens
- [ ] Configurar SSL/HTTPS
- [ ] Setup de monitoramento (Sentry)
- [ ] Backup automático do banco
