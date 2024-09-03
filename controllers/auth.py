from flask import Flask, request, jsonify, redirect, url_for
from database.db import db

def check_credentials(login, senha):    
    tables = ["professor", "colaborador", "responsavel"]
    roles = []
    
    for table in tables:
        query = f"SELECT * FROM {table} WHERE login =  AND senha = "
        cursor.execute(query, (login, senha))
        result = cursor.fetchone()
        if result:
            roles.append(table)
    
    return roles

def login():
    login = request.json.get('login')
    senha = request.json.get('senha')
    
    if not login or not senha:
        return jsonify({"error": "Login and senha are required"}), 400
    
    roles = check_credentials(login, senha)
    
    if len(roles) == 1:
        role = roles[0]
        if role == "professor":
            return jsonify({"redirect": url_for('HomeProfessor')})
        elif role == "colaborador":
            return jsonify({"redirect": url_for('HomeColaborador')})
        elif role == "responsavel":
            return jsonify({"redirect": url_for('HomeResponsavel')})
    elif len(roles) > 1:
        return jsonify({"roles": roles, "redirect": url_for('Selecione')})
    else:
        return jsonify({"error": "Invalid login or senha"}), 401

@app.route('/Selecione')
def Selecione():
    return "Select your role page"

@app.route('/HomeProfessor')
def HomeProfessor():
    return "Welcome Professor!"

@app.route('/HomeColaborador')
def HomeColaborador():
    return "Welcome Colaborador!"

@app.route('/HomeResponsavel')
def HomeResponsavel():
    return "Welcome Responsavel!"
