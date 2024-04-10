import {Router, Request, Response} from 'express'

import { CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'

import { CadastroUserController } from './controllers/user/CadastroUserController'
import { ListUsuarioController } from './controllers/user/ListUsuarioController'
import DelUsuarioService from './services/user/DelUsuarioService'
import { EditarUsuarioController } from './controllers/user/EditarUsuarioController'
import { GetUsuarioByIdController } from './controllers/user/GetUsuarioByIdController'
 
import CampeonatoController from './controllers/campeonato/CampeonatoController'

import CampeonatoService from './services/campeonato/CampeonatoService'
 


const router = Router()


router.post('/users',   new   CreateUserController().handle)
router.post('/session', new   AuthUserController().handle)

router.post('/cadastroUser', new CadastroUserController().handle)
router.get('/cadastroUser', new ListUsuarioController().handle)

router.delete('/cadastroUser/:id', async (req, res) => {
  const {id} = req.params

  try {
    const delUsuarioService = new DelUsuarioService()
    await delUsuarioService.execute(parseInt(id))
    return res.json({message: 'Usuario excluido com sucesso'})

  } catch (error) {
    return res.status(500).json({error: 'Erro ao excluir usuário '})
  }
})

router.put('/cadastroUser/:id', new EditarUsuarioController().handle)
router.get('/cadastroUser/:id', new GetUsuarioByIdController().handle)

 

// Rota para criar um novo campeonato, e listar todos campeonatos
router.post('/campeonatos', new CampeonatoController().criarCampeonato);
router.get('/campeonatos', new CampeonatoController().listarCampeonatosEParticipantes);



router.get('/listarCampeonatosAtivos', new CampeonatoController().listarAtivos);
router.get('/campeonatos/:campeonatoId', new CampeonatoController().buscarCampeonato);

router.get('/campeonatosInativos', new CampeonatoController().listarInativos);
router.get('/campeonatosFinalizados', new CampeonatoController().listarCampeonatosFinalizados);

router.put('/campeonatos/:id/status', new CampeonatoController().atualizarStatusCampeonato);
router.put('/campeonatos/:id/false', new CampeonatoController().atualizarStatusCampeonatoPorFalse);

router.put('/campeonatosPorId/:campeonatoId', new CampeonatoController().editarCampeonato);
 
router.delete('/campeonatos/:campeonatoId', new CampeonatoController().deletarCampeonato);

// Rota para adicionar uma partida a um campeonato existente
router.post('/campeonatos/:campeonatoId/partidas', new CampeonatoController().adicionarPartida);
 
router.delete('/campeonatos/:campeonatoId/partidas/:partidaId/participantes/:participanteId', new CampeonatoController().removerParticipanteDaPartidaController);

router.patch('/campeonatos/:campeonatoId/partidas/:partidaId/valorTotal', async (req, res) => {
  const partidaId = req.params.partidaId;
  const valor = req.body.valor;
  try {
      const resultado = await new CampeonatoController().editarValorTotalPartida(Number(partidaId), Number(valor));
      res.json(resultado);
  } catch (error) {
      console.error('Erro:', error);
      res.status(500).send(error.message);
  }
});

router.put('/campeonatos/:id/valorTotal', new CampeonatoController().calcularEAtualizarValorTotal);


router.post('/criarRegistroCampeonato', new CampeonatoController().criarRegistroCampeonato); 
router.get('/listarCampeonatos', new CampeonatoController().listarRegistrosCampeonatosComParticipantes); 
router.delete('/deletarRegistroCampeonato/:id', new CampeonatoController().deletarRegistroCampeonato);

export { router}