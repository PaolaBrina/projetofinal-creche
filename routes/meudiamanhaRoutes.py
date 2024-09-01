from controllers.meudiamanhaController import meudiamanhaController

def meudiamanha(app):
    app.route('/meudiamanha', methods=['POST', 'GET', 'PUT', 'DELETE'])(meudiamanhaController)
    