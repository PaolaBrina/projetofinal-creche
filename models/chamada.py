from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class chamada(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codaluno': self.codaluno,
            'codturma': self.codturma,
            'datahora': self.datahora,
            'presenca': self.presenca,
            'observacao': self.observacao,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codaluno = db.Column(ForeignKey('aluno.codigo'))
    codturma = db.Column(ForeignKey('turma.codigo'))
    datahora = db.Column(db.DateTime(timezone=True),server_default=func.now())
    presenca = db.Column(db.String('50'))
    observacao = db.Column(db.Text)


    turma = relationship('turma', backref='chamada')
    aluno = relationship('aluno', backref='chamada')


    def __init__(self,codturma, codaluno,datahora,presenca, observacao):
        self.codaluno = codaluno
        self.codturma = codturma
        self.datahora = datahora
        self.presenca = presenca
        self.observacao = observacao
