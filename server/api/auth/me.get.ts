export default defineEventHandler(async (event) => {
  const session = await useSession(event, { password: useRuntimeConfig().sessionSecret })
  if (!session.data.email) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }
  return { email: session.data.email as string }
})
