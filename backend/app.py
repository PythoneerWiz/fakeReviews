from flask import Flask,request
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import json
import pickle
import jsonify
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier


app = Flask(__name__)
CORS = CORS(app, origins="*")

HEADERS = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "accept-Language": "en-US en;q=0.5"
}
with open('./model/rf.pkl', 'rb') as file:
    model = pickle.load(file)
class ReviewData:
    def __init__(self, category, rating, label, text):
        self.category = "Electronics_5"
        self.rating = rating
        self.label = label
        self.text = text
@app.route('/predict', methods=['POST'])
def predict_reviews():
    data = request.json
    reviews = data['reviews']
    category = data['category']
    rating = data['rating']
    predictions = []
    for review_text in reviews:
        review_data = ReviewData(category, rating, "", review_text)
        prediction = model.predict([f'{review_data.text} {review_data.category} {review_data.rating}'])[0]
        predictions.append({'review': review_data.text, 'category': review_data.category, 'rating': review_data.rating, 'prediction': prediction})

    return jsonify(predictions)


def get_data_from_amazon(url,n):
    amazon_data= []
    r = requests.get(url,headers=HEADERS)
    soup = BeautifulSoup(r.content,"html.parser")
    links = soup.find_all("a",attrs={"class": "a-link-normal s-no-outline"})
    while n!=0:       
        link_variable = links[n].get("href")
        product_link = "https://www.amazon.in" + link_variable
        new_r = requests.get(product_link,headers=HEADERS)
        new_soup = BeautifulSoup(new_r.content,'html.parser')
        title_tag = new_soup.find("span", attrs={"id" : "productTitle"})
        product_title = title_tag.text.strip()
        img = new_soup.find("img",attrs={"id":"landingImage"}).get("data-a-dynamic-image")
        data = json.loads(img)
        product_image = list(data.keys())[0]
        product_price = new_soup.find("span",attrs={"class":"a-price-whole"}).text[:-1]
        try:
            product_rating = new_soup.find("span", attrs={"data-hook": "rating-out-of-text"}).text.strip()
        except AttributeError:
            product_rating = "Rating not found"
        products_review = new_soup.find_all("div",attrs={"class":"a-section review aok-relative"})
        all_reviews = []
        for reviews in products_review:
            review_profile_name = reviews.find("span",attrs={"class":"a-profile-name"}).text
            review_stars = reviews.find("span",attrs={"class":"a-icon-alt"}).text
            review_date = reviews.find("span",attrs={"class":"a-size-base a-color-secondary review-date"}).text
            review_content = reviews.find("div",attrs={"class":"a-expander-content reviewText review-text-content a-expander-partial-collapse-content"}).text.strip()
            all_reviews.append({"name":review_profile_name,"stars":review_stars,"date":review_date,"content":review_content})
    
        data = {
        "product_title":product_title,
        "product_price":product_price,
        "product_image":product_image,
        "product_link":product_link,
        "product_rating":product_rating,
        "products_review":all_reviews
        }   
        amazon_data.append(data)
        n = n-1
    return amazon_data

