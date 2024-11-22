from models.aluno import Aluno
from models.alunoturma import alunoturma
from models.professorturma import TurmaProfessor
from database import db

def get_alunos_by_professor(codigo_professor):
    try:
        # Consulta com JOIN
        alunos = db.session.query(Aluno.nome).join(
            alunoturma, Aluno.codigo == alunoturma.codaluno
        ).join(
            TurmaProfessor, alunoturma.codturma == TurmaProfessor.codturma
        ).filter(
            TurmaProfessor.codprofessor == codigo_professor
        ).all()

        # Retornar apenas os nomes
        return [aluno.nome for aluno in alunos]
    except Exception as e:
        raise e
