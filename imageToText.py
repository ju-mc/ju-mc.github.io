from transformers import pipeline
from openai import OpenAI
import os
from dotenv import load_dotenv

def generate_description(image_path):
    load_dotenv()
    captioner = pipeline("image-to-text",model="Salesforce/blip-image-captioning-base")
    caption=captioner(image_path)

    openai_api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=openai_api_key)

    completion = client.chat.completions.create(
    model="gpt-4-1106-preview",
    messages=[
        {"role": "system", "content": "You are an art critic. You are pretentious and skilled in interpreting the most complex or the most simple works of art."},
        {"role": "user", "content": "I am going to give you a caption of a work of art. Rewrite that caption to sound like a very eloquent, complex artistic analysis. Be as philosophical or political or sociological as you want, but you must approach from the perspective of an art critic. Imagine that what you write will be on a plaque next to the artwork in a gallery. Please use at least 50 words and maximum 300 words. Here is the caption: " + caption[0]['generated_text']}
    ]
    )

    return completion.choices[0].message.content