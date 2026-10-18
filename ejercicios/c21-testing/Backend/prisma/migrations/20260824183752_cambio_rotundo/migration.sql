/*
  Warnings:

  - You are about to drop the column `nacionalidad` on the `Autor` table. All the data in the column will be lost.
  - You are about to drop the column `autor` on the `Libro` table. All the data in the column will be lost.
  - You are about to drop the column `disponible` on the `Libro` table. All the data in the column will be lost.
  - You are about to drop the column `imagen` on the `Libro` table. All the data in the column will be lost.
  - Added the required column `fecha_nacimiento` to the `Autor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autor_id` to the `Libro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Libro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen_url` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Autor_nombre_key";

-- AlterTable
ALTER TABLE "public"."Autor" DROP COLUMN "nacionalidad",
ADD COLUMN     "fecha_nacimiento" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Autor_id_seq";

-- AlterTable
ALTER TABLE "public"."Libro" DROP COLUMN "autor",
DROP COLUMN "disponible",
DROP COLUMN "imagen",
ADD COLUMN     "autor_id" INTEGER NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "imagen_url" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "precio" SET DATA TYPE DOUBLE PRECISION;
DROP SEQUENCE "Libro_id_seq";

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "obras_asociadas" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CategoriaToLibro" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoriaToLibro_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "public"."Categoria"("nombre");

-- CreateIndex
CREATE INDEX "_CategoriaToLibro_B_index" ON "public"."_CategoriaToLibro"("B");

-- AddForeignKey
ALTER TABLE "public"."Libro" ADD CONSTRAINT "Libro_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "public"."Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
