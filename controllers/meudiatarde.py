from flask import request
from database.db import db
from models.meudiatarde import meudiatarde

def meudiatardeController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                meudiatardes = meudiatarde(data['codaluno'], data['codturma'], data['codprofessor'], data['datahora'], data['recado'], data['xixi'], data['coco'], data['sono'], data['saude'], data['medicacao'], data['cafetarde'], data['janta'])
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
              meudiatardes.codaluno = data.get('codaluno', meudiatardes.codaluno)
              meudiatardes.codturma = data.get('codturma', meudiatardes.codturma)
              meudiatardes.codprofessor = data.get('codprofessor', meudiatardes.codprofessor)
              meudiatardes.datahora = data.get('datahora', meudiatardes.datahora)
              meudiatardes.recado = data.get('recado', meudiatardes.recado)
              meudiatardes.xixi = data.get('xixi', meudiatardes.xixi)
              meudiatardes.coco = data.get('coco', meudiatardes.coco)
              meudiatardes.sono = data.get('sono', meudiatardes.sono)
              meudiatardes.saude = data.get('saude', meudiatardes.saude)
              meudiatardes.medicacao = data.get('medicacao', meudiatardes.medicacao)
              meudiatardes.cafetarde = data.get('cafetarde', meudiatardes.cafetarde)
              meudiatardes.janta = data.get('janta', meudiatardes.janta)

              db.session.commit()
              return 'meudiatarde atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar meudiatarde, {}'.format(str(e)), 405