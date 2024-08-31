from flask import request
from database.db import db
from models.meudiatarde import meudiatarde

def meudiatardeController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                meudiatardes = meudiatarde( data['codresponsavel'], data['nome'], data['datanascimento'], data['sexo'], data['endereco'], data['foto'], data['status'])
                db.session.add(meudiatardes)
                db.session.commit()
                return 'meudiatarde criado com sucesso', 200 
            
            except Exception as e:
                return 'meudiatarde nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = meudiatarde.query.all()
                new = {'meudiatarde': [meudiatarde.to_dict() for meudiatarde in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar meudiatarde. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                meudiatardes = meudiatarde.query.get(codigo)
                if meudiatardes:
                    db.session.delete(meudiatardes)
                    db.session.commit()
                    return 'meudiatarde excluído com sucesso', 200
                else:
                    return 'meudiatarde não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir meudiatarde. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              meudiatardes = meudiatarde.query.get(codigo)
              if meudiatardes is None:
                   return 'meudiatarde não encontrado', 404
              meudiatardes.nome = data.get('nome', meudiatardes.nome)
              meudiatardes.datanascimento = data.get('datanascimento', meudiatardes.datanascimento)
              meudiatardes.sexo = data.get('sexo', meudiatardes.sexo)
              meudiatardes.endereco = data.get('endereco', meudiatardes.endereco)
              meudiatardes.foto = data.get('foto', meudiatardes.foto)
              meudiatardes.status = data.get('status', meudiatardes.status)

              db.session.commit()
              return 'meudiatarde atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar meudiatarde, {}'.format(str(e)), 405