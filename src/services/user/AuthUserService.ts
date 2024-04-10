import prismaClient from "../../prisma";
import {compare} from 'bcryptjs'
import {SignOptions, sign} from 'jsonwebtoken'

interface AuthRequest {
 email: string
 password: string
}

class AuthUserService{
 async execute({email, password}: AuthRequest) {
    
  //Verificar se o email já existe
   const user = await prismaClient.user.findFirst({
    where:{
      email: email
    }
   })
    
  // Tentando logar com usuario que não existe no banco 
   if(!user) {
    throw new Error("User/password incorrect")
   }

   // Verificar se a senha está correta
   const passwordMatch = await compare(password, user.password)
   
   // Se a senhão não for igual que esta no banco
   if(!passwordMatch){
    throw new Error("User/password incorrect")
   }
   
   // gerar um token JWT e devolver os dados do usuario
   const token = sign(
    {
      name: user.name,
      email: user.email
    }, 
     process.env.JWT_SECRET,
     {
      subject: user.id.toString(),
      expiresIn: '30d',
     } as SignOptions // Adicione esta parte para indicar ao TypeScript o tipo correto das opções
   )
  
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
 }
}

export {AuthUserService}