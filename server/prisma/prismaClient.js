//ORM connexion
//Initialize ORM instance
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],  errorFormat: "minimal",}
)

module.exports= {
    prisma
}