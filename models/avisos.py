from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.mysql import LONGTEXT

class avisos(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codturma': self.codturma,
            'titulo': self.titulo,
            'autor': self.autor,
            'datahora': self.datahora,
            'descricao': self.descricao,
            'foto': self.foto,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codturma = db.Column(ForeignKey('turma.codigo'))
    titulo = db.Column(db.String('50'))
    autor = db.Column(db.String('50'))
    datahora = db.Column(db.DateTime(timezone=True),server_default=func.now())
    descricao = db.Column(db.Text)
    foto = db.Column(LONGTEXT)

    turma = relationship('turma', backref='avisos')


    def __init__(self,codturma, datahora, descricao,foto,autor,titulo):
        self.codturma = codturma
        self.titulo = titulo
        self.autor = autor
        self.datahora = datahora
        self.descricao = descricao
        self.foto = foto