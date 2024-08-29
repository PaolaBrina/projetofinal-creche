from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos
from routes.atividadesRoutes import atividades
from routes.auxiliarRoutes import auxiliar
from routes.horarioRoutes import horario


def default_routes(app):
    turma(app)
    fotos(app)
    atividades(app)
    auxiliar(app)
    horario(app)