from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos


def default_routes(app):
    turma(app)
    fotos(app)
    