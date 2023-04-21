import datetime
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor


# Import the necessary libraries


# Load the dataset
data = pd.read_csv('crowd_levels.csv')

# Define the features and target variable
features = ['rush_hour_from', 'rush_hour_to', 'festival_time']
target = 'crowd_level'

# Convert rush hour from and to times to datetime format
data['rush_hour_from'] = pd.to_datetime(data['rush_hour_from'])
data['rush_hour_to'] = pd.to_datetime(data['rush_hour_to'])

# Convert festival time to datetime format
data['festival_time'] = pd.to_datetime(data['festival_time'])

# Create a Random Forest regression model
model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)

# Train the model on the entire dataset
model.fit(data[features], data[target])

with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)
