from typing import List
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from ..classes import Strain
from ..database import DatabaseAccessor
from ..classes import ReducedStrain
from dotenv import load_dotenv
import os
import pandas as pd
import numpy as np

load_dotenv()

url: str = os.getenv("DB_URL")
key: str = os.getenv("DB_API_KEY")
openai_key: str = os.getenv("OPENAI_API_KEY")


class StrainVectorizer:
    def __init__(self, strains: List[Strain]) -> None:
        self.reduced_strains = [ReducedStrain(**strain.__dict__) for strain in strains]

        self.le = LabelEncoder()
        self.tfidf = TfidfVectorizer()
        self.scaler = StandardScaler()

        self.fit(pd.DataFrame([strain.__dict__ for strain in self.reduced_strains]))

    def fit(self, df) -> None:  # Replace NaN values with 0
        self.le.fit(df.category)
        self.tfidf.fit(df.name)
        self.tfidf.fit(df.description)
        self.scaler.fit(
            df[["averageRating", "thcPercent"]], ["averageRating", "thcPercent"]
        )

    def transform(self, instance: ReducedStrain) -> np.ndarray:
        instance_dict = instance.__dict__
        instance_dict = {
            key: value if pd.notnull(value) else 0
            for key, value in instance_dict.items()
        }

        name = self.tfidf.transform([instance.name]).toarray()[0]
        description = self.tfidf.transform([instance.description]).toarray()[0]
        category = self.le.transform([instance.category])[0]
        averageRating, thcPercent = self.scaler.transform(
            [[instance.averageRating, instance.thcPercent]],
        )[0]

        transformed_values = np.concatenate(
            [name, description, [category, averageRating, thcPercent]]
        )

        # Replace any NaN values with 0
        transformed_values = np.where(
            np.isnan(transformed_values), 0, transformed_values
        )
        return transformed_values
