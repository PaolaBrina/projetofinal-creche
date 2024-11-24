from flask import request
from database.db import db
from models.avisos import avisos

def avisosController():
        if request.method == 'POST':
            try:
                data = request.get_json()
                print("Dados recebidos:", data)  # Log do JSON recebido

                # Cria o objeto usando argumentos nomeados
                aviso = avisos(
                    codturma=data['codturma'],
                    titulo=data['titulo'],
                    autor=data['autor'],
                    datahora=data['datahora'],  # Conversão para datetime
                    descricao=data['descricao'],
                    foto=data['foto']
                )
                print("Objeto criado:", aviso.__dict__)  # Verifique os atributos do objeto

                db.session.add(aviso)
                db.session.commit()
                return 'Aviso criado com sucesso', 200
            except Exception as e:
                print(f'Erro: {e}')  # Log de erro
                return f'Avisos nao foi criado, {e}', 400
                


        elif request.method == 'GET':
            try:
                data = avisos.query.all()
                new = {'avisos': [avisos.to_dict() for avisos in data]}
                return new, 200
            except Exception as e:
                return 'nao foi possivel buscar Avisos. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                aviso = avisos.query.get(codigo)
                if aviso:
                    db.session.delete(aviso)
                    db.session.commit()
                    return 'avisos excluído com sucesso', 200
                else:
                    return 'avisos não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir avisos. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              aviso = avisos.query.get(codigo)
              if aviso is None:
                   return 'fotos não encontrado', 404
              aviso.codturma = data.get('codturma', aviso.codturma)
              aviso.titulo = data.get('titulo', aviso.titulo)
              aviso.autor = data.get('autor', aviso.autor)
              aviso.datahora = data.get('datahora', aviso.datahora)
              aviso.descricao = data.get('descricao', aviso.descricao)
              aviso.foto = data.get('foto', aviso.foto)

              db.session.commit()
              return 'Avisos atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar Avisos, {}'.format(str(e)), 405

