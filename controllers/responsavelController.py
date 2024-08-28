from flask import request
from database.db import db
from models.responsavel import responsavel

def responsavelController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                responsaveis = responsavel(data['nome'], data['cpf'], data['datanascimento'], data['sexo'], data['email'], data['endereco'], data['telefone'], data['login'], data['senha'], data['nomeautorizado1'], data['telefoneautorizado1'], data['nomeautorizado2'], data['telefoneautorizado2'], data['status'])
                db.session.add(responsaveis)
                db.session.commit()
                return 'responsavel criado com sucesso', 200 
            
            except Exception as e:
                return 'responsavel nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = responsavel.query.all()
                new = {'responsavel': [responsavel.to_dict() for responsavel in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar responsavel. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                responsaveis = responsavel.query.get(codigo)
                if responsaveis:
                    db.session.delete(responsaveis)
                    db.session.commit()
                    return 'responsavel excluído com sucesso', 200
                else:
                    return 'responsavel não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir responsavel. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              responsaveis = responsavel.query.get(codigo)
              if responsaveis is None:
                   return 'responsavel não encontrado', 404
              responsaveis.nome = data.get('nome', responsaveis.nome)
              responsaveis.cpf = data.get('cpf', responsaveis.cpf)
              responsaveis.datanascimento = data.get('datanascimento', responsaveis.datanascimento)
              responsaveis.sexo = data.get('sexo', responsaveis.sexo)
              responsaveis.email = data.get('email', responsaveis.email)
              responsaveis.endereco = data.get('endereco', responsaveis.endereco)
              responsaveis.telefone = data.get('telefone', responsaveis.telefone)
              responsaveis.login = data.get('login', responsaveis.login)
              responsaveis.senha = data.get('senha', responsaveis.senha)
              responsaveis.nomeautorizado1 = data.get('nomeautorizado1', responsaveis.nomeautorizado1)
              responsaveis.telefoneautorizado1 = data.get('telefoneautorizado1', responsaveis.telefoneautorizado1)
              responsaveis.nomeautorizado2 = data.get('nomeautorizado2', responsaveis.nomeautorizado2)
              responsaveis.telefoneautorizado2 = data.get('telefoneautorizado2', responsaveis.telefoneautorizado2)
              responsaveis.status = data.get('status', responsaveis.status)

              db.session.commit()
              return 'responsavel atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar responsavel, {}'.format(str(e)), 405