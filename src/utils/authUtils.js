import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  return jwt.sign({
    id: user._id,
    email: user.email},
    "kitri_secret", { expiresIn : '10h' })
}

export function generateRefreshToken(user) {
  return jwt.sign({
    id: user._id,
    email: user.email},
    "kitri_secret2", { expiresIn : '1d'})
}