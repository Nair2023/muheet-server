/*
  Warnings:

  - The `account_type` column on the `account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `tokenType` on the `token` table. All the data in the column will be lost.
  - You are about to drop the `categoryLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoryNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companyClient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companyUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cooperativeCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cooperativeNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deadlineFighter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meetingInvitee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `noteCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `noteLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `noteUpload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sharedCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sharedNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `systemConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `systemConfigUploads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tagCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trashNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trashUploads` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `token_type` to the `token` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `base_type` on the `upload` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('access', 'refresh', 'otp', 'temporary_access', 'biometric');

-- CreateEnum
CREATE TYPE "account_type" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "upload_base_type" AS ENUM ('image', 'video', 'audio', 'document');

-- CreateEnum
CREATE TYPE "account_company_type" AS ENUM ('creator', 'admin', 'supervisor', 'user');

-- CreateEnum
CREATE TYPE "admin_role" AS ENUM ('admin', 'super_admin');

-- DropForeignKey
ALTER TABLE "categoryLabel" DROP CONSTRAINT "categoryLabel_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categoryLabel" DROP CONSTRAINT "categoryLabel_label_id_fkey";

-- DropForeignKey
ALTER TABLE "categoryNote" DROP CONSTRAINT "categoryNote_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categoryNote" DROP CONSTRAINT "categoryNote_note_id_fkey";

-- DropForeignKey
ALTER TABLE "companyClient" DROP CONSTRAINT "companyClient_account_id_fkey";

-- DropForeignKey
ALTER TABLE "companyClient" DROP CONSTRAINT "companyClient_company_id_fkey";

-- DropForeignKey
ALTER TABLE "companyUser" DROP CONSTRAINT "companyUser_account_id_fkey";

-- DropForeignKey
ALTER TABLE "companyUser" DROP CONSTRAINT "companyUser_company_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperativeCollection" DROP CONSTRAINT "cooperativeCollection_account_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperativeCollection" DROP CONSTRAINT "cooperativeCollection_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperativeCollection" DROP CONSTRAINT "cooperativeCollection_company_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperativeNote" DROP CONSTRAINT "cooperativeNote_account_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperativeNote" DROP CONSTRAINT "cooperativeNote_company_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperativeNote" DROP CONSTRAINT "cooperativeNote_note_id_fkey";

-- DropForeignKey
ALTER TABLE "deadlineFighter" DROP CONSTRAINT "deadlineFighter_account_id_fkey";

-- DropForeignKey
ALTER TABLE "deadlineFighter" DROP CONSTRAINT "deadlineFighter_client_id_fkey";

-- DropForeignKey
ALTER TABLE "deadlineFighter" DROP CONSTRAINT "deadlineFighter_deadline_id_fkey";

-- DropForeignKey
ALTER TABLE "meetingInvitee" DROP CONSTRAINT "meetingInvitee_account_id_fkey";

-- DropForeignKey
ALTER TABLE "meetingInvitee" DROP CONSTRAINT "meetingInvitee_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "noteCollection" DROP CONSTRAINT "noteCollection_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "noteCollection" DROP CONSTRAINT "noteCollection_note_id_fkey";

-- DropForeignKey
ALTER TABLE "noteLabel" DROP CONSTRAINT "noteLabel_label_id_fkey";

-- DropForeignKey
ALTER TABLE "noteLabel" DROP CONSTRAINT "noteLabel_note_id_fkey";

-- DropForeignKey
ALTER TABLE "noteUpload" DROP CONSTRAINT "noteUpload_note_id_fkey";

-- DropForeignKey
ALTER TABLE "noteUpload" DROP CONSTRAINT "noteUpload_upload_id_fkey";

-- DropForeignKey
ALTER TABLE "sharedCollection" DROP CONSTRAINT "sharedCollection_account_id_fkey";

-- DropForeignKey
ALTER TABLE "sharedCollection" DROP CONSTRAINT "sharedCollection_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "sharedCollection" DROP CONSTRAINT "sharedCollection_company_id_fkey";

-- DropForeignKey
ALTER TABLE "sharedNote" DROP CONSTRAINT "sharedNote_account_id_fkey";

-- DropForeignKey
ALTER TABLE "sharedNote" DROP CONSTRAINT "sharedNote_company_id_fkey";

-- DropForeignKey
ALTER TABLE "sharedNote" DROP CONSTRAINT "sharedNote_note_id_fkey";

-- DropForeignKey
ALTER TABLE "systemConfig" DROP CONSTRAINT "systemConfig_country_id_fkey";

-- DropForeignKey
ALTER TABLE "systemConfigUploads" DROP CONSTRAINT "systemConfigUploads_config_id_fkey";

-- DropForeignKey
ALTER TABLE "systemConfigUploads" DROP CONSTRAINT "systemConfigUploads_upload_id_fkey";

-- DropForeignKey
ALTER TABLE "tagCollection" DROP CONSTRAINT "tagCollection_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "tagCollection" DROP CONSTRAINT "tagCollection_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "trashNote" DROP CONSTRAINT "trashNote_note_id_fkey";

-- DropForeignKey
ALTER TABLE "trashNote" DROP CONSTRAINT "trashNote_trash_id_fkey";

-- DropForeignKey
ALTER TABLE "trashUploads" DROP CONSTRAINT "trashUploads_trash_id_fkey";

-- DropForeignKey
ALTER TABLE "trashUploads" DROP CONSTRAINT "trashUploads_upload_id_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "account_type",
ADD COLUMN     "account_type" "account_type" NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "role",
ADD COLUMN     "role" "admin_role" NOT NULL;

-- AlterTable
ALTER TABLE "token" DROP COLUMN "tokenType",
ADD COLUMN     "token_type" "token_type" NOT NULL;

-- AlterTable
ALTER TABLE "upload" DROP COLUMN "base_type",
ADD COLUMN     "base_type" "upload_base_type" NOT NULL;

-- DropTable
DROP TABLE "categoryLabel";

-- DropTable
DROP TABLE "categoryNote";

-- DropTable
DROP TABLE "companyClient";

-- DropTable
DROP TABLE "companyUser";

-- DropTable
DROP TABLE "cooperativeCollection";

-- DropTable
DROP TABLE "cooperativeNote";

-- DropTable
DROP TABLE "deadlineFighter";

-- DropTable
DROP TABLE "meetingInvitee";

-- DropTable
DROP TABLE "noteCollection";

-- DropTable
DROP TABLE "noteLabel";

-- DropTable
DROP TABLE "noteUpload";

-- DropTable
DROP TABLE "sharedCollection";

-- DropTable
DROP TABLE "sharedNote";

-- DropTable
DROP TABLE "systemConfig";

-- DropTable
DROP TABLE "systemConfigUploads";

-- DropTable
DROP TABLE "tagCollection";

-- DropTable
DROP TABLE "trashNote";

-- DropTable
DROP TABLE "trashUploads";

-- DropEnum
DROP TYPE "accountCompanyType";

-- DropEnum
DROP TYPE "accountType";

-- DropEnum
DROP TYPE "adminRole";

-- DropEnum
DROP TYPE "tokenType";

-- DropEnum
DROP TYPE "uploadBaseType";

-- CreateTable
CREATE TABLE "company_user" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "account_type" "account_company_type" NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_client" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_invitee" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER,
    "company_id" INTEGER,
    "meeting_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "meeting_invitee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shared_note" (
    "id" SERIAL NOT NULL,
    "note_id" INTEGER NOT NULL,
    "account_id" INTEGER,
    "company_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "shared_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooperative_note" (
    "id" SERIAL NOT NULL,
    "note_id" INTEGER NOT NULL,
    "account_id" INTEGER,
    "company_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cooperative_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooperative_collection" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "account_id" INTEGER,
    "company_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cooperative_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shared_collection" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "account_id" INTEGER,
    "company_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "shared_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_collection" (
    "id" SERIAL NOT NULL,
    "note_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "note_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_collection" (
    "id" SERIAL NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tag_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_note" (
    "id" SERIAL NOT NULL,
    "note_id" INTEGER,
    "category_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "category_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_label" (
    "id" SERIAL NOT NULL,
    "label_id" INTEGER,
    "category_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "category_label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_upload" (
    "id" SERIAL NOT NULL,
    "note_id" INTEGER,
    "upload_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "note_upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_label" (
    "id" SERIAL NOT NULL,
    "note_id" INTEGER,
    "label_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "note_label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trash_upload" (
    "id" SERIAL NOT NULL,
    "trash_id" INTEGER,
    "upload_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "trash_upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trash_note" (
    "id" SERIAL NOT NULL,
    "trash_id" INTEGER,
    "note_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "trash_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" SERIAL NOT NULL,
    "country_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config_upload" (
    "id" SERIAL NOT NULL,
    "upload_id" INTEGER,
    "config_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "system_config_upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deadline_fighter" (
    "id" SERIAL NOT NULL,
    "deadline_id" INTEGER,
    "account_id" INTEGER,
    "client_id" INTEGER,
    "company_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "deadline_fighter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_user" ADD CONSTRAINT "company_user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_user" ADD CONSTRAINT "company_user_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_client" ADD CONSTRAINT "company_client_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_client" ADD CONSTRAINT "company_client_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_invitee" ADD CONSTRAINT "meeting_invitee_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_invitee" ADD CONSTRAINT "meeting_invitee_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_note" ADD CONSTRAINT "shared_note_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_note" ADD CONSTRAINT "shared_note_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_note" ADD CONSTRAINT "shared_note_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_note" ADD CONSTRAINT "cooperative_note_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_note" ADD CONSTRAINT "cooperative_note_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_note" ADD CONSTRAINT "cooperative_note_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_collection" ADD CONSTRAINT "cooperative_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_collection" ADD CONSTRAINT "cooperative_collection_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_collection" ADD CONSTRAINT "cooperative_collection_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_collection" ADD CONSTRAINT "shared_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_collection" ADD CONSTRAINT "shared_collection_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_collection" ADD CONSTRAINT "shared_collection_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_collection" ADD CONSTRAINT "note_collection_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_collection" ADD CONSTRAINT "note_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_collection" ADD CONSTRAINT "tag_collection_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_collection" ADD CONSTRAINT "tag_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_note" ADD CONSTRAINT "category_note_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_note" ADD CONSTRAINT "category_note_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_label" ADD CONSTRAINT "category_label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_label" ADD CONSTRAINT "category_label_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_upload" ADD CONSTRAINT "note_upload_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_upload" ADD CONSTRAINT "note_upload_upload_id_fkey" FOREIGN KEY ("upload_id") REFERENCES "upload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_label" ADD CONSTRAINT "note_label_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_label" ADD CONSTRAINT "note_label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trash_upload" ADD CONSTRAINT "trash_upload_trash_id_fkey" FOREIGN KEY ("trash_id") REFERENCES "trash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trash_upload" ADD CONSTRAINT "trash_upload_upload_id_fkey" FOREIGN KEY ("upload_id") REFERENCES "upload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trash_note" ADD CONSTRAINT "trash_note_trash_id_fkey" FOREIGN KEY ("trash_id") REFERENCES "trash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trash_note" ADD CONSTRAINT "trash_note_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_config" ADD CONSTRAINT "system_config_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_config_upload" ADD CONSTRAINT "system_config_upload_upload_id_fkey" FOREIGN KEY ("upload_id") REFERENCES "upload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_config_upload" ADD CONSTRAINT "system_config_upload_config_id_fkey" FOREIGN KEY ("config_id") REFERENCES "system_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deadline_fighter" ADD CONSTRAINT "deadline_fighter_deadline_id_fkey" FOREIGN KEY ("deadline_id") REFERENCES "deadline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deadline_fighter" ADD CONSTRAINT "deadline_fighter_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deadline_fighter" ADD CONSTRAINT "deadline_fighter_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
