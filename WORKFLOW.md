Step 1:

add new model to

`./prisma/schema.prisma`

Step 2:

run

`./prisma/scripts/clobber.sh`

Step 3:

create service factory for new model

- ensure the three diamond bracket types align with the new model and not the model in the file you copy-pasted from

`./pages/api/_services/factory`

Step 4:

create route and handler that calls appropriate service method in `./pages/api/new-model/*`

Step 5:

test and create service commands and queries within relevant context folder such as `./src/contexts/LiveMap/services/**`;
