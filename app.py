from flask import Flask, jsonify
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

@app.route('/data', methods=['GET'])
def get_data():
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM port_trade_geo")  # Corrected table name
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
