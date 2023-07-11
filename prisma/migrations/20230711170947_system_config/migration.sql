/*
  Warnings:

  - You are about to drop the `systmeConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "systemConfigUploads" DROP CONSTRAINT "systemConfigUploads_config_id_fkey";

-- DropForeignKey
ALTER TABLE "systmeConfig" DROP CONSTRAINT "systmeConfig_country_id_fkey";

-- DropTable
DROP TABLE "systmeConfig";

-- CreateTable
CREATE TABLE "systemConfig" (
    "id" SERIAL NOT NULL,
    "country_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "systemConfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "systemConfig" ADD CONSTRAINT "systemConfig_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systemConfigUploads" ADD CONSTRAINT "systemConfigUploads_config_id_fkey" FOREIGN KEY ("config_id") REFERENCES "systemConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;
