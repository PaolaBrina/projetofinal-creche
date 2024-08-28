from controllers.turmaController import turmaController

def turma(app):
    app.route('/turma', methods=['POST', 'GET', 'PUT', 'DELETE'])(turmaController)
    