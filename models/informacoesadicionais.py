from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class informacoesadicionais(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codaluno': self.codaluno,
            'alergia': self.alergia,
            'restricaoalimentar': self.restricaoalimentar,
            'doenca': self.doenca,
    
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codaluno = db.Column(ForeignKey('aluno.codigo'))
    alergia = db.Column(db.String('50'))
    restricaoalimentar = db.Column(db.String('50'))
    doenca = db.Column(db.String('50'))

    aluno = relationship('aluno', backref='informacoesadicionais')


    def __init__(self, codaluno,alergia,restricaoalimentar,doenca):
        self.codaluno = codaluno
        self.alergia = alergia
        self.restricaoalimentar = restricaoalimentar
        self.doenca = doenca
