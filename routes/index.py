from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos
from routes.atividadesRoutes import atividades


def default_routes(app):
    turma(app)
    fotos(app)
    atividades(app)
    