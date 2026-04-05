# VARIÁVEIS DE AMBIENTE - EASY PANEL

## BACKEND

```
# Database
DATABASE_URL=postgresql://montador:montador_password@postgres:5432/montador_conecta

# Autenticação
JWT_SECRET=montador-conecta-secret-key-production
JWT_SECRET=GenerateUmaSenhaAleatoriaAqui32Caracteres

# Configuração
NODE_ENV=production
PORT=4000
FRONTEND_URL=http://SEU-DOMINIO:3000

# Observação: Gere uma JWT_SECRET segura com:
# openssl rand -base64 32
```

---

## FRONTEND

```
NEXT_PUBLIC_API_URL=http://SEU-DOMINIO-BACKEND:4000/api/v1
```

---

## POSTGRESQL (EasyPanel)

```
POSTGRES_USER=montador
POSTGRES_PASSWORD=montador_password
POSTGRES_DB=montador_conecta
```

---

## RESUMO DAS VARIÁVEIS

### Backend Service
| Variável | Valor |
|----------|-------|
| DATABASE_URL | `postgresql://montador:montador_password@postgres:5432/montador_conecta` |
| JWT_SECRET | *(gere uma nova)* |
| NODE_ENV | `production` |
| PORT | `4000` |
| FRONTEND_URL | `http://seu-dominio:3000` |

### Frontend Service
| Variável | Valor |
|----------|-------|
| NEXT_PUBLIC_API_URL | `http://seu-dominio-backend:4000/api/v1` |

### PostgreSQL Service
| Variável | Valor |
|----------|-------|
| POSTGRES_USER | `montador` |
| POSTGRES_PASSWORD | `montador_password` |
| POSTGRES_DB | `montador_conecta` |

---

## GERAR JWT_SECRET

```bash
# No terminal
openssl rand -base64 32
```

Exemplo de resultado:
```
JWT_SECRET=YXBsaWNhdGlvbi1tb250YWRvci1jb25lY3RhLXNlY3JldA==
```
