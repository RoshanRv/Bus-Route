from flask import Flask, jsonify, request
from datetime import datetime
import pandas as pd
import pickle

app = Flask(__name__)

with open('model.pkl', 'rb') as file:
    model = pickle.load(file)


@app.route('/predict', methods=['POST'])
def predict():

    # Get the input data
    input_data = request.get_json()
    datetime.strptime(input_data["rhFrom"], '%Y-%m-%d %H:%M:%S')
    rush_hour_from = datetime.strptime(
        input_data["rhFrom"], '%Y-%m-%d %H:%M:%S')
    rush_hour_to = datetime.strptime(input_data["rhTo"], '%Y-%m-%d %H:%M:%S')
    festival_time = datetime.strptime(
        input_data["festTime"], '%Y-%m-%d %H:%M:%S')
    print(rush_hour_from, rush_hour_to, festival_time)
    # rush_hour_from =
    # rush_hour_to =
    # festival_time =

    # Create a new DataFrame with the input values
    input_data = pd.DataFrame({'rush_hour_from': [rush_hour_from], 'rush_hour_to': [
        rush_hour_to], 'festival_time': [festival_time]})

    predicted_crowd_level = model.predict(input_data)[0]

    perdict_percent = predicted_crowd_level * 25
    print("Predicted crowd level:", perdict_percent)

    return jsonify({'predictions': perdict_percent})


if __name__ == '__main__':
    app.run(debug=True)
