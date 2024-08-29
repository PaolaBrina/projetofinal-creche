from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos
from routes.atividadesRoutes import atividades
from routes.auxiliarRoutes import auxiliar


def default_routes(app):
    turma(app)
    fotos(app)
    atividades(app)
    auxiliar(app)
    