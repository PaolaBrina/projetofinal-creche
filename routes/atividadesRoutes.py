from controllers.atividadesController import atividadesController
from controllers.atividadesController import get_atividades_por_responsavel
from flask import Blueprint, jsonify

def atividades(app):
    app.route('/atividades', methods=['POST', 'GET', 'PUT', 'DELETE'])(atividadesController)


# Define um Blueprint para as rotas relacionadas a materiais
atividades_bp = Blueprint('atividades', __name__)

# Rota para obter materiais por código de responsável
@atividades_bp.route('/api/responsavel/<int:codigo_responsavel>/listademateriais', methods=['GET'])
def materiais_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        listademateriais = get_atividades_por_responsavel(codigo_responsavel)
        return jsonify(listademateriais), 200  # Retorna diretamente a lista
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    