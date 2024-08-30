from controllers.informacoesadicionaisController import informacoesadicionaisController

def informacoesadicionais(app):
    app.route('/informacoesadicionais', methods=['POST','GET','PUT','DELETE'])(informacoesadicionaisController)