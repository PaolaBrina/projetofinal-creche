from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class avisos(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codturma': self.codturma,
            'datahora': self.datahora,
            'descricao': self.descricao,
            'foto': self.foto,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codturma = db.Column(ForeignKey('turma.codigo'))
    datahora = db.Column(db.DateTime(timezone=True),server_default=func.now())
    descricao = db.Column(db.Text)
    foto = db.Column(db.String('100'))

    turma = relationship('turma', backref='avisos')


    def __init__(self,codturma, datahora, descricao,foto):
        self.codturma = codturma
        self.datahora = datahora
        self.descricao = descricao
        self.foto = foto