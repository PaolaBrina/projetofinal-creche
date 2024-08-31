from flask import request
from database.db import db
from models.meudiamanha import meudiamanha

def meudiamanhaController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                meudiamanhas = meudiamanha( data['codresponsavel'], data['nome'], data['datanascimento'], data['sexo'], data['endereco'], data['foto'], data['status'])
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
              meudiamanhas.nome = data.get('nome', meudiamanhas.nome)
              meudiamanhas.datanascimento = data.get('datanascimento', meudiamanhas.datanascimento)
              meudiamanhas.sexo = data.get('sexo', meudiamanhas.sexo)
              meudiamanhas.endereco = data.get('endereco', meudiamanhas.endereco)
              meudiamanhas.foto = data.get('foto', meudiamanhas.foto)
              meudiamanhas.status = data.get('status', meudiamanhas.status)

              db.session.commit()
              return 'meudiamanha atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar meudiamanha, {}'.format(str(e)), 405