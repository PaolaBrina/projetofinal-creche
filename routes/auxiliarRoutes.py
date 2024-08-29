from controllers.auxiliarController import auxiliarController

def auxiliar(app):
    app.route('/auxiliar', methods=['POST', 'GET', 'PUT', 'DELETE'])(auxiliarController)
    