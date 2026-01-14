from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
import os

app = Flask(__name__)
CORS(app, origins="*")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, 'models', 'bp_xgboost_model.pkl'))
label_map = joblib.load(os.path.join(BASE_DIR, 'models', 'bp_label_map.pkl'))
df = pd.read_csv(os.path.join(BASE_DIR, 'dataset', 'bp_dataset.csv'))

# mappings (unchanged)
gender_map = {'Male': 0, 'Female': 1, 'Other': 0}
diabetes_map = {'Yes': 1, 'No': 0}
cholesterol_map = {'Normal': 0, 'High': 1}
smoking_map = {'Yes': 1, 'No': 0}
alcohol_map = {'Yes': 1, 'No': 0}
physical_activity_map = {'Low': 0, 'Moderate': 1, 'High': 2}
stress_level_map = {'Low': 0, 'Moderate': 1, 'High': 2}

def preprocess_input(data):
    input_df = pd.DataFrame([data])

    input_df['Gender'] = input_df['Gender'].map(gender_map)
    input_df['Diabetes'] = input_df['Diabetes'].map(diabetes_map)
    input_df['Cholesterol'] = input_df['Cholesterol'].map(cholesterol_map)
    input_df['Smoking'] = input_df['Smoking'].map(smoking_map)
    input_df['Alcohol'] = input_df['Alcohol'].map(alcohol_map)
    input_df['PhysicalActivity'] = input_df['PhysicalActivity'].map(physical_activity_map)
    input_df['StressLevel'] = input_df['StressLevel'].map(stress_level_map)

    numeric_cols = [
        'Age','Gender','BMI','SystolicBP','DiastolicBP',
        'HeartRate','Diabetes','Cholesterol','Smoking',
        'Alcohol','PhysicalActivity','StressLevel','SleepHours'
    ]

    input_df[numeric_cols] = input_df[numeric_cols].astype(float)
    return input_df

def find_nearest_prediction(input_data):
    X_dataset = df.drop('BP_Category', axis=1)

    exact_match = (X_dataset == input_data.iloc[0]).all(axis=1)
    if exact_match.any():
        return df.loc[exact_match, 'BP_Category'].iloc[0]

    nbrs = NearestNeighbors(n_neighbors=5).fit(X_dataset)
    _, indices = nbrs.kneighbors(input_data)

    nearest_categories = df.iloc[indices[0]]['BP_Category']
    encoded = nearest_categories.map({v: k for k, v in label_map.items()})
    predicted_encoded = round(encoded.mean())

    return label_map[predicted_encoded]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_df = preprocess_input(data)
        prediction = find_nearest_prediction(input_df)
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
