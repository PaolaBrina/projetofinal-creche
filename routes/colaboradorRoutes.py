from controllers.colaboradorController import colaboradorController

def colaborador(app):
    app.route('/colaborador', methods=['POST', 'GET', 'PUT', 'DELETE'])(colaboradorController)