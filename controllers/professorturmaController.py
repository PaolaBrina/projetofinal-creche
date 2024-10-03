from flask import request
from database.db import db
from models.professorturma import professorturma

def professorturmaController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                professorturmas = professorturma(data['codturma'],data['codprofessor'],data['codauxiliar'])
                db.session.add(professorturmas)
                db.session.commit()
                return 'professorturma criado com sucesso', 200 
            
            except Exception as e:
                return 'professorturma nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = professorturma.query.all()
                new = {'professorturma': [professorturma.to_dict() for professorturma in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar professorturma. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                professorturmas = professorturma.query.get(codigo)
                if professorturmas:
                    db.session.delete(professorturmas)
                    db.session.commit()
                    return 'professorturma excluído com sucesso', 200
                else:
                    return 'professorturma não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir professorturma. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              professorturmas = professorturma.query.get(codigo)
              if professorturmas is None:
                   return 'professorturmas não encontrado', 404
              professorturmas.codturma = data.get('codturma', professorturmas.codturma)
              professorturmas.codprofessor = data.get('codprofessor', professorturmas.codprofessor)
              professorturmas.codauxiliar = data.get('codauxiliar', professorturmas.codauxiliar)

              db.session.commit()
              return 'professorturma atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar professorturma, {}'.format(str(e)), 405

