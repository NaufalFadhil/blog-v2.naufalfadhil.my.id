import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = typeof body?.email === 'string' ? body.email.toLowerCase().trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing credentials' })
  }

  const config = useRuntimeConfig()
  const hash = createHash('sha256').update(password).digest('hex')

  if (hash !== config.authPasswordHash) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const session = await useSession(event, { password: config.sessionSecret })
  await session.update({ email })

  return { ok: true }
})
