/*
  Warnings:

  - A unique constraint covering the columns `[guest_id]` on the table `guest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "guest_guest_id_key" ON "guest"("guest_id");