def get_data_from_flipkart(url,n):
    flipkart_data= []
    r = requests.get(url,headers=HEADERS)
    soup = BeautifulSoup(r.content,"html.parser")
    links = soup.find_all("a",attrs={"class": "_1fQZEK"})
    while n!=0:     
        link_variable = links[n].get("href")
        product_link = "https://www.flipkart.com" + link_variable
        new_r = requests.get(product_link,headers=HEADERS)
        new_soup = BeautifulSoup(new_r.content,'html.parser')
        title_tag = new_soup.find("span", attrs={"class" : "B_NuCI"})
        product_title = title_tag.text.strip()
        product_image = new_soup.find("img",attrs={"class":"_396cs4 _2amPTt _3qGmMb"}).get("src").strip()
        product_price = new_soup.find("div",attrs={"class":"_30jeq3 _16Jk6d"}).text
        product_rating = new_soup.find("div",attrs={"class":"_2d4LTz"}).text.strip()
        products_review = new_soup.find_all("div",attrs={"class":"col _2wzgFH"})
        all_reviews = []
        for reviews in products_review:
            review_profile_name = reviews.find("p", attrs={"class": "_2V5EHH"}).text
            review_s = reviews.find("div", attrs={"class": "_1BLPMq"}).text
            review_content = reviews.find("div", attrs={"class": "t-ZTKy"}).text.replace("READ MORE", "")
            review_date = "2 months ago"  # Replace with actual date extraction if available

            # Create review dictionary
            review_dict = {
                "name": review_profile_name,
                "stars": review_s,
                "date": review_date,
                "content": review_content
            }

            all_reviews.append(review_dict)
    
        data = {
        "product_title":product_title,
        "product_price":product_price,
        "product_image":product_image,
        "product_link":product_link,
        "product_rating":product_rating,
        "products_review":all_reviews
        }   
        flipkart_data.append(data)
        n = n-1
    return flipkart_data



@app.route("/detect" , methods=["GET,POST"])

        

@app.route("/api/members", methods=["GET"])
def members():
    return {'product_title': 'THE BEAN CO Coffee Travel Mug | 380 ML | Double Walled Stainless Steel Vacuum Insulated (Green)',
 'product_price': '696',
 'product_image': r'https://m.media-amazon.com/images/I/51MoSQR+tlL._SX425_.jpg',
 'product_link': r'https://www.amazon.in/sspa/click?ie=UTF8&spc=MTo3NjAyOTAxMDE2NTY2MDk3OjE3MTI0ODE4NjU6c3BfYXRmOjMwMDExODg5NzA5NjkzMjo6MDo6&url=%2FBEAN-CO-Coffee-Stainless-Insulated%2Fdp%2FB0CRRSMK9S%2Fref%3Dsr_1_1_sspa%3Fdib%3DeyJ2IjoiMSJ9.G1S2pYkaVsI88gnQMQSRb1ZfRtnBJgFuMB-Gb_ClFQAS3WdgStnF1fOOGqRFV_IQUPvapxkebTMK8kQGS8Q_k6wd6tZvpSvIOC3XTNNHm4fIh-P2iqX8CqvxeJWkAUNYFTE7uCBsEIBgt8Krj3Je4ziZeK0Yly7FfA1YhLagKTtY0XRGTYlp82zac-pVI0BFDsUX-IYLQLeeQEUoUq15sBOJXzMCM7gaPaIY_BLmQmVF0_sAGhk0q9XqrPOmGWYwoBzVjklkuqrJp9JhAdo_ibTSq32scSOqLSINpm89n1U.D-DFCVxUP596zcZxJjs0Jz34ASlqKd8CZ5JoWRckYVo%26dib_tag%3Dse%26keywords%3Dcoffee%2Bmug%26qid%3D1712481865%26sr%3D8-1-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1',
 'product_rating': '5.0',
 'products_review': [{'name': 'Buddhadev',
   'stars': '5.0 out of 5 stars',
   'date': 'Reviewed in India on 17 March 2024',
   'content': 'Nice colour and designUseful for outdoorReally liked black mugSpill proofCapacity is good just needed more colours'}]}


@app.route("/api/abc", methods=["GET"])
def getdata():
    param = request.args.get("q")
    flipkart_url = f"https://www.flipkart.com/search?q={param}"
    amazon_url = f"https://www.amazon.in/s?k={param}"
    flipkart_data = get_data_from_flipkart(flipkart_url,3)
    amazon_data = get_data_from_amazon(amazon_url,3)
    print ("flipkart data\n",flipkart_data)
    print ("amazon data\n",amazon_data)
    return({"amazon":amazon_data,"flipkart":flipkart_data})


if __name__ == "__main__":
    app.run(debug=True)

