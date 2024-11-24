from controllers.fotosController import fotosController
from controllers.fotosController import get_fotos_por_responsavel
from flask import Blueprint, jsonify

def fotos(app):
    app.route('/fotos', methods=['POST', 'GET', 'PUT', 'DELETE'])(fotosController)
    



# Define um Blueprint para as rotas relacionadas às atividades
fotos_bp = Blueprint('fotos', __name__)

# Rota para obter atividades por código do responsável
@fotos_bp.route('/api/responsavel/<int:codigo_responsavel>/atividades', methods=['GET'])
def fotos_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        fotos = get_fotos_por_responsavel(codigo_responsavel)
        return jsonify(fotos), 200  # Retorna a lista no formato JSON com status HTTP 200
    except Exception as e:
        print(f"Erro na rota: {str(e)}")  # LOG de erro
        return jsonify({"error": str(e)}), 500  # Retorna erro no formato JSON com status HTTP 500
