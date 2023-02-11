app-image:
	docker build -t meetup-image -f Dockerfile.app.dev .
app:
	docker run --name meetup-container -d -p 8000:8000 --env-file .env --rm meetup-image
stop:
	docker stop meetup-container
db:
	docker run --name db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=153 -e POSTGRES_DB=meetup -d -p 5433:5432 postgres:14
