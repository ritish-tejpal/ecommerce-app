FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /app/api

COPY ./api/requirements.txt .

RUN pip install -r requirements.txt

COPY . ./
