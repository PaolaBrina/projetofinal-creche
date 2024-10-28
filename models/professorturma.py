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
            'periodo': self.alergia,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codturma = db.Column(ForeignKey('turma.codigo'))
    codprofessor = db.Column(ForeignKey('professor.codigo'))
    codauxiliar = db.Column(ForeignKey('auxiliar.codigo'))
    periodo = db.Column(db.String('50'))

    turma = relationship('turma', backref='professorturma')
    professor = relationship('professor', backref='professorturma')
    auxiliar = relationship('auxiliar', backref='professorturma')

    def __init__(self,codturma, codprofessor, codauxiliar, periodo):
        self.codturma = codturma
        self.codprofessor = codprofessor
        self.codauxiliar = codauxiliar
        self.periodo = periodo 