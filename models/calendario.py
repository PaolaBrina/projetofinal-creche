from database.db import db
from sqlalchemy.dialects.mysql import LONGTEXT

class calendario(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'foto': self.foto,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    foto = db.Column(LONGTEXT)

    def __init__(self,foto):
        self.foto = foto