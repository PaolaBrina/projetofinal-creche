from controllers.meudiamanha import meudiamanhaController

def meudiamanha(app):
    app.route('/meudiamanha', methods=['POST', 'GET', 'PUT', 'DELETE'])(meudiamanhaController)
    