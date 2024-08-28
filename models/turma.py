from database.db import db

class turma(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'nome': self.nome,
            'sala': self.ala,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String('50'))
    sala = db.Column(db.String('50'))

    def __init__(self, nome, sala):
        self.nome = nome
        self.sala = sala