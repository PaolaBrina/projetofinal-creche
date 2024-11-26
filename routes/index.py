from routes.turmaRoutes import turma
from routes.fotosRoutes import fotos
from routes.atividadesRoutes import atividades
from routes.auxiliarRoutes import auxiliar
from routes.horarioRoutes import horario
from routes.responsavelRoutes import responsavel
from routes.alunoRoutes import aluno
from routes.alunoturmaRoutes import alunoturma
from routes.avisosRoutes import avisos
from routes.chamadaRoutes import chamada
from routes.informacoesadicionaisRoutes import informacoesadicionais
from routes.colaboradorRoutes import colaborador
from routes.professorRoutes import professor
from routes.professorturmaRoutes import professorturma
from routes.meudiamanhaRoutes import meudiamanha
from routes.meudiatardeRoutes import meudiatarde
from routes.loginRoutes import login
from routes.professorturmaRoutes import professorturma
from routes.listademateriaisRoutes import listademateriais
from routes.calendarioRoutes import calendario
from routes.listademateriaisRoutes import lista_materiais_bp
from routes.horarioRoutes import horarios_bp
from routes.both_meu_diaRoute import meu_dia_bp
from routes.atividadesRoutes import atividades_bp
from routes.fotosRoutes import fotos_bp
from routes.alunoRoutes import alunos_bp

def default_routes(app):
    turma(app)
    fotos(app)
    atividades(app)
    auxiliar(app)
    horario(app)
    responsavel(app)
    aluno(app)  
    alunoturma(app)
    avisos(app)
    chamada(app)
    informacoesadicionais(app)
    colaborador(app)
    professor(app)
    professorturma(app)
    meudiamanha(app)
    meudiatarde(app)
    login(app)
    professorturma(app)
    listademateriais(app)
    calendario(app)
    app.register_blueprint(lista_materiais_bp)  # Registrar o blueprint corretamente
    app.register_blueprint(horarios_bp)  # Registrar o blueprint corretamente
    app.register_blueprint(meu_dia_bp)  # Registrar o blueprint corretamente
    app.register_blueprint(atividades_bp)  # Registrar o blueprint corretamente
    app.register_blueprint(fotos_bp)  # Registrar o blueprint corretamente
    app.register_blueprint(alunos_bp)
