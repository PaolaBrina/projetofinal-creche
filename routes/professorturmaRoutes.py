from controllers.professorturmaController import professorturmaController

def professorturma(app):
    app.route('/professorturma', methods=['POST','GET','PUT','DELETE'])(professorturmaController)