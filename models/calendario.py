from database.db import db

class calendario(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'foto': self.foto,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    foto = db.Column(db.String('100'))

    def __init__(self,foto):
        self.foto = foto