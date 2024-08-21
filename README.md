# TypeORM - Typescript - Inversify starter template

1. `touch .env`

2. Fill the mysql DB data on the env file.

3. Since the TypeORM's `migrate` script does not have access to the `.env` file, we need to setup the db data as environment variables on your system first:  
   `export DB_HOST=localhost && export DB_PORT=3306 && export DB_USER=root && export DB_PASSWORD=mypass && export DB_NAME=mydb`
4. `yarn migrate`

5. `yarn dev`

6. For productions `yarn start`.

7. You can use the `api.http` file test endpoints form your IDE
