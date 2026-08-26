/*
  Warnings:

  - The primary key for the `Categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nombre` on the `Categoria` table. All the data in the column will be lost.
  - The primary key for the `_CategoriaToLibro` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."_CategoriaToLibro" DROP CONSTRAINT "_CategoriaToLibro_A_fkey";

-- DropIndex
DROP INDEX "public"."Categoria_nombre_key";

-- AlterTable
ALTER TABLE "public"."Categoria" DROP CONSTRAINT "Categoria_pkey",
DROP COLUMN "nombre",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Categoria_id_seq";

-- AlterTable
ALTER TABLE "public"."_CategoriaToLibro" DROP CONSTRAINT "_CategoriaToLibro_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_CategoriaToLibro_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "public"."_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
