from flask import Flask, render_template, request, json
import pandas as pd
import math
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('welcome.html')

@app.route("/home")
def home():
    return render_template('index.html')

restDf = pd.read_csv('cleaned_data/berkeley_rest_table.csv')
crimeDf = pd.read_csv('cleaned_data/crime_data_table.csv')
dentDf = pd.read_csv('cleaned_data/dentists_table.csv')
openDf = pd.read_csv('cleaned_data/open_table_berkeley.csv')
docDf = pd.read_csv('cleaned_data/physicians_table.csv')
houseDf = pd.read_csv('cleaned_data/rentals_table.csv')
schoolDf = pd.read_csv('cleaned_data/schools_table.csv')
groceDf = pd.read_csv('cleaned_data/supermarkets_table.csv')
filterDfMap = {'Restaurants': restDf, 'Crime': crimeDf , 'Dentists': dentDf, 'Doctors': docDf,
             'Housing': houseDf, 'Schools': schoolDf, 'Supermarkets': groceDf, 'OpenTable': openDf}
radius = 0.3

@app.route("/dataRequest", methods=['POST'])
def dataRequest():
    def dist(row):
        return math.sqrt((row.Lat - float(lat)) ** 2 + (row.Lon - float(lon)) ** 2) * 69
    flter = request.form['filter']
    lat = request.form['lat']
    lon = request.form['lon']
#    if flter == 'Crime':
#        df = filterDfMap[flter]
#    elif flter == 'OpenTable':
#        df = filterDfMap[flter]
#    else:
    df = filterDfMap[flter]
    df['dist'] = df.apply(dist, axis=1)
    df = df[df.dist < radius]
    return json.dumps(df.to_dict('list'))

if __name__ == "__main__":
    app.run(port=8050)
