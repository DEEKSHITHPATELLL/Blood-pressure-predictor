import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier

df = pd.read_csv(r"D:/projects/BP predictor/backend/dataset/bp_dataset.csv")

X = df.drop("BP_Category", axis=1)
y = df["BP_Category"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

label_map = {"Normal": 0, "Medium": 1, "High": 2}
inverse_label_map = {v: k for k, v in label_map.items()}

y_train_enc = y_train.map(label_map)
y_test_enc = y_test.map(label_map)

xgb_model = XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    objective="multi:softmax",
    num_class=3,
    eval_metric="mlogloss",
    random_state=42
)

xgb_model.fit(X_train, y_train_enc)

y_pred = xgb_model.predict(X_test)

print("XGBoost Accuracy:", accuracy_score(y_test_enc, y_pred))
print(classification_report(
    y_test_enc,
    y_pred,
    target_names=label_map.keys()
))

joblib.dump(xgb_model, "bp_xgboost_model.pkl")
joblib.dump(inverse_label_map, "bp_label_map.pkl")

print("XGBoost model saved successfully!")
