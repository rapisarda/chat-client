FIG=docker-compose

start: build up # Install and start the project

stop:           ## Remove docker containers
	$(FIG) kill
	$(FIG) rm -v --force

reset: stop start # Reset the whole project

build:
	$(FIG) build

up:
	$(FIG) up -d --remove-orphans

logf:
	$(FIG) logs -f