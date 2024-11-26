from controllers.atividadesController import atividadesController
from controllers.atividadesController import get_atividades_por_responsavel
from controllers.atividadesController import get_atividades_por_professor
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

atividades_professor_bp = Blueprint('atividades_professor', __name__)

# Rota para obter atividades por código de professor
@atividades_professor_bp.route('/api/professor/<int:codigo_professor>/atividades', methods=['GET'])
def atividades_por_professor(codigo_professor):
    try:
        print(f"Código recebido na rota: {codigo_professor}")  # LOG TEMPORÁRIO
        # Chama a função no controller para buscar as atividades do professor
        atividades = get_atividades_por_professor(codigo_professor)
        
        if atividades:
            return jsonify({"atividades": atividades}), 200  # Retorna as atividades em formato JSON
        else:
            return jsonify({"message": "Nenhuma atividade encontrada para o professor."}), 404  # Caso não encontre atividades
        
    except Exception as e:
        # Retorna erro caso algo dê errado
        return jsonify({"error": str(e)}), 500  # Retorno com status 500 em caso de erro no servidor