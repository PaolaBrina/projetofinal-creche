from flask import request
from database.db import db
from models.horario import horario
from database.db import db
from models.turma import turma
from models.alunoturma import alunoturma
from models.aluno import aluno
from models.responsavel import responsavel


def horarioController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                horarios = horario(data['codturma'],data['foto'])
                db.session.add(horarios)
                db.session.commit()
                return 'Horarios criado com sucesso', 200 
            
            except Exception as e:
                return 'Horarios não foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = horario.query.all()
                new = {'horario': [horario.to_dict() for horario in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Horario. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                horarios = horario.query.get(codigo)
                if horarios:
                    db.session.delete(horarios)
                    db.session.commit()
                    return 'Horarios excluído com sucesso', 200
                else:
                    return 'Horarios não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir Horarios. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              horarios = horario.query.get(codigo)
              if horarios is None:
                   return 'Horarios não encontrado', 404
              horarios.codturma = data.get('codturma', horarios.codturma)
              horarios.foto = data.get('foto', horarios.foto)

              db.session.commit()
              return 'Horarios atualizado com sucesso', 200 
            
            except Exception as e:
                return 'Não foi possivel alterar Horarios, {}'.format(str(e)), 405



def get_horarios_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido no controlador: {codigo_responsavel}")  # LOG TEMPORÁRIO
        
        # Realiza a consulta com joins e filtros
        materiais_data = db.session.query(
            turma.nome.label('nome_turma'),  # Nome da turma
            horario.foto           # Imagem da lista de materiais
        ).join(alunoturma, alunoturma.codturma == turma.codigo) \
         .join(aluno, aluno.codigo == alunoturma.codaluno) \
         .join(horario, horario.codturma == turma.codigo) \
         .filter(aluno.codresponsavel == codigo_responsavel) \
         .distinct()  # Remove duplicações (considerando todas as colunas)

        materiais_data = materiais_data.all()  # Chama o método all() após a aplicação do distinct

        print("Dados retornados da consulta:", materiais_data)  # LOG

        # Formatar os resultados em uma lista de dicionários
        materiais = [
            {
                "nome_turma": item.nome_turma,
                "foto": item.foto
            }
            for item in materiais_data
        ]

        for material in materiais:
            print(f"Turma: {material['nome_turma']}, Foto: {material['foto'][:30]}...")  # LOG Melhorado
        
        return materiais  # Retorna a lista de materiais diretamente
    except Exception as e:
        raise e
