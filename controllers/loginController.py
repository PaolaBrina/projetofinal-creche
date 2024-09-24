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
    nomes = []

    if responsavel_existe:
        tipos.append('responsavel')
        if len(nomes) < 1:
            nomes.append(responsavel_existe.nome)
            print(f"Responsável encontrado: {responsavel_existe.nome}")
    
    if professor_existe:
        tipos.append('professor')
        if len(nomes) < 1:
            nomes.append(professor_existe.nome)  
            print(f"Professor encontrado: {professor_existe.nome}")
    
    if colaborador_existe:
        tipos.append('colaborador')
        if len(nomes) < 1:
            nomes.append(colaborador_existe.nome)
            print(f"Colaborador encontrado: {colaborador_existe.nome}")

    if len(tipos) > 1:
        return jsonify({'status': 'multi', 'data': tipos, 'nomes': nomes})
    elif 'responsavel' in tipos:
        return jsonify({'status': 'responsavel', 'nome': responsavel_existe.nome})
    elif 'professor' in tipos:
        return jsonify({'status': 'professor', 'nome': professor_existe.nome})
    elif 'colaborador' in tipos:
        return jsonify({'status': 'colaborador', 'nome': colaborador_existe.nome})
    else:
        return jsonify({'status': 'nao_encontrado'})