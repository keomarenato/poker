import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        // verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorrect")
        }

        // verificar se esse email já está cadastrado no banco
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email ja existe no banco")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
               name: name,
               email: email,
               password: passwordHash,
               created_at: new Date(), 
               updated_at: new Date()  
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true, 
                updated_at: true        
            }
        })

        return user
    }
}

export { CreateUserService }