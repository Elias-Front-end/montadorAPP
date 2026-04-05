import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../../database/connection'
import { AppError } from '../../shared/filters/error.filter'
import { jwtConfig, jwtConfigProduction } from '../../config/jwt.config'
import type { RegisterInput, LoginInput } from './auth.dto'
import type { User } from '@prisma/client'

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: input.email },
    })

    if (existingUser) {
      throw new AppError(400, 'EMAIL_ALREADY_EXISTS', 'Email já cadastrado')
    }

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = await prismaClient.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
        phone: input.phone,
        type: input.type,
      },
    })

    if (input.type === 'montador') {
      await prismaClient.montadorProfile.create({
        data: { userId: user.id },
      })
    } else if (input.type === 'empresa') {
      await prismaClient.company.create({
        data: { userId: user.id },
      })
    }

    const tokens = this.generateTokens(user)

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    }
  }

  async login(input: LoginInput) {
    const user = await prismaClient.user.findUnique({
      where: { email: input.email },
    })

    if (!user) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Email ou senha inválidos')
    }

    const validPassword = await bcrypt.compare(input.password, user.passwordHash)

    if (!validPassword) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Email ou senha inválidos')
    }

    if (user.status !== 'active') {
      throw new AppError(403, 'ACCOUNT_INACTIVE', 'Conta inativa ou bloqueada')
    }

    const tokens = this.generateTokens(user)

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    }
  }

  async forgotPassword(email: string) {
    const user = await prismaClient.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { message: 'Se o email existir, você receberá instruções para redefinir a senha' }
    }

    const resetToken = jwt.sign(
      { userId: user.id, type: 'password_reset' },
      jwtConfig.secret,
      { expiresIn: '1h' }
    )

    console.log(`🔐 Token de recuperação: ${resetToken}`)
    console.log(`📧 Enviar email para ${email} com token de recuperação`)

    return { message: 'Se o email existir, você receberá instruções para redefinir a senha', resetToken }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = jwt.verify(token, jwtConfig.secret) as { userId: string; type: string }

      if (payload.type !== 'password_reset') {
        throw new AppError(400, 'INVALID_TOKEN', 'Token inválido')
      }

      const user = await prismaClient.user.findUnique({
        where: { id: payload.userId },
      })

      if (!user) {
        throw new AppError(404, 'NOT_FOUND', 'Usuário não encontrado')
      }

      const passwordHash = await bcrypt.hash(newPassword, 10)

      await prismaClient.user.update({
        where: { id: user.id },
        data: { passwordHash },
      })

      return { message: 'Senha redefinida com sucesso' }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError(400, 'INVALID_TOKEN', 'Token inválido ou expirado')
      }
      throw error
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, jwtConfig.secret) as { userId: string }

      const user = await prismaClient.user.findUnique({
        where: { id: payload.userId },
      })

      if (!user || user.status !== 'active') {
        throw new AppError(401, 'INVALID_TOKEN', 'Token inválido')
      }

      return this.generateTokens(user)
    } catch {
      throw new AppError(401, 'INVALID_TOKEN', 'Token inválido ou expirado')
    }
  }

  async logout(_userId: string) {
    return { message: 'Logout realizado com sucesso' }
  }

  private generateTokens(user: User) {
    const accessToken = jwt.sign(
      { userId: user.id, type: user.type },
      jwtConfig.secret,
      { expiresIn: jwtConfig.accessTokenExpiry }
    )

    const refreshToken = jwt.sign(
      { userId: user.id, type: user.type },
      jwtConfig.secret,
      { expiresIn: jwtConfig.refreshTokenExpiry }
    )

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: jwtConfig.accessTokenExpiry,
    }
  }

  private sanitizeUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      type: user.type,
      status: user.status,
    }
  }
}

export const authService = new AuthService()
