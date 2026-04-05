# EasyPanel Deploy

## 1. Preparar Repositório

Faça commit de todos os arquivos:
```bash
git add .
git commit -m "MVP Montador Conecta"
```

## 2. No EasyPanel

### Backend
1. Create new service → Git repository
2. Configure:
   - Build command: `npm install && npx prisma generate && npm run build`
   - Run command: `npm run start:prod`
   - Port: `4000`
   
3. Environment variables:
```
DATABASE_URL=postgresql://montador:montador_password@postgres:5432/montador_conecta
JWT_SECRET=montador-conecta-secret-key-production
FRONTEND_URL=http://seu-dominio:3000
NODE_ENV=production
PORT=4000
```

### PostgreSQL
1. Create new service → PostgreSQL
2. Credentials:
   - User: `montador`
   - Password: `montador_password`
   - Database: `montador_conecta`

### Frontend
1. Create new service → Git repository
2. Configure:
   - Build command: `npm install && npm run build`
   - Run command: `npm start`
   - Port: `3000`
   
3. Environment variables:
```
NEXT_PUBLIC_API_URL=http://seu-backend:4000/api/v1
```

## 3. Docker Compose (Alternativo)

Se preferir usar docker-compose no EasyPanel:

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

## 4. Acessos

- Frontend: `http://seu-servidor:3000`
- Backend API: `http://seu-servidor:4000/api/v1`
- Banco: `postgresql://montador:montador_password@localhost:5432/montador_conecta`
