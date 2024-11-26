from controllers.fotosController import fotosController
from controllers.fotosController import get_fotos_por_responsavel
from controllers.fotosController import get_fotos_por_professor
from flask import Blueprint, jsonify

def fotos(app):
    app.route('/fotos', methods=['POST', 'GET', 'PUT', 'DELETE'])(fotosController)
    



# Define um Blueprint para as rotas relacionadas às atividades
fotos_bp = Blueprint('fotos', __name__)

# Rota para obter atividades por código do responsável
@fotos_bp.route('/api/responsavel/<int:codigo_responsavel>/fotos', methods=['GET'])
def fotos_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido na rota: {codigo_responsavel}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        fotos = get_fotos_por_responsavel(codigo_responsavel)
        return jsonify(fotos), 200  # Retorna a lista no formato JSON com status HTTP 200
    except Exception as e:
        print(f"Erro na rota: {str(e)}")  # LOG de erro
        return jsonify({"error": str(e)}), 500  # Retorna erro no formato JSON com status HTTP 500

fotos_professor_bp = Blueprint('fotos_professor', __name__)

# Rota para obter fotos por código de professor
@fotos_professor_bp.route('/api/professor/<int:codigo_professor>/fotos', methods=['GET'])
def fotos_por_professor(codigo_professor):
    try:
        print(f"Código recebido na rota: {codigo_professor}")  # LOG TEMPORÁRIO
        # Chama a função no controller para buscar as fotos do professor
        fotos = get_fotos_por_professor(codigo_professor)
        
        if fotos:
            return jsonify({"fotos": fotos}), 200  # Retorna as fotos em formato JSON
        else:
            return jsonify({"message": "Nenhuma atividade encontrada para o professor."}), 404  # Caso não encontre fotos
        
    except Exception as e:
        # Retorna erro caso algo dê errado
        return jsonify({"error": str(e)}), 500  # Retorno com status 500 em caso de erro no servidor