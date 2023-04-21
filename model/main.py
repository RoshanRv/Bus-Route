from flask import Flask, request, jsonify
import pickle
import pandas as pd
import datetime

app = Flask(__name__)

with open('model.pkl', 'rb') as f:
    encoder, clf = pickle.load(f)


@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()
    print(input_data)

    currTime = datetime.datetime.now().strftime("%H:%M")
    print("Current Time : ", currTime)

    rhFromAM = datetime.time(6, 0, 0).strftime("%H:%M")
    rhToAM = datetime.time(8, 0, 0).strftime("%H:%M")
    rhFromPM = datetime.time(15, 30, 0).strftime("%H:%M")
    rhToPM = datetime.time(18, 0, 0).strftime("%H:%M")
    print(rhFromAM,  rhToAM, rhFromPM, rhToPM)

    if ((rhFromAM <= currTime <= rhToAM) | (rhFromPM <= currTime <= rhToPM)):
        input_data['RushHour'] = 'Yes'
    else:
        input_data['RushHour'] = 'No'

    print("RushHour ", input_data['RushHour'])

    new_data = pd.DataFrame(input_data, index=[0])
    print(new_data)

    new_data_encoded = encoder.transform(
        new_data[['BusNo', 'RushHour', 'FestiveDay', 'Weather']])

    prediction = clf.predict(new_data_encoded)[0]
    prediction = prediction.tolist()

    return jsonify(prediction=prediction)


if __name__ == '__main__':
    app.run()
