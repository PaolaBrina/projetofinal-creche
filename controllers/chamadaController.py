from flask import request
from database.db import db
from models.chamada import chamada

def chamadaController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                chamadas = chamada(data['codturma'],data['codaluno'],data['datahora'],data['presenca'],data['observacao'])
                db.session.add(chamadas)
                db.session.commit()
                return 'Chamada criado com sucesso', 200 
            
            except Exception as e:
                return 'Chamada nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = chamada.query.all()
                new = {'chamada': [chamada.to_dict() for chamada in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar chamada. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                chamadas = chamada.query.get(codigo)
                if chamadas:
                    db.session.delete(chamadas)
                    db.session.commit()
                    return 'Chamada excluído com sucesso', 200
                else:
                    return 'Chamada não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir Chamada. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              chamadas = chamada.query.get(codigo)
              if chamadas is None:
                   return 'Chamadas não encontrado', 404
              chamadas.codturma = data.get('codturma', chamadas.codturma)
              chamadas.codaluno = data.get('codaluno', chamadas.codaluno)
              chamadas.datahora = data.get('datahora', chamadas.datahora)
              chamadas.presenca = data.get('presenca', chamadas.presenca)
              chamadas.observacao = data.get('observacao', chamadas.observacao)

              db.session.commit()
              return 'Chamadas atualizado com sucesso', 200 
            
            except Exception as e:
                return 'Não foi possivel alterar Chamadas, {}'.format(str(e)), 405