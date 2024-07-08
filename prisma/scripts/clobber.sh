rm -rf prisma/migrations
npx prisma migrate reset -f
npx prisma migrate dev --name init # we just reset migrations, so this is the new first migration

npx prisma generate
