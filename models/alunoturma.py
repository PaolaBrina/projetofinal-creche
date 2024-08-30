from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class alunoturma(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codaluno': self.codaluno,
            'codturma': self.codturma,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codaluno = db.Column(ForeignKey('aluno.codigo'))
    codturma = db.Column(ForeignKey('turma.codigo'))


    turma = relationship('turma', backref='alunoturma')
    aluno = relationship('aluno', backref='alunoturma')


    def __init__(self,codturma, codaluno):
        self.codaluno = codaluno
        self.codturma = codturma
