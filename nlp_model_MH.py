from together import Together
import api_key

client = Together(api_key=api_key.togetherai_key)
def response(user_input, prev_content):
    content = ""
    stream = client.chat.completions.create(
    model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages = [
            {"role": "system", "content": "You are a helpful mental health assistant who also loves animals a lot and spread your love towards animals to all. And answer in short and precise"},
            {"role": "assistant", "content": prev_content},
            {"role": "user", "content": user_input}
        ],
        stream=True
    )
    
    return stream

running = True  

prev_content = ""
while running:
    user_input = input("Enter your worry here: ")
    if user_input == 'exit':
        running = False
        break
    
    reply = response(user_input, prev_content)
    for chunk in reply:
        prev_content += chunk.choices[0].delta.content
        print(chunk.choices[0].delta.content or "", end="")
        
    print("")
