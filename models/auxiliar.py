from database.db import db

class auxiliar(db.Model):
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'nome': self.nome,
            'cpf': self.cpf,
            'datanascimento': self.datanascimento,
            'sexo': self.sexo,
            'email': self.email,
            'endereco': self.endereco,
            'telefone': self.telefone,
            'status': self.status,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String('50'))
    cpf = db.Column(db.Integer)
    datanascimento = db.Column(db.Date)
    sexo = db.Column(db.String('50'))
    email = db.Column(db.String('50'))
    endereco = db.Column(db.String('100'))
    telefone = db.Column(db.Integer)
    status = db.Column(db.Boolean)

    def __init__(self, nome, cpf, datanascimento, sexo, email, endereco, telefone, status):
        self.nome = nome
        self.cpf = cpf
        self.datanascimento = datanascimento
        self.sexo = sexo
        self.email = email
        self.endereco = endereco
        self.telefone = telefone
        self.status = status
        