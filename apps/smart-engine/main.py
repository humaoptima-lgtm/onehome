from fastapi import FastAPI

app = FastAPI(title="One Home Smart Engine", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to One Home Smart Engine"}
