from flask import request
from database.db import db
from models.horario import horario

def horarioController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                horarios = horario(data['codturma'],data['foto'])
                db.session.add(horarios)
                db.session.commit()
                return 'Horarios criado com sucesso', 200 
            
            except Exception as e:
                return 'Horarios não foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = horario.query.all()
                new = {'horario': [horario.to_dict() for horario in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Horario. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                horarios = horario.query.get(codigo)
                if horarios:
                    db.session.delete(horarios)
                    db.session.commit()
                    return 'Horarios excluído com sucesso', 200
                else:
                    return 'Horarios não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir Horarios. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              horarios = horario.query.get(codigo)
              if horarios is None:
                   return 'Horarios não encontrado', 404
              horarios.codturma = data.get('codturma', horarios.codturma)
              horarios.foto = data.get('foto', horarios.foto)

              db.session.commit()
              return 'Horarios atualizado com sucesso', 200 
            
            except Exception as e:
                return 'Não foi possivel alterar Horarios, {}'.format(str(e)), 405

