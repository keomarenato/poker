import {Request, Response} from 'express'
import CadastroUserService from '../../services/user/CadastroUserService'

class CadastroUserController{
   async handle(req: Request, res: Response){
    const { nome, fone, cpf, cep, logradouro, numero, bairro, localidade, uf} = req.body

    const cadastroUserService = new CadastroUserService()

    const cadastroUser = await cadastroUserService.execute({
        nome, 
        fone,
        cpf,
        cep,
        logradouro,
        numero,
        bairro,
        localidade,
        uf
    })

    return res.json(cadastroUser)
 }
}

export {CadastroUserController}