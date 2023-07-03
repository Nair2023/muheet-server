-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_account_id_fkey";

-- AlterTable
ALTER TABLE "token" ADD COLUMN     "guest_id" INTEGER,
ALTER COLUMN "account_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
