-- AlterTable
ALTER TABLE "device" ADD COLUMN     "guest_id" INTEGER;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
