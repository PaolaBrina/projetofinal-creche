from flask import request
from database.db import db
from models.aluno import aluno
from models.alunoturma import alunoturma
from models.turma import turma
from models.professorturma import professorturma
from models.meudiamanha import meudiamanha
from models.meudiatarde import meudiatarde
from models.professor import professor

def both_meu_dia_por_responsavel(codigo_responsavel):
    try:
        # LOG TEMPORÁRIO: Exibe o código recebido para verificação
        print(f"Código recebido no controlador: {codigo_responsavel}")

        # Busca os alunos vinculados ao responsável
        alunos = db.session.query(aluno).filter(aluno.codresponsavel == codigo_responsavel).all()
        
        if not alunos:
            print(f"Nenhum aluno encontrado para o responsável {codigo_responsavel}.")
            return {"success": False, "message": "Nenhum aluno encontrado."}
        
        meu_dia_resultados = []

        # Itera sobre os alunos encontrados
        for aluno_obj in alunos:
            print(f"Processando aluno: {aluno_obj.nome} (Código: {aluno_obj.codigo})")
            
            # Busca as turmas associadas ao aluno
            alunoturmas = db.session.query(alunoturma).filter(alunoturma.codaluno == aluno_obj.codigo).all()
            
            if not alunoturmas:
                print(f"Aluno {aluno_obj.codigo} não está associado a nenhuma turma.")
                continue
            
            for alunoturma_obj in alunoturmas:
                turma_codigo = alunoturma_obj.codturma
                print(f"Turma associada ao aluno {aluno_obj.codigo}: {turma_codigo}")
                
                # Busca o professor e o período da turma
                professor_turma_obj = db.session.query(professorturma).filter(professorturma.codturma == turma_codigo).first()
                
                if not professor_turma_obj:
                    print(f"Nenhum professor encontrado para a turma {turma_codigo}.")
                    continue

                codprofessor = professor_turma_obj.codprofessor
                periodo = professor_turma_obj.periodo
                # Adicionando o print para verificar o valor do período
                print(f"Período: {periodo}")  # LOG

                print(f"Professor: {codprofessor}, Período: {periodo}")

                # Consulta na tabela apropriada (manhã ou tarde)
                if periodo.strip().lower() == "matutino":
                    meu_dia = db.session.query(meudiamanha).filter(
                        meudiamanha.codaluno == aluno_obj.codigo,
                        meudiamanha.codturma == turma_codigo,
                        meudiamanha.codprofessor == codprofessor
                    ).all()
                elif periodo.strip().lower() == "vespertino":
                    meu_dia = db.session.query(meudiatarde).filter(
                        meudiatarde.codaluno == aluno_obj.codigo,
                        meudiatarde.codturma == turma_codigo,
                        meudiatarde.codprofessor == codprofessor
                    ).all()
                else:
                    print(f"Período não reconhecido: {periodo}")  # LOG
                    meu_dia = []
                    


                # Adiciona os resultados ao retorno formatado
                for dia in meu_dia:
                    resultado = {
                        "codaluno": aluno_obj.nome,  # Usa o nome do aluno
                        "codturma": db.session.query(turma.nome).filter(turma.codigo == turma_codigo).scalar(),
                        "codprofessor": db.session.query(professor.nome).filter(professor.codigo == codprofessor).scalar(),
                        "datahora": dia.datahora,
                        "recado": dia.recado,
                        "xixi": dia.xixi,
                        "coco": dia.coco,
                        "sono": dia.sono,
                        "saude": dia.saude,
                        "medicacao": dia.medicacao,
                        "cafemanha": getattr(dia, "cafemanha", None),  # Apenas manhã
                        "almoco": getattr(dia, "almoco", None),        # Apenas manhã
                        "cafetarde": getattr(dia, "cafetarde", None),  # Apenas tarde
                        "janta": getattr(dia, "janta", None)           # Apenas tarde
                    }
                    meu_dia_resultados.append(resultado)

        if meu_dia_resultados:
            print("Resultados compilados com sucesso.")
            return {"success": True, "data": meu_dia_resultados}
        else:
            print("Nenhum dado encontrado para os alunos e turmas consultados.")
            return {"success": False, "message": "Nenhum dado encontrado."}

    except Exception as e:
        # LOG TEMPORÁRIO: Mostra o erro completo caso ocorra
        print(f"Erro ao processar: {e}")
        return {"success": False, "message": str(e)}
