-- CreateTable
CREATE TABLE "Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "Place_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formatted" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MapboxPublicConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publickey" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_addressId_key" ON "Place"("addressId");
