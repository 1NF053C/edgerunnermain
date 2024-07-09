Step 1:

add new model to

`./prisma/schema.prisma`

Step 2:

run

`npm run db:migrate`

Step 3:

create database service factory for new model

- ensure the three diamond bracket types align with the new model and not the model in the file you copy-pasted from

Step 4:

create any seed files needed for dev and testing

Step 5:

create route and handler that calls appropriate db client service method in `./pages/api/new-model/*`

Step 6:

create api client service factory

- ensure three diamond bracket types align with new model and not the model in the file you copy-pasted from

Step 7:

create UI component container for your use case and relevant data hooks such as `useMapboxPublicConfig()`

Step 8:

create base UI component that depends on that container component's data

Step 9 and on:

create any relevant view hooks such as `useNavigationControls()` to extend your base view with more view features
