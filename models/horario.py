from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import LONGTEXT

class horario(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codturma': self.codturma,
            'foto': self.foto,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codturma = db.Column(ForeignKey('turma.codigo'))
    foto = db.Column(LONGTEXT)

    turma = relationship('turma', backref='horario')


    def __init__(self,codturma,foto):
        self.codturma = codturma
        self.foto = foto