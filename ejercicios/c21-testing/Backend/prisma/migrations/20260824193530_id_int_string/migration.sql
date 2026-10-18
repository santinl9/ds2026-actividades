/*
  Warnings:

  - The primary key for the `Autor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Libro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CategoriaToLibro` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Libro" DROP CONSTRAINT "Libro_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CategoriaToLibro" DROP CONSTRAINT "_CategoriaToLibro_B_fkey";

-- AlterTable
ALTER TABLE "public"."Autor" DROP CONSTRAINT "Autor_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Autor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Libro" DROP CONSTRAINT "Libro_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "autor_id" DROP NOT NULL,
ALTER COLUMN "autor_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Libro_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."_CategoriaToLibro" DROP CONSTRAINT "_CategoriaToLibro_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_CategoriaToLibro_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "public"."Libro" ADD CONSTRAINT "Libro_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "public"."Autor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
