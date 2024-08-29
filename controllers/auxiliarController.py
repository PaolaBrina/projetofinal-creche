from flask import request
from database.db import db
from models.auxiliar import auxiliar

def auxiliarController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                auxiliares = auxiliar(data['nome'], data['cpf'], data['datanascimento'], data['sexo'], data['email'], data['endereco'], data['telefone'], data['status'])
                db.session.add(auxiliares)
                db.session.commit()
                return 'Auxiliar criado com sucesso', 200 
            
            except Exception as e:
                return 'Auxiliar nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = auxiliar.query.all()
                new = {'auxiliar': [auxiliar.to_dict() for auxiliar in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar Auxiliar. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                auxiliares = auxiliar.query.get(codigo)
                if auxiliares:
                    db.session.delete(auxiliares)
                    db.session.commit()
                    return 'Auxiliar excluído com sucesso', 200
                else:
                    return 'Auxiliar não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir Auxiliar. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              auxiliares = auxiliar.query.get(codigo)
              if auxiliares is None:
                   return 'Auxiliar não encontrado', 404
              auxiliares.nome = data.get('nome', auxiliares.nome)
              auxiliares.cpf = data.get('cpf', auxiliares.cpf)
              auxiliares.datanascimento = data.get('datanascimento', auxiliares.datanascimento)
              auxiliares.sexo = data.get('sexo', auxiliares.sexo)
              auxiliares.email = data.get('email', auxiliares.email)
              auxiliares.endereco = data.get('endereco', auxiliares.endereco)
              auxiliares.telefone = data.get('telefone', auxiliares.telefone)
              auxiliares.status = data.get('status', auxiliares.status)

              db.session.commit()
              return 'Auxiliar atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar Auxiliar, {}'.format(str(e)), 405