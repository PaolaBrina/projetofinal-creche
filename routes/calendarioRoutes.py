from controllers.calendarioController import calendarioController

def calendario(app):
    app.route('/calendario', methods=['POST', 'GET', 'PUT', 'DELETE'])(calendarioController)
    