    --DATABASE "sample_database_name"
    CREATE TABLE "test_table" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL
    );
    
    INSERT INTO "test_table" ("content") VALUES ('test');