from flask import request
from database.db import db
from models.meudiamanha import meudiamanha
from datetime import datetime

def meudiamanhaController():

        if request.method == 'POST':
            try:
                data = request.get_json()
                
                # Converte datahora para o formato correto
                datahora = datetime.strptime(data['datahora'], '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d %H:%M:%S')
                
                meudiamanhas = meudiamanha(
                    codaluno=data['codaluno'],
                    codturma=data['codturma'],
                    codprofessor=data['codprofessor'],
                    datahora=datahora,
                    recado=data['recado'],
                    xixi=data['xixi'],
                    coco=data['coco'],
                    sono=data['sono'],
                    saude=data['saude'],
                    medicacao=data['medicacao'],
                    cafemanha=data['cafemanha'],
                    almoco=data['almoco'],
                )
                
                db.session.add(meudiamanhas)
                db.session.commit()
                return 'meudiamanha criado com sucesso', 200
            
            except Exception as e:
                return f'meudiamanha nao foi criado, {e}', 400



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