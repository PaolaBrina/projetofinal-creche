from flask import request
from database.db import db
from models.fotos import fotos
from models.turma import turma
from models.alunoturma import alunoturma
from models.aluno import aluno

def fotosController():
        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                foto = fotos(data['codturma'],data['datahora'], data['descricao'], data['foto'])
                db.session.add(foto)
                db.session.commit()
                return 'fotos criado com sucesso', 200 
            
            except Exception as e:
                return 'fotos nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = fotos.query.all()
                new = {'fotos': [fotos.to_dict() for fotos in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar fotos. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                foto = fotos.query.get(codigo)
                if foto:
                    db.session.delete(foto)
                    db.session.commit()
                    return 'fotos excluído com sucesso', 200
                else:
                    return 'fotos não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir fotos. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              foto = fotos.query.get(codigo)
              if foto is None:
                   return 'fotos não encontrado', 404
              foto.codturma = data.get('codturma', foto.codturma)
              foto.datahora = data.get('datahora', foto.datahora)
              foto.descricao = data.get('descricao', foto.descricao)
              foto.foto = data.get('foto', foto.foto)

              db.session.commit()
              return 'fotos atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar fotos, {}'.format(str(e)), 405

def get_fotos_por_responsavel(codigo_responsavel):
    try:
        print(f"Código recebido no controlador: {codigo_responsavel}")  # LOG TEMPORÁRIO

        # Realiza a consulta com joins e filtros
        fotos_data = db.session.query(
            turma.codigo.label('codturma'),  # Código da turma
            fotos.datahora,            # Data e hora
            fotos.descricao,           # Descrição
            fotos.foto                 # Foto
        ).join(alunoturma, alunoturma.codturma == turma.codigo) \
         .join(aluno, aluno.codigo == alunoturma.codaluno) \
         .join(fotos, fotos.codturma == turma.codigo) \
         .filter(aluno.codresponsavel == codigo_responsavel) \
         .distinct()  # Remove duplicações

        fotos_data = fotos_data.all()  # Chama o método all()

        print("Dados retornados da consulta:", fotos_data)  # LOG

        # Formatar os resultados em uma lista de dicionários
        fotos = [
            {
                "codturma": item.codturma,
                "datahora": item.datahora.strftime('%d/%m/%Y %H:%M:%S') if item.datahora else None,  # Formata a data
                "descricao": item.descricao,
                "foto": item.foto
            }
            for item in fotos_data
        ]

        # Log para verificar os dados que serão enviados
        for fotos in fotos:
            print(f"Código da Turma: {fotos['codturma']}, Data: {fotos['datahora']}, Descrição: {fotos['descricao'][:30]}...")

        return fotos  # Retorna a lista de fotos diretamente
    except Exception as e:
        print(f"Erro no controlador: {str(e)}")  # LOG de erro
        raise e


