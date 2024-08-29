from controllers.atividadesController import atividadesController

def atividades(app):
    app.route('/atividades', methods=['POST', 'GET', 'PUT', 'DELETE'])(atividadesController)
    