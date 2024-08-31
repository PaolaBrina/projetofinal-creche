from controllers.meudiatarde import meudiatardeController

def meudiatarde(app):
    app.route('/meudiatarde', methods=['POST', 'GET', 'PUT', 'DELETE'])(meudiatardeController)
    