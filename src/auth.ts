import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber?: string
  dateOfBirth?: Date
  address?: string
  city?: string
  country?: string
}

export async function signUp(userData: SignUpData) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  // Create new user
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
    }
  })

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  )

  // Return user data and token (excluding password)
  const { password, ...userWithoutPassword } = user
  return { user: userWithoutPassword, token }
}

export async function signIn(email: string, password: string) {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password)
  
  if (!isValidPassword) {
    throw new Error('Invalid credentials')
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  )

  // Return user data and token (excluding password)
  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword, token }
}