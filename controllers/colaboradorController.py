from flask import request
from database.db import db
from models.colaborador import colaborador

def colaboradorController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                colaboradores = colaborador(data['nome'], data['cpf'], data['datanascimento'], data['sexo'], data['email'], data['endereco'], data['telefone'], data['login'], data['senha'],data['status'])
                db.session.add(colaboradores)
                db.session.commit()
                return 'colaborador criado com sucesso', 200 
            
            except Exception as e:
                return 'colaborador nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = colaborador.query.all()
                new = {'colaborador': [colaborador.to_dict() for colaborador in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar colaborador. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                colaboradores = colaborador.query.get(codigo)
                if colaboradores:
                    db.session.delete(colaboradores)
                    db.session.commit()
                    return 'colaborador excluído com sucesso', 200
                else:
                    return 'colaborador não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir colaborador. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              colaboradores = colaborador.query.get(codigo)
              if colaboradores is None:
                   return 'responsavel não encontrado', 404
              colaboradores.nome = data.get('nome', colaboradores.nome)
              colaboradores.cpf = data.get('cpf', colaboradores.cpf)
              colaboradores.datanascimento = data.get('datanascimento', colaboradores.datanascimento)
              colaboradores.sexo = data.get('sexo', colaboradores.sexo)
              colaboradores.email = data.get('email', colaboradores.email)
              colaboradores.endereco = data.get('endereco', colaboradores.endereco)
              colaboradores.telefone = data.get('telefone', colaboradores.telefone)
              colaboradores.login = data.get('login', colaboradores.login)
              colaboradores.senha = data.get('senha', colaboradores.senha)
              colaboradores.status = data.get('status', colaboradores.status)

              db.session.commit()
              return 'colaborador atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar colaborador, {}'.format(str(e)), 405