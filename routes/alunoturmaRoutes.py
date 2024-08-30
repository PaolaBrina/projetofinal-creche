from controllers.alunoturmaController import alunoturmaController

def alunoturma(app):
    app.route('/alunoturma', methods=['POST','GET','PUT','DELETE'])(alunoturmaController)