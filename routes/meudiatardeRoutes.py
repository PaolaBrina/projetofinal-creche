from controllers.meudiatardeController import meudiatardeController

def meudiatarde(app):
    app.route('/meudiatarde', methods=['POST', 'GET', 'PUT', 'DELETE'])(meudiatardeController)
    