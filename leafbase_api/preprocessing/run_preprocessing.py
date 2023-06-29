from .fix_subtitle import FixSubtitle
from .fix_short_description import FixShortDescription
from .fix_description import FixDescription
from .fix_rating import FixRating
from .fix_recheck_all_strains import FixRecheckAllStrains
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

url: str = os.getenv("DB_URL")
key: str = os.getenv("DB_API_KEY")
openai_key: str = os.getenv("OPENAI_API_KEY")

current_directory = os.path.dirname(os.path.abspath(__file__))
script_path = current_directory + "/fix_recheck_all_strains.py"


def run_preprocessing(url: str, key: str) -> None:
    print("Running preprocessing...")

    FixSubtitle(url, key).update_all_records()
    FixShortDescription(url, key, openai_key).update_all_records()
    FixDescription(url, key, openai_key).update_all_records()
    FixRating(url, key).update_all_records()
    FixRecheckAllStrains(url, key).update_all_strains()

    print("Completed all preprocessing!")


if __name__ == "__main__":
    run_preprocessing(url, key)
