/*
  Warnings:

  - Made the column `country_id` on table `city` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_country_id_fkey";

-- AlterTable
ALTER TABLE "city" ALTER COLUMN "country_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
