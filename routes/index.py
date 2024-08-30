from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos
from routes.atividadesRoutes import atividades
from routes.auxiliarRoutes import auxiliar
from routes.horarioRoutes import horario
from routes.responsavelRoutes import responsavel
from routes.alunoRoutes import aluno
from routes.alunoturmaRoutes import alunoturma
from routes.avisosRoutes import avisos
from routes.chamadaRoutes import chamada


def default_routes(app):
    turma(app)
    fotos(app)
    atividades(app)
    auxiliar(app)
    horario(app)
    responsavel(app)
    aluno(app)  
    alunoturma(app)
    avisos(app)
    chamada(app)