import 'dotenv/config'
import { app } from './app'
import { databaseConnection } from './database/connection'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  await databaseConnection()
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📚 API: http://localhost:${PORT}/api/v1`)
  })
}

bootstrap()
