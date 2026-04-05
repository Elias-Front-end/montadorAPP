export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'montador-conecta-secret-key',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  cookieName: 'refresh_token'
}

export const jwtConfigProduction = {
  ...jwtConfig,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/'
  }
}
