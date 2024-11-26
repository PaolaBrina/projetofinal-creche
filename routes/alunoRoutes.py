from controllers.alunoController import alunoController
from controllers.alunoController import get_alunos_por_professor
from flask import Blueprint, jsonify

def aluno(app):
    app.route('/aluno', methods=['POST', 'GET', 'PUT', 'DELETE'])(alunoController)
    

# Define um Blueprint para as rotas relacionadas a alunos
alunos_bp = Blueprint('alunos', __name__)

# Rota para obter alunos pelas turmas do professor
@alunos_bp.route('/api/professor/<int:codigo_professor>/alunos', methods=['GET'])
def alunos_por_professor(codigo_professor):
    try:
        print(f"Código do professor recebido na rota: {codigo_professor}")  # LOG TEMPORÁRIO
        # Chama a função no controller
        alunos = get_alunos_por_professor(codigo_professor)
        return jsonify(alunos), 200  # Retorna diretamente a lista
    except Exception as e:
        return jsonify({"error": str(e)}), 500
