import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router } from './router'
import { errorMiddleware } from './shared/filters/error.filter'

export const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1', router)

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(errorMiddleware)
