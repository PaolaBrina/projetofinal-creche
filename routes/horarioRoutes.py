from controllers.horarioController import horarioController

def horario(app):
    app.route('/horario', methods=['POST', 'GET', 'PUT', 'DELETE'])(horarioController)
    