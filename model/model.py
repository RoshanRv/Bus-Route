import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle


def train_model():
    df = pd.read_csv('crowd_levels.csv')

    X_train, X_test, y_train, y_test = train_test_split(
        df.iloc[:, :-1], df.iloc[:, -1], test_size=0.2, random_state=42)

    encoder = OneHotEncoder(drop='first').fit(
        X_train[['BusNo', 'RushHour', 'FestiveDay', 'Weather']])
    X_train_encoded = encoder.transform(
        X_train[['BusNo', 'RushHour', 'FestiveDay', 'Weather']])
    X_test_encoded = encoder.transform(
        X_test[['BusNo', 'RushHour', 'FestiveDay', 'Weather']])

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train_encoded, y_train)

    with open('model.pkl', 'wb') as f:
        pickle.dump((encoder, clf), f)


if __name__ == '__main__':
    train_model()
