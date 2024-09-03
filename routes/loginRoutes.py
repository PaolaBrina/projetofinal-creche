from controllers.colaboradorController import colaboradorController
from controllers.responsavelController import responsavelController
from controllers.professorController import professorController

def colaborador(app):
    app.route('/colaborador', methods=['POST', 'GET', 'PUT', 'DELETE'])(colaboradorController)
    
def colaboradorlogin(app):
    app.route('/colaboradorlogin', methods=['POST', 'GET'])(colaboradorController)

def responsavellogin(app):
    app.route('/responsavellogin', methods=['POST', 'GET'])(responsavelController)

def professorlogin(app):
    app.route('/professorlogin', methods=['POST', 'GET'])(professorController)


#* FRONT -> POST -> rota: /login -> login (user, senha ) -> é professor {Message: "autenticado com sucesso", role: [professor, responsavel]} ? é colaborador? é responsável?