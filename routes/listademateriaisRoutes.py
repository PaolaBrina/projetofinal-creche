from controllers.listademateriaisController import listademateriaisController

def listademateriais(app):
    app.route('/listademateriais', methods=['POST', 'GET', 'PUT', 'DELETE'])(listademateriaisController)