CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "tokens"(
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE urls(
    "id" SERIAL PRIMARY KEY,
    "shortUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
