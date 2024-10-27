from flask import request
from database.db import db
from models.listademateriais import listademateriais

def listademateriaisController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                listadematerial = listademateriais(data['codturma'],data['foto'])
                db.session.add(listadematerial)
                db.session.commit()
                return 'listadematerial criado com sucesso', 200 
            
            except Exception as e:
                return 'listadematerial não foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = listademateriais.query.all()
                new = {'listademateriais': [listademateriais.to_dict() for listademateriais in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Horario. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                listadematerial = listademateriais.query.get(codigo)
                if listadematerial:
                    db.session.delete(listadematerial)
                    db.session.commit()
                    return 'listadematerial excluído com sucesso', 200
                else:
                    return 'listadematerial não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir listadematerial. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              listadematerial = listademateriais.query.get(codigo)
              if listadematerial is None:
                   return 'listadematerial não encontrado', 404
              listadematerial.codturma = data.get('codturma', listadematerial.codturma)
              listadematerial.foto = data.get('foto', listadematerial.foto)

              db.session.commit()
              return 'listadematerial atualizado com sucesso', 200 
            
            except Exception as e:
                return 'Não foi possivel alterar listadematerial, {}'.format(str(e)), 405
    