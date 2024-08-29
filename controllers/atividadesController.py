from flask import request
from database.db import db
from models.atividades import atividades

def atividadesController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                ativ = atividades(data['codturma'],data['datahora'], data['descricao'], data['foto'])
                db.session.add(ativ)
                db.session.commit()
                return 'Atividades criado com sucesso', 200 
            
            except Exception as e:
                return 'Atividades nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = atividades.query.all()
                new = {'atividades': [atividades.to_dict() for atividades in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Atividades. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                ativ = atividades.query.get(codigo)
                if ativ:
                    db.session.delete(ativ)
                    db.session.commit()
                    return 'Atividades excluído com sucesso', 200
                else:
                    return 'Atividades não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir Atividades. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              ativ = atividades.query.get(codigo)
              if ativ is None:
                   return 'ativs não encontrado', 404
              ativ.codturma = data.get('codturma', ativ.codturma)
              ativ.datahora = data.get('datahora', ativ.datahora)
              ativ.descricao = data.get('descricao', ativ.descricao)
              ativ.foto = data.get('foto', ativ.foto)

              db.session.commit()
              return 'Atividades atualizado com sucesso', 200 
            
            except Exception as e:
                return 'Não foi possivel alterar Atividades, {}'.format(str(e)), 405

