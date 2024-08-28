from flask import request
from database.db import db
from models.turma import turma

def turmaController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                turmas = turma(data['nome'], data['sala'])
                db.session.add(turmas)
                db.session.commit()
                return 'turma criado com sucesso', 200 
            
            except Exception as e:
                return 'turma nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = turma.query.all()
                new = {'turma': [turma.to_dict() for turma in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar turma. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                turmas = turma.query.get(codigo)
                if turmas:
                    db.session.delete(turmas)
                    db.session.commit()
                    return 'turma excluído com sucesso', 200
                else:
                    return 'turma não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir turma. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              turmas = turma.query.get(codigo)
              if turmas is None:
                   return 'turma não encontrado', 404
              turmas.nome = data.get('nome', turmas.nome)
              turmas.sala = data.get('sala', turmas.sala)

              db.session.commit()
              return 'turma atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar turma, {}'.format(str(e)), 405

