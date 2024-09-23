from flask import request, jsonify
from models.responsavel import responsavel
from models.professor import professor
from models.colaborador import colaborador

def loginController():
    data = request.get_json()
    print(data)
    telefone = data.get('telefone')

    responsavel_existe = responsavel.query.filter_by(telefone=telefone).first()
    professor_existe = professor.query.filter_by(telefone=telefone).first()
    colaborador_existe = colaborador.query.filter_by(telefone=telefone).first()

    tipos = []
    if responsavel_existe:
        tipos.append('responsavel')
    if professor_existe:
        tipos.append('professor')
    if colaborador_existe:
        tipos.append('colaborador')

    if len(tipos) > 1:
        return jsonify({'status': 'multi', 'data': tipos})
    elif 'responsavel' in tipos:
        return jsonify({'status': 'responsavel'})
    elif 'professor' in tipos:
        return jsonify({'status': 'professor'})
    elif 'colaborador' in tipos:
        return jsonify({'status': 'colaborador'})
    else:
        return jsonify({'status': 'nao_encontrado'})