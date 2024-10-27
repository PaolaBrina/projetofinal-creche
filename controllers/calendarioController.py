from flask import request
from database.db import db
from models.calendario import calendario

def calendarioController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                calendarios = calendario(data['foto'])
                db.session.add(calendarios)
                db.session.commit()
                return 'calendarios criado com sucesso', 200 
            
            except Exception as e:
                return 'calendarios não foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = calendario.query.all()
                new = {'calendario': [calendario.to_dict() for calendario in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Horario. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                calendarios = calendario.query.get(codigo)
                if calendarios:
                    db.session.delete(calendarios)
                    db.session.commit()
                    return 'calendarios excluído com sucesso', 200
                else:
                    return 'calendarios não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir calendarios. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              calendarios = calendario.query.get(codigo)
              if calendarios is None:
                   return 'calendarios não encontrado', 404
              calendarios.foto = data.get('foto', calendarios.foto)

              db.session.commit()
              return 'calendarios atualizado com sucesso', 200 
            
            except Exception as e:
                return 'Não foi possivel alterar calendarios, {}'.format(str(e)), 405

