from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class aluno(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codresponsavel': self.codresponsavel,
            'nome': self.nome,
            'datanascimento': self.datanascimento,
            'sexo': self.sexo,
            'endereco': self.endereco,
            'foto': self.foto,
            'status': self.status,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codresponsavel = db.Column(db.ForeignKey('responsavel.codigo'))
    nome = db.Column(db.String('50'))
    datanascimento = db.Column(db.Date)
    sexo = db.Column(db.String('50'))
    endereco = db.Column(db.String('100'))
    foto = db.Column(db.String('100'))
    status = db.Column(db.Boolean)

    responsavel = relationship('responsavel', backref='aluno')


    def __init__(self, codresponsavel, nome, datanascimento, sexo, endereco, foto, status):
        self.codresponsavel = codresponsavel
        self.nome = nome
        self.datanascimento = datanascimento
        self.sexo = sexo
        self.endereco = endereco
        self.foto = foto
        self.status = status