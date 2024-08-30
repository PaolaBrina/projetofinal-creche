from flask import request
from database.db import db
from models.alunoturma import alunoturma

def alunoturmaController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                alunoturmas = alunoturma(data['codturma'],data['codaluno'])
                db.session.add(alunoturmas)
                db.session.commit()
                return 'Alunoturma criado com sucesso', 200 
            
            except Exception as e:
                return 'Alunoturma nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = alunoturma.query.all()
                new = {'alunoturma': [alunoturma.to_dict() for alunoturma in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Alunoturma. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                alunoturmas = alunoturma.query.get(codigo)
                if alunoturmas:
                    db.session.delete(alunoturmas)
                    db.session.commit()
                    return 'Alunoturma excluído com sucesso', 200
                else:
                    return 'Alunoturma não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir alunoturma. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              alunoturmas = alunoturma.query.get(codigo)
              if alunoturmas is None:
                   return 'Alunoturmas não encontrado', 404
              alunoturmas.codturma = data.get('codturma', alunoturmas.codturma)
              alunoturmas.codaluno = data.get('codaluno', alunoturmas.codaluno)

              db.session.commit()
              return 'Alunoturma atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar Alunoturma, {}'.format(str(e)), 405

