from controllers.atividadesController import atividadesController
from controllers.atividadesController import get_atividades_por_responsavel
from flask import Blueprint, jsonify

def atividades(app):
    app.route('/atividades', methods=['POST', 'GET', 'PUT', 'DELETE'])(atividadesController)


# Define um Blueprint para as rotas relacionadas a atividades
atividades_bp = Blueprint('atividades', __name__)

# Rota para obter atividades por código de responsável
@atividades_bp.route('/api/responsavel/<int:codigo_responsavel>/atividades', methods=['GET'])
def atividades_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        atividades = get_atividades_por_responsavel(codigo_responsavel)
        return jsonify(atividades), 200  # Retorna diretamente a lista
    except Exception as e:
        return jsonify({"error": str(e)}), 500


""" # Define um Blueprint para as rotas relacionadas a atividades
atividades_bp = Blueprint('atividades', __name__)

# Rota para obter atividades por código de responsável
@atividades_bp.route('/responsavel/<int:codigo_responsavel>/atividades', methods=['GET'])
def atividades_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")
        atividades = get_atividades_por_responsavel(codigo_responsavel)

        if not atividades:
            return jsonify({"message": "Nenhuma atividade encontrada para o responsável informado."}), 200

        return jsonify(atividades), 200
    except ValueError as ve:
        print(f"Erro de valor na rota: {ve}")  # LOG detalhado para erro de valor
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        print(f"Erro inesperado na rota: {e}")  # LOG detalhado para outros erros
        return jsonify({"error": "Erro interno no servidor."}), 500
 """