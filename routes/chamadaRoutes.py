from controllers.chamadaController import chamadaController

def chamada(app):
    app.route('/chamada', methods=['POST', 'GET', 'PUT', 'DELETE'])(chamadaController)
    