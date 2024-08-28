from controllers.responsavelController import responsavelController

def responsavel(app):
    app.route('/responsavel', methods=['POST', 'GET', 'PUT', 'DELETE'])(responsavelController)
    