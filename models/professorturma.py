from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class professorturma(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codturma': self.codturma,
            'codprofessor': self.codprofessor,
            'codturma': self.codturma,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codturma = db.Column(ForeignKey('turma.codigo'))
    codprofessor = db.Column(ForeignKey('professor.codigo'))
    codauxiliar = db.Column(ForeignKey('auxiliar.codigo'))


    turma = relationship('turma', backref='professorturma')
    professor = relationship('professor', backref='professorturma')
    auxiliar = relationship('auxiliar', backref='professorturma')


    def __init__(self,codturma, codprofessor, codauxiliar):
        self.codturma = codturma
        self.codprofessor = codprofessor
        self.codauxiliar = codauxiliar
