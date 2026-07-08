from flask import Flask, request, render_template
from flask_cors import CORS
import oracledb

app = Flask(__name__)
CORS(app)

def conectar():
    return oracledb.connect(
        user="system",
        password="manager",
        dsn="localhost/FREE"
    )

# Abre a página inicial (index.html)
@app.route("/")
def home():
    return render_template("index.html")

# Cadastro do pet
@app.route("/cadastro-pet", methods=["POST"])
def cadastro_pet():
    dados = request.json

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO PETS (MATRICULA, NOME, COR, PESO, TAMANHO)
    VALUES (:1, :2, :3, :4, :5)
    """

    cursor.execute(sql, (
        dados["matricula"],
        dados["nome"],
        dados["cor"],
        dados["peso"],
        dados["tamanho"]
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return {"status": "Pet salvo com sucesso!"}

if __name__ == "__main__":
    app.run(debug=True)