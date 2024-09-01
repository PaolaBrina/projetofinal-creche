from flask import request
from database.db import db
from models.meudiamanha import meudiamanha

def meudiamanhaController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                meudiamanhas = meudiamanha(data['codaluno'], data['codturma'], data['codprofessor'], data['datahora'], data['recado'], data['xixi'], data['coco'], data['sono'], data['saude'], data['medicacao'], data['cafemanha'], data['almoco'])
                db.session.add(meudiamanhas)
                db.session.commit()
                return 'meudiamanha criado com sucesso', 200 
            
            except Exception as e:
                return 'meudiamanha nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = meudiamanha.query.all()
                new = {'meudiamanha': [meudiamanha.to_dict() for meudiamanha in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar meudiamanha. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                meudiamanhas = meudiamanha.query.get(codigo)
                if meudiamanhas:
                    db.session.delete(meudiamanhas)
                    db.session.commit()
                    return 'meudiamanha excluído com sucesso', 200
                else:
                    return 'meudiamanha não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir meudiamanha. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              meudiamanhas = meudiamanha.query.get(codigo)
              if meudiamanhas is None:
                   return 'meudiamanha não encontrado', 404
              meudiamanhas.codaluno = data.get('codaluno', meudiamanhas.codaluno)
              meudiamanhas.codturma = data.get('codturma', meudiamanhas.codturma)
              meudiamanhas.codprofessor = data.get('codprofessor', meudiamanhas.codprofessor)
              meudiamanhas.datahora = data.get('datahora', meudiamanhas.datahora)
              meudiamanhas.recado = data.get('recado', meudiamanhas.recado)
              meudiamanhas.xixi = data.get('xixi', meudiamanhas.xixi)
              meudiamanhas.coco = data.get('coco', meudiamanhas.coco)
              meudiamanhas.sono = data.get('sono', meudiamanhas.sono)
              meudiamanhas.saude = data.get('saude', meudiamanhas.saude)
              meudiamanhas.medicacao = data.get('medicacao', meudiamanhas.medicacao)
              meudiamanhas.cafemanha = data.get('cafemanha', meudiamanhas.cafemanha)
              meudiamanhas.almoco = data.get('almoco', meudiamanhas.almoco)

              db.session.commit()
              return 'meudiamanha atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar meudiamanha, {}'.format(str(e)), 405