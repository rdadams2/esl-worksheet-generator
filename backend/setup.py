from setuptools import setup, find_packages

setup(
    name="esl-worksheet-generator",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.109.0",
        "uvicorn>=0.27.0",
        "sqlmodel>=0.0.8",
        "alembic>=1.13.0",
        "psycopg2-binary>=2.9.9",
        "python-multipart>=0.0.6",
        "httpx>=0.26.0",
        "pydantic-settings>=2.1.0",
        "python-jose[cryptography]>=3.3.0",
        "passlib[bcrypt]>=1.7.4",
    ],
    python_requires=">=3.10",
) 