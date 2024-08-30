from flask import request
from database.db import db
from models.informacoesadicionais import informacoesadicionais

def informacoesadicionaisController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                informacoesadicional = informacoesadicionais(data['codaluno'],data['alergia'],data['restricaoalimentar'],data['doenca'])
                db.session.add(informacoesadicional)
                db.session.commit()
                return 'informacoesadicionais criado com sucesso', 200 
            
            except Exception as e:
                return 'informacoesadicionais nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = informacoesadicionais.query.all()
                new = {'informacoesadicionais': [informacoesadicionais.to_dict() for informacoesadicionais in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Informacoesadicionais. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                informacoesadicional = informacoesadicionais.query.get(codigo)
                if informacoesadicional:
                    db.session.delete(informacoesadicional)
                    db.session.commit()
                    return 'informacoesadicionais excluído com sucesso', 200
                else:
                    return 'informacoesadicionais não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir informacoesadicionais. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              informacoesadicional = informacoesadicionais.query.get(codigo)
              if informacoesadicional is None:
                   return 'informacoesadicionais não encontrado', 404
              informacoesadicional.codaluno = data.get('codaluno', informacoesadicional.codaluno)
              informacoesadicional.alergia = data.get('alergia', informacoesadicional.alergia)
              informacoesadicional.restricaoalimentar = data.get('restricaoalimentar', informacoesadicional.restricaoalimentar)
              informacoesadicional.doenca = data.get('doenca', informacoesadicional.doenca)

              db.session.commit()
              return 'informacoesadicionais atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar informacoesadicionais, {}'.format(str(e)), 405

