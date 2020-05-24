import requests

try:
    r = requests.get("http://localhost:8080")
    if r.status_code != 200:
        print("An Error Occured")
        print("Error:")
        print(str(r.text))
        exit(1)
    else:
        print("Successfully able to access React UI!")
        exit(0)
except Exception as e:
    print("An Error Occured")
    print("Error:")
    print(str(e))
    exit(1)