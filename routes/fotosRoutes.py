from controllers.fotosController import fotosController

def fotos(app):
    app.route('/fotos', methods=['POST', 'GET', 'PUT', 'DELETE'])(fotosController)
    