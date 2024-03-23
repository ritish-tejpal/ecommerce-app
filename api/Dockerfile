FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /app/api

COPY requirements.txt .

RUN python -m venv venv && \
    /app/api/venv/bin/pip install --upgrade pip && \
    /app/api/venv/bin/pip install -r requirements.txt

COPY . ./

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]