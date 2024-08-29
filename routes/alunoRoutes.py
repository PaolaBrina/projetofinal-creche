from controllers.alunoController import alunoController

def aluno(app):
    app.route('/aluno', methods=['POST', 'GET', 'PUT', 'DELETE'])(alunoController)
    