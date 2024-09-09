from controllers.loginController import loginController

def login(app):
    app.route('/login', methods=['POST','GET'])(loginController)