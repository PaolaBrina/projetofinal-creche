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
from routes.informacoesadicionaisRoutes import informacoesadicionais
from routes.colaboradorRoutes import colaborador
from routes.professorRoutes import professor
from routes.professorturmaRoutes import professorturma
from routes.meudiamanhaRoutes import meudiamanha
from routes.meudiatardeRoutes import meudiatarde
from routes.loginRoutes import login
from routes.professorturmaRoutes import professorturma

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
    informacoesadicionais(app)
    colaborador(app)
    professor(app)
    professorturma(app)
    meudiamanha(app)
    meudiatarde(app)
    login(app)
    professorturma(app)
    