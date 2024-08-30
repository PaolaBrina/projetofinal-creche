from controllers.avisosController import avisosController

def avisos(app):
    app.route('/avisos', methods=['POST', 'GET', 'PUT', 'DELETE'])(avisosController)
    