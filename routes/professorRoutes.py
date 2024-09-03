from controllers.professorController import professorController

def professor(app):
    app.route('/professor', methods=['POST', 'GET', 'PUT', 'DELETE'])(professorController)
