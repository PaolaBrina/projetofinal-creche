from flask import request
from database.db import db
from models.professor import professor

def professorController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                professores = professor(data['nome'], data['cpf'], data['datanascimento'], data['sexo'], data['email'], data['endereco'], data['telefone'], data['login'], data['senha'],data['status'])
                db.session.add(professores)
                db.session.commit()
                return 'professor criado com sucesso', 200 
            
            except Exception as e:
                return 'professor nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = professor.query.all()
                new = {'professor': [professor.to_dict() for professor in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar professor. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                professores = professor.query.get(codigo)
                if professores:
                    db.session.delete(professores)
                    db.session.commit()
                    return 'professor excluído com sucesso', 200
                else:
                    return 'professor não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir professor. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              professores = professor.query.get(codigo)
              if professores is None:
                   return 'responsavel não encontrado', 404
              professores.nome = data.get('nome', professores.nome)
              professores.cpf = data.get('cpf', professores.cpf)
              professores.datanascimento = data.get('datanascimento', professores.datanascimento)
              professores.sexo = data.get('sexo', professores.sexo)
              professores.email = data.get('email', professores.email)
              professores.endereco = data.get('endereco', professores.endereco)
              professores.telefone = data.get('telefone', professores.telefone)
              professores.login = data.get('login', professores.login)
              professores.senha = data.get('senha', professores.senha)
              professores.status = data.get('status', professores.status)

              db.session.commit()
              return 'professor atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar professor, {}'.format(str(e)), 405