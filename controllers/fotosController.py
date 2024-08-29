from flask import request
from database.db import db
from models.fotos import fotos

def fotosController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                foto = fotos(data['codturma'],data['datahora'], data['descricao'], data['foto'])
                db.session.add(foto)
                db.session.commit()
                return 'fotos criado com sucesso', 200 
            
            except Exception as e:
                return 'fotos nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = fotos.query.all()
                new = {'fotos': [fotos.to_dict() for fotos in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar fotos. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                foto = fotos.query.get(codigo)
                if foto:
                    db.session.delete(foto)
                    db.session.commit()
                    return 'fotos excluído com sucesso', 200
                else:
                    return 'fotos não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir fotos. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              foto = fotos.query.get(codigo)
              if foto is None:
                   return 'fotos não encontrado', 404
              foto.codturma = data.get('codturma', foto.codturma)
              foto.datahora = data.get('datahora', foto.datahora)
              foto.descricao = data.get('descricao', foto.descricao)
              foto.foto = data.get('foto', foto.foto)

              db.session.commit()
              return 'fotos atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar fotos, {}'.format(str(e)), 405

