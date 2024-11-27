from controllers.avisosController import avisosController
from controllers.avisosController import delete_aviso
from controllers.avisosController import atualizar_aviso
from flask import Blueprint

def avisos(app):
    app.route('/avisos', methods=['POST', 'GET', 'PUT', 'DELETE'])(avisosController)
    
# Define um Blueprint para as rotas relacionadas a avisos
avisos_bp = Blueprint('avisos', __name__)

# Rota para excluir aviso com base no código
avisos_bp.route('/avisos/<int:codigo>', methods=['DELETE'])(delete_aviso)

# Rota para atualizar um aviso específico
@avisos_bp.route('/avisos/<int:codigo>', methods=['PUT'])
def route_atualizar_aviso(codigo):
    return atualizar_aviso(codigo)