from flask import Flask, render_template
import pandas as pd
import math
app = Flask(__name__)
@app.route("/")
def main():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(port=8080)

restDf = pd.read_csv('berkeley_rest_table.csv')
crimeDf = pd.read_csv('crime_data_table.csv')
dentDf = pd.read_csv('dentists_table.csv')
openDf = pd.read_csv('open_table_berkeley.csv')
docDf = pd.read_csv('physicians_table.csv')
houseDf = pd.read_csv('rental_table.csv')
schoolDf = pd.read_csv('schools_table.csv')
groceDf = pd.read_csv('supermarkets_table.csv')
filterDfMap = {'Restaurants': restDf, 'Crime': crimeDf , 'Dentists': dentDf, 'Doctors': docDf,
             'Housing': houseDf, 'Schools': schoolDf, 'Supermarkets': groceDf, 'OpenTable': openDf}
radius = 1

@app.route("/dataRequest", methods=['POST'])
def dataRequest():
    def dist(row):
        return math.sqrt((row.Lat - lat) ** 2 + (row.Lon - lon) ** 2) * 69
    flter = request['filter']
    lat = request['lat']
    lon = request['lon']
    if flter == 'Crime':
        df = filterDfMap[flter]
    elif flter == 'OpenTable':
        df = filterDfMap[flter]
    else:
        df = filterDfMap[flter]
        df['dist'] = df.apply(dist, axis=1)
        result = df[df.dist < radius]
    json.dumps(result)
