-- CreateTable
CREATE TABLE "giga_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "giga_password" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "giga_password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "giga_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quattId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "giga_year" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "giga_placement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "rank" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "giga_placement_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "giga_team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "giga_placement_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "giga_year" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "giga_sponsor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "past" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_user_uuid_key" ON "giga_user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "giga_user_name_key" ON "giga_user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "giga_user_email_key" ON "giga_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "giga_password_uuid_key" ON "giga_password"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "giga_password_userId_key" ON "giga_password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "giga_team_uuid_key" ON "giga_team"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "giga_team_quattId_key" ON "giga_team"("quattId");

-- CreateIndex
CREATE UNIQUE INDEX "giga_year_uuid_key" ON "giga_year"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "giga_year_name_key" ON "giga_year"("name");

-- CreateIndex
CREATE UNIQUE INDEX "giga_placement_uuid_key" ON "giga_placement"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "giga_sponsor_uuid_key" ON "giga_sponsor"("uuid");
