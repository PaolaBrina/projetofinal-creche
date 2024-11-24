from flask import request
from database.db import db
from models.atividades import atividades
from models.turma import turma
from models.alunoturma import alunoturma
from models.aluno import aluno

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

def get_atividades_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido no controlador: {codigo_responsavel}")  # LOG TEMPORÁRIO

        # Realiza a consulta com joins e filtros
        atividades_data = db.session.query(
            turma.codigo.label('codturma'),  # Código da turma
            turma.nome.label('nome_turma'),  # Nome da turma
            atividades.datahora,            # Data e hora
            atividades.descricao,           # Descrição
            atividades.foto                 # Foto
        ).join(alunoturma, alunoturma.codturma == turma.codigo) \
         .join(aluno, aluno.codigo == alunoturma.codaluno) \
         .join(atividades, atividades.codturma == turma.codigo) \
         .filter(aluno.codresponsavel == codigo_responsavel) \
         .distinct()  # Remove duplicações

        atividades_data = atividades_data.all()  # Chama o método all()

        print("Dados retornados da consulta:", atividades_data)  # LOG

        # Formatar os resultados em uma lista de dicionários
        atividades = [
            {
                "codturma": item.codturma,
                "nome_turma": item.nome_turma,
                "datahora": item.datahora.strftime('%d/%m/%Y %H:%M:%S') if item.datahora else None,  # Formata a data
                "descricao": item.descricao,
                "foto": item.foto
            }
            for item in atividades_data
        ]

        for atividade in atividades:
            print(f"Turma: {atividade['nome_turma']}, Data: {atividade['datahora']}, Descrição: {atividade['descricao'][:30]}...")  # LOG Melhorado
        
        return atividades  # Retorna a lista de atividades diretamente
    except Exception as e:
        print(f"Erro no controlador: {str(e)}")  # LOG de erro
        raise e
