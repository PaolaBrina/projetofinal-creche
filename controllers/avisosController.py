from flask import request,jsonify
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
                # Acesso ao código diretamente na URL
                codigo = request.view_args.get('codigo')
                if not codigo:
                    return 'Código do aviso não fornecido.', 400

                aviso = avisos.query.get(codigo)
                if aviso:
                    db.session.delete(aviso)
                    db.session.commit()
                    return 'Aviso excluído com sucesso', 200
                else:
                    return 'Aviso não encontrado', 404
            except Exception as e:
                return f'Erro ao excluir aviso. Erro: {str(e)}', 400


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

# Função para deletar avisos
def delete_aviso(codigo):
    try:
        if not codigo:
            return 'Código do aviso não fornecido.', 400

        aviso = avisos.query.get(codigo)
        if aviso:
            db.session.delete(aviso)
            db.session.commit()
            return 'Aviso excluído com sucesso', 200
        else:
            return 'Aviso não encontrado', 404
    except Exception as e:
        return f'Erro ao excluir aviso. Erro: {str(e)}', 400

def atualizar_aviso(data):
    try:
        # Verifica se o código foi fornecido
        codigo = data.get('codigo')
        if not codigo:
            return jsonify({'message': 'Código do aviso é obrigatório'}), 400

        # Busca o aviso pelo código
        aviso = avisos.query.get(codigo)
        if not aviso:
            return jsonify({'message': 'Aviso não encontrado'}), 404

        # Atualiza os campos, mantendo os valores existentes caso não sejam fornecidos
        aviso.codturma = data.get('codturma', aviso.codturma)
        aviso.titulo = data.get('titulo', aviso.titulo)
        aviso.autor = data.get('autor', aviso.autor)
        aviso.datahora = data.get('datahora', aviso.datahora)
        aviso.descricao = data.get('descricao', aviso.descricao)
        aviso.foto = data.get('foto', aviso.foto)

        # Salva as alterações no banco de dados
        db.session.commit()
        return jsonify({'message': 'Aviso atualizado com sucesso'}), 200
    except Exception as e:
        return jsonify({'message': f'Erro ao atualizar aviso: {str(e)}'}), 500

def atualizar_aviso(codigo):
    try:
        # Busca o aviso pelo código
        aviso = avisos.query.get(codigo)
        if not aviso:
            return jsonify({'message': 'Aviso não encontrado'}), 404

        # Obtém os dados enviados no corpo da requisição
        data = request.get_json()

        # Atualiza os campos fornecidos
        aviso.codturma = data.get('codturma', aviso.codturma)
        aviso.titulo = data.get('titulo', aviso.titulo)
        aviso.autor = data.get('autor', aviso.autor)
        aviso.datahora = data.get('datahora', aviso.datahora)
        aviso.descricao = data.get('descricao', aviso.descricao)
        aviso.foto = data.get('foto', aviso.foto)

        # Salva as alterações no banco de dados
        db.session.commit()
        return jsonify({'message': 'Aviso atualizado com sucesso'}), 200

    except Exception as e:
        return jsonify({'message': f'Erro ao atualizar aviso: {str(e)}'}), 500