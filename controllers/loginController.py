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
    codigos = []

    if responsavel_existe:
        tipos.append('responsavel')
        codigos.append(responsavel_existe.codigo)
        if len(nomes) < 1:
            nomes.append(responsavel_existe.nome)
            print(f"Responsável encontrado: {responsavel_existe.nome}")
    
    if professor_existe:
        tipos.append('professor')
        codigos.append(professor_existe.codigo)
        if len(nomes) < 1:
            nomes.append(professor_existe.nome)  
            print(f"Professor encontrado: {professor_existe.nome}")
    
    if colaborador_existe:
        tipos.append('colaborador')
        codigos.append(colaborador_existe.codigo)
        if len(nomes) < 1:
            nomes.append(colaborador_existe.nome)
            print(f"Colaborador encontrado: {colaborador_existe.nome}")

    if len(tipos) > 1:
        return jsonify({'codigo': codigos, 'status': 'multi', 'data': tipos, 'nomes': nomes})
    elif 'responsavel' in tipos:
        return jsonify({'codigo': codigos, 'status': 'responsavel', 'nome': nomes})
    elif 'professor' in tipos:
        return jsonify({'codigo': codigos, 'status': 'professor', 'nome': nomes})
    elif 'colaborador' in tipos:
        return jsonify({'codigo': codigos, 'status': 'colaborador', 'nome': nomes})
    else:
        return jsonify({'status': 'nao_encontrado'})