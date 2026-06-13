from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Archive System Running"

@app.route("/records")
def records():

    query = """
    SELECT *
    FROM active_records
    LIMIT 20
    """

    return "Records Found"

if __name__ == "__main__":
    app.run(debug=True)