# Project commands

The most used commands could be done using yarn defined in the package.json file.

### `yarn setup`

Installs the required libraries using pipenv.

### `yarn start`

Starts the server using pipenv.

### `yarn migrate`

Runs both migration commands with the --sync-db flag to fix common database issues.

# Installation

Make shure you have python with version >= 3.8.0

Run `pip install pipenv`

Standing in the [sellpoint-server directory](https://gitlab.stud.idi.ntnu.no/tdt4140/landsby-4/gruppe-68/sellpoint/-/tree/master/sellpoint-server) run `pipenv install`

## Running the server

Run `pipenv run python manage.py runserver`

The server can now be reached on [localhost:8000](localhost:8000)

## Running other commands

To run single commands you can use `pipenv run` followed by the normal python command you would execute.

If you are executing multiple commands you can activate the virtual environment by running `pipenv shell`

All further commands will be executed in the vritual environment until you exit by running `exit`
