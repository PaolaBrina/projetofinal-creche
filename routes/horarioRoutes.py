from controllers.horarioController import horarioController
from controllers.horarioController import get_horarios_por_responsavel
from flask import Blueprint, jsonify

def horario(app):
    app.route('/horario', methods=['POST', 'GET', 'PUT', 'DELETE'])(horarioController)




# Define um Blueprint para as rotas relacionadas a materiais
horarios_bp = Blueprint('horarios', __name__)

# Rota para obter materiais por código de responsável
@horarios_bp.route('/api/responsavel/<int:codigo_responsavel>/horario', methods=['GET'])
def horarios_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        horarios = get_horarios_por_responsavel(codigo_responsavel)
        return jsonify(horarios), 200  # Retorna diretamente a lista
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    