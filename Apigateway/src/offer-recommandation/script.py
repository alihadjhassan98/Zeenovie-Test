# import sys
# import json
 
# def main():
#     # Read the input data from a file
#     input_file_path = './src/recommandation/input.json'
#     with open(input_file_path, 'r') as f:
#         input_json = f.read()
 
#     input_data = json.loads(input_json)
 
#     # Do something with the input_data
#     offers = input_data['offers']
#     first_offer = offers[0]
 
#     # Print the first offer to stdout in a format that can be parsed by the controller
#     print(json.dumps(first_offer))
 
# if __name__ == '__main__':
#     main()
 
import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
 
 
def main():
    # Read the input data from a file
    input_file_path = './src/offer-recommandation/input.json'
    with open(input_file_path, 'r') as f:
        input_json = f.read()
 
    input_data = json.loads(input_json)
 
    # Get the offers and pro_data from the input_data
    offers = input_data['offers']
    pro_data = input_data['proData']
    # Convert the offers list into a DataFrame
    offers_df = pd.DataFrame(offers)
 
    # Ensure all columns are strings
    offers_df['titleO'] = offers_df['titleO'].astype(str)
    offers_df['LevelOfEducation'] = offers_df['LevelOfEducation'].astype(str)
    offers_df['LevelOfExperience'] = offers_df['LevelOfExperience'].astype(str)
    offers_df['JobCategorie'] = offers_df['JobCategorie'].astype(str)
 
    # Combine relevant text features into a single string
    offers_df['combined_features'] = offers_df['titleO'].astype(str) + ' ' + offers_df['LevelOfEducation'].astype(str) + ' ' + \
        offers_df['LevelOfExperience'].astype(str) + ' ' + \
        offers_df['JobCategorie'].astype(str)
 
    # Create a new offer entry for pro_data
    pro_offer = {
        "titleO": pro_data["Title"],
        "LevelOfEducation": pro_data["LevelOfEducation"],
        "LevelOfExperience": pro_data["LevelOfExperience"],
        "JobCategorie": pro_data["JobCategorie"],
    }
 
    # Add the pro_offer to the DataFrame
    pro_offer_df = pd.DataFrame([pro_offer])
    pro_offer_df['combined_features'] = pro_offer_df['titleO'].astype(str) + ' ' + pro_offer_df['LevelOfEducation'].astype(str) + ' ' + \
        pro_offer_df['LevelOfExperience'].astype(str) + ' ' + \
        pro_offer_df['JobCategorie'].astype(str)
    offers_df = pd.concat([offers_df, pro_offer_df], ignore_index=True)
 
    # Calculate the TF-IDF matrix
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(offers_df['combined_features'])
 
    # Calculate the cosine similarity between each offer
    cosine_sim = cosine_similarity(tfidf_matrix)
 
    # Get the index of the pro_offer in the DataFrame
    pro_index = offers_df.index[-1]
 
    # Get the similarity scores for the pro_offer
    sim_scores = list(enumerate(cosine_sim[pro_index]))
 
    # Sort the offers by similarity
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
 
    # Get the top 10 most similar offers
    top_10_offers = sim_scores[1:11]
 
    # Get the offer indices
    offer_indices = [i[0] for i in top_10_offers]

 
    # Return the top 10 most similar offers
    recommended_offers = offers_df.iloc[offer_indices].to_dict('records')
    output = recommended_offers
  
    # Print the recommended offers to stdout in a format that can be parsed by the controller
    print(json.dumps(output, indent=4))
 
 
 
if __name__ == '__main__':
    main()