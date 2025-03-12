from flask import Flask, jsonify, render_template
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="devu",
    database="trade_data"
)

# Route to serve the map.html page
@app.route('/')
def index():
    return render_template('index.html')  # Now linked to map.html

# API route to fetch data from the database
@app.route('/data', methods=['GET'])
def get_data():
    try:
        with db.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM port_trade_geo")  # Ensure the table name is correct
            data = cursor.fetchall()
        return jsonify(data)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
