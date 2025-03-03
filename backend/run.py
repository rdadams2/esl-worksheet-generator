"""Run script for the ESL Worksheet Generator API."""

import sys
import os
import uvicorn

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    uvicorn.run("app.api.main:app", host="127.0.0.1", port=8002, reload=True) 