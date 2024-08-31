from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class meudiamanha(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codaluno': self.codaluno,
            'codturma': self.codturma,
            'codprofessor': self.codprofessor,
            'datahora': self.datahora,
            'recado': self.recado,
            'xixi': self.xixi,
            'coco': self.coco,
            'sono': self.sono,
            'saude': self.saude,
            'medicacao': self.medicacao,
            'cafemanha': self.cafemanha,
            'almoco': self.almoco,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codaluno = db.Column(ForeignKey('aluno.codigo'))
    codturma = db.Column(ForeignKey('turma.codigo'))
    codprofessor = db.Column(ForeignKey('professor.codigo'))
    datahora = db.Column(db.DateTime(timezone=True),server_default=func.now())
    recado = db.Column(db.Text)
    xixi = db.Column(db.String('50'))
    coco = db.Column(db.String('50'))
    sono = db.Column(db.String('50'))
    saude = db.Column(db.String('50'))
    medicacao = db.Column(db.String('50'))
    cafemanha = db.Column(db.String('100'))
    almoco = db.Column(db.String('50'))

    aluno = relationship('aluno', backref='meudiamanha')
    turma = relationship('turma', backref='meudiamanha')
    professor = relationship('professor', backref='meudiamanha')


    def __init__(self, codturma, codaluno, codprofessor, datahora, recado, xixi, coco, sono, saude, medicacao, cafemanha, almoco):
        self.codaluno = codaluno
        self.codturma = codturma
        self.datahora = datahora
        self.recado = recado
        self.xixi = xixi
        self.coco = coco
        self.sono = sono
        self.saude = saude
        self.medicacao = medicacao
        self.cafemanha = cafemanha
        self.almoco = almoco