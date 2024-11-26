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
        print("1")

        # Realiza a consulta com joins e filtros
        atividades_data_query = db.session.query(
            turma.nome.label('nome_turma'),  # Nome da turma
            atividades.datahora,                         # Data e hora da atividade
            atividades.descricao,                        # Descrição da atividade
            atividades.foto            # Imagem da lista de materiais
        ).join(alunoturma, alunoturma.codturma == turma.codigo) \
         .join(aluno, aluno.codigo == alunoturma.codaluno) \
         .join(atividades, atividades.codturma == turma.codigo) \
         .filter(aluno.codresponsavel == codigo_responsavel) \
         .distinct()  # Remove duplicações (considerando todas as colunas)
        
        print("2")
        
        # Obtemos os dados de atividades da consulta
        atividades_data = atividades_data_query.all()  # Chama o método all() após o distinct

        print("Dados retornados da consulta:", atividades_data)  # LOG

        # Formatar os resultados em uma lista de dicionários
        atividades_list = [
            {
                "nome_turma": item.nome_turma,
                "datahora": item.datahora.strftime('%Y-%m-%d %H:%M:%S') if item.datahora else None,
                "descricao": item.descricao,
                "foto": item.foto
            }
            for item in atividades_data
        ]

        for atividade in atividades_list:
            print(f" Turma: {atividade['nome_turma']}, "
                  f"DataHora: {atividade['datahora']}, Descrição: {atividade['descricao'][:30]}...")  # LOG Melhorado
        
        return atividades_list  # Retorna a lista de atividades diretamente
    except Exception as e:
        print("3")
        print(e)
        raise e
