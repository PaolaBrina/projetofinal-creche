from database.db import db

class responsavel(db.Model): 
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
            'login': self.login,
            'senha': self.senha,
            'nomeautorizado1': self.nomeautorizado1,
            'telefoneautorizado1': self.telefoneautorizado1,
            'nomeautorizado2': self.nomeautorizado2,
            'telefoneautorizado2': self.telefoneautorizado2,
            'status': self.status,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String('50'))
    cpf = db.Column(db.String('50'))
    datanascimento = db.Column(db.Date)
    sexo = db.Column(db.String('50'))
    email = db.Column(db.String('50'))
    endereco = db.Column(db.String('100'))
    telefone = db.Column(db.Integer)
    login = db.Column(db.String('50'))
    senha = db.Column(db.String('50'))
    nomeautorizado1 = db.Column(db.String('50'))
    telefoneautorizado1 = db.Column(db.Integer)
    nomeautorizado2 = db.Column(db.String('50'))
    telefoneautorizado2 = db.Column(db.Integer)
    status = db.Column(db.Boolean)

    def __init__(self, nome, cpf, datanascimento, sexo, email, endereco, telefone, login, senha, nomeautorizado1, telefoneautorizado1, nomeautorizado2, telefoneautorizado2, status):
        self.nome = nome
        self.datanascimento = datanascimento
        self.sexo = sexo
        self.email = email
        self.endereco = endereco
        self.telefone = telefone
        self.login = login
        self.senha = senha
        self.nomeautorizado1 = nomeautorizado1
        self.telefoneautorizado1 = telefoneautorizado1
        self.nomeautorizado2  = nomeautorizado2
        self.telefoneautorizado2 = telefoneautorizado2
        self.status = status
        