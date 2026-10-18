import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// lee tu .env (expande ${POSTGRES_USER} como Compose)
const env = loadEnv("test", process.cwd(), "");
const rawDbUrl = env.DATABASE_URL ?? "";
// Si corre en el host (fuera de Docker), reemplaza @db: por @localhost:
const dbUrl = process.env.DATABASE_URL ? rawDbUrl : rawDbUrl.replace("@db:", "@localhost:");

export default defineConfig({
    test: {
        env: {
            JWT_SECRET: "secreto-solo-para-tests", // nunca el real
            DATABASE_URL: dbUrl,
        },
    },
});
