from flask import Blueprint, request, jsonify
from controllers.both_meu_diaController import both_meu_dia_por_responsavel

meu_dia_bp = Blueprint('meu_dia', __name__)

@meu_dia_bp.route('/meudiamanha/<int:codigo_responsavel>', methods=['GET'])
def get_meu_dia_manha(codigo_responsavel):
    try:
        materiais = both_meu_dia_por_responsavel(codigo_responsavel)
        return jsonify({"success": True, "data": materiais}), 200
    except Exception as e:
        print(f"Erro na rota /meudiamanha/{codigo_responsavel}: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

@meu_dia_bp.route('/meudiatarde/<int:codigo_responsavel>', methods=['GET'])
def get_meu_dia_tarde(codigo_responsavel):
    try:
        materiais = both_meu_dia_por_responsavel(codigo_responsavel)
        return jsonify({"success": True, "data": materiais}), 200
    except Exception as e:
        print(f"Erro na rota /meudiatarde/{codigo_responsavel}: {e}")
        return jsonify({"success": False, "message": str(e)}), 500


""" from flask import Blueprint, request, jsonify
from controllers.both_meu_diaController import both_meu_dia_por_responsavel

# Criação do Blueprint
meu_dia_bp = Blueprint('meu_dia', __name__)

# Rota para buscar "Meu Dia" no período da manhã
@meu_dia_bp.route('/meudiamanha/<int:codigo_responsavel>', methods=['GET'])
def get_meu_dia_manha(codigo_responsavel):
    try:
        # Passa o período "matutino" diretamente ao controlador
        materiais = both_meu_dia_por_responsavel(codigo_responsavel, "matutino")
        return jsonify({"success": True, "data": materiais}), 200
    except Exception as e:
        print(f"Erro na rota /meudiamanha/{codigo_responsavel}: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

# Rota para buscar "Meu Dia" no período da tarde
@meu_dia_bp.route('/meudiatarde/<int:codigo_responsavel>', methods=['GET'])
def get_meu_dia_tarde(codigo_responsavel):
    try:
        # Passa o período "vespertino" diretamente ao controlador
        materiais = both_meu_dia_por_responsavel(codigo_responsavel, "vespertino")
        return jsonify({"success": True, "data": materiais}), 200
    except Exception as e:
        print(f"Erro na rota /meudiatarde/{codigo_responsavel}: {e}")
        return jsonify({"success": False, "message": str(e)}), 500
 """