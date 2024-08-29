from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos
from routes.responsavelRoutes import responsavel
from routes.alunoRoutes import aluno

def default_routes(app):
    turma(app)
    fotos(app)
    responsavel(app)
    aluno(app)

    