import {Request, Response} from 'express'
import EditarUsuarioService from '../../services/user/EditarUsuarioService'

class EditarUsuarioController {
    
  async handle(req:Request, res: Response) {
    const {id} = req.params
    const {nome, fone, cpf, cep, logradouro, numero, bairro, localidade, uf} = req.body 

    const editarUsuarioService = new EditarUsuarioService()

    try {
      const updatedUsuario = await editarUsuarioService.execute(parseInt(id),{nome, fone, cpf, cep, logradouro, numero, bairro, localidade,uf})
      return res.json({message: 'Usuario atualizado com sucesso', data: updatedUsuario })  
    } catch (error) {
       return res.status(500).json({error: 'Erro ao atualizar usuario'})
    }
 }
}

export {EditarUsuarioController}