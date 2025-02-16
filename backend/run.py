"""Run script for the ESL Worksheet Generator API."""

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.api.main:app", host="127.0.0.1", port=8001, reload=True) 