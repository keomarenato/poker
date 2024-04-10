import {Request, Response} from 'express'
import GetUsuarioByIdService from '../../services/user/GetUsuarioByIdService'

class GetUsuarioByIdController {
 async handle(req: Request, res: Response) {
    const {id} = req.params  

    const getUsuarioByIdService = new GetUsuarioByIdService()

    try {
      const usuarioId = await getUsuarioByIdService.execute(parseInt(id)) 
      return res.json(usuarioId) 
    } catch (error) {
       return res.status(500).json({error: 'Erro ao buscar um usuario por ID'}) 
    }
  }
}

export {GetUsuarioByIdController}