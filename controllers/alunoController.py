from flask import request
from database.db import db
from models.aluno import aluno

def alunoController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                alunos = aluno( data['codresponsavel'], data['nome'], data['datanascimento'], data['sexo'], data['endereco'], data['foto'], data['status'])
                db.session.add(alunos)
                db.session.commit()
                return 'aluno criado com sucesso', 200 
            
            except Exception as e:
                return 'aluno nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = aluno.query.all()
                new = {'aluno': [aluno.to_dict() for aluno in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar aluno. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                alunos = aluno.query.get(codigo)
                if alunos:
                    db.session.delete(alunos)
                    db.session.commit()
                    return 'aluno excluído com sucesso', 200
                else:
                    return 'aluno não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir aluno. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              alunos = aluno.query.get(codigo)
              if alunos is None:
                   return 'aluno não encontrado', 404
              alunos.nome = data.get('nome', alunos.nome)
              alunos.datanascimento = data.get('datanascimento', alunos.datanascimento)
              alunos.sexo = data.get('sexo', alunos.sexo)
              alunos.endereco = data.get('endereco', alunos.endereco)
              alunos.foto = data.get('foto', alunos.foto)
              alunos.status = data.get('status', alunos.status)

              db.session.commit()
              return 'aluno atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar aluno, {}'.format(str(e)), 405