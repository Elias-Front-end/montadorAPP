import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'
import { AppError } from '../filters/error.filter'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    type: string
    email?: string
    role?: string
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'UNAUTHORIZED', 'Token não fornecido')
    }

    const token = authHeader.substring(7)

    const payload = jwt.verify(token, jwtConfig.secret) as { userId: string; type: string }

    req.user = {
      userId: payload.userId,
      type: payload.type,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, 'INVALID_TOKEN', 'Token inválido'))
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError(401, 'TOKEN_EXPIRED', 'Token expirado'))
    }
    next(error)
  }
}

export function requireType(...types: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, 'UNAUTHORIZED', 'Não autenticado'))
    }

    if (!types.includes(req.user.type)) {
      return next(new AppError(403, 'FORBIDDEN', 'Acesso não permitido'))
    }

    next()
  }
}
