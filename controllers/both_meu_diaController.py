from flask import request
from database.db import db
from models.aluno import aluno
from models.alunoturma import alunoturma
from models.turma import turma
from models.professorturma import professorturma
from models.meudiamanha import meudiamanha
from models.meudiatarde import meudiatarde
from models.professor import professor

def both_meu_dia_por_responsavel(codigo_responsavel, periodo):
    try:
        print(f"Código recebido: {codigo_responsavel}, Período: {periodo}")


        periodo = periodo.lower()
        print(f"Código recebido: {codigo_responsavel}, Período: {periodo}")

        # Busca os alunos vinculados ao responsável
        alunos = db.session.query(aluno).filter(aluno.codresponsavel == codigo_responsavel).all()
        
        if not alunos:
            print(f"Nenhum aluno encontrado para o responsável {codigo_responsavel}.")
            return {"success": False, "message": "Nenhum aluno encontrado."}
        
        meu_dia_resultados = []

        # Itera sobre os alunos encontrados
        for aluno_obj in alunos:
            alunoturmas = db.session.query(alunoturma).filter(alunoturma.codaluno == aluno_obj.codigo).all()
            
            for alunoturma_obj in alunoturmas:
                turma_codigo = alunoturma_obj.codturma
                professor_turma_obj = db.session.query(professorturma).filter(professorturma.codturma == turma_codigo).first()
                
                if not professor_turma_obj:
                    continue

                codprofessor = professor_turma_obj.codprofessor

                # **Filtro explícito para o período**
                if periodo == "matutino":
                    meu_dia = db.session.query(meudiamanha).filter(
                        meudiamanha.codaluno == aluno_obj.codigo,
                        meudiamanha.codturma == turma_codigo,
                        meudiamanha.codprofessor == codprofessor
                    ).all()
                elif periodo == "vespertino":
                    meu_dia = db.session.query(meudiatarde).filter(
                        meudiatarde.codaluno == aluno_obj.codigo,
                        meudiatarde.codturma == turma_codigo,
                        meudiatarde.codprofessor == codprofessor,
                        professorturma.periodo == "Vespertino"  # Filtro pelo período correto
                    ).all()

                else:
                    meu_dia = []
                
                # **Formatação dos dados**
                for dia in meu_dia:
                    resultado = {
                        "codaluno": aluno_obj.nome,
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
            return {"success": True, "data": meu_dia_resultados}
        else:
            return {"success": False, "message": "Nenhum dado encontrado."}

    except Exception as e:
        print(f"Erro ao processar: {e}")
        return {"success": False, "message": str(e)}
