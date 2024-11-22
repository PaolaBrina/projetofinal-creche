from controllers.listademateriaisController import listademateriaisController
from controllers.listademateriaisController import get_materiais_por_responsavel
from flask import Blueprint, jsonify

def listademateriais(app):
    app.route('/listademateriais', methods=['POST', 'GET', 'PUT', 'DELETE'])(listademateriaisController)


# Define um Blueprint para as rotas relacionadas a materiais
lista_materiais_bp = Blueprint('lista_materiais', __name__)

# Rota para obter materiais por código de responsável
@lista_materiais_bp.route('/api/responsavel/<int:codigo_responsavel>/listademateriais', methods=['GET'])
def materiais_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        listademateriais = get_materiais_por_responsavel(codigo_responsavel)
        return jsonify(listademateriais), 200  # Retorna diretamente a lista
    except Exception as e:
        return jsonify({"error": str(e)}), 500