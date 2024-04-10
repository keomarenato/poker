import prismaClient from "../../prisma";

interface UserRequest {
 nome: string;
 fone: number;
 cpf: number;
 cep: string;
 logradouro: string;
 numero: string;
 bairro: string;
 localidade: string;
 uf: string
}

class CadastroUserService{
    
 async execute({nome, fone, cpf, cep, logradouro, numero, bairro, localidade, uf}: UserRequest) {
   
    const novoUsuario = await prismaClient.cadastroUser.create({
      data: {
        nome: nome,
        fone: fone,
        cpf: cpf,
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        localidade: localidade,
        uf: uf
      }
    })

    return novoUsuario
 }

}



export default CadastroUserService