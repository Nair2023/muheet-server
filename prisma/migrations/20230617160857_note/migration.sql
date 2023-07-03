/*
  Warnings:

  - You are about to drop the column `collectionId` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_collectionId_fkey";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "collectionId",
ADD COLUMN     "collection_id" INTEGER,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tag" DROP COLUMN "collectionId",
ADD COLUMN     "collection_id" INTEGER;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
