from flask import request
from database.db import db
from models.aluno import aluno
from models.professorturma import professorturma
from models.alunoturma import alunoturma

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
            
            
def get_alunos_por_professor(codigo_professor):
    try:
        # Busca as turmas associadas ao professor
        turmas = professorturma.query.filter_by(codprofessor=codigo_professor).all()
        if not turmas:
            raise Exception('Nenhuma turma encontrada para este professor.')

        # Obtém os códigos das turmas
        cod_turmas = [turma.codturma for turma in turmas]

        # Busca os alunos e suas turmas
        alunos_turmas = (
            db.session.query(aluno, alunoturma.codturma)  # Agora inclui o codturma
            .join(alunoturma, aluno.codigo == alunoturma.codaluno)
            .filter(alunoturma.codturma.in_(cod_turmas))
            .all()
        )

        # Converte os alunos para uma lista de dicionários, incluindo o código da turma
        return [
            {"codigo": aluno.codigo, "nome": aluno.nome, "codturma": codturma}
            for aluno, codturma in alunos_turmas
        ]
    except Exception as e:
        raise Exception(f"Erro ao buscar alunos: {str(e)}")
