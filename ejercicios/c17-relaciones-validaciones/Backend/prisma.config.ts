import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations"
  },
  /*datasource: {
    url: process.env.DATABASE_URL,   // Compose la inyecta desde .env
  },*/ 
});