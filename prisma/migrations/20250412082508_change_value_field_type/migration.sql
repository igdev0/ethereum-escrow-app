/*
  Warnings:

  - You are about to alter the column `value` on the `Contracts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "arbiter" TEXT NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "depositor" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Contracts" ("address", "arbiter", "beneficiary", "created_at", "depositor", "id", "isApproved", "updated_at", "value") SELECT "address", "arbiter", "beneficiary", "created_at", "depositor", "id", "isApproved", "updated_at", "value" FROM "Contracts";
DROP TABLE "Contracts";
ALTER TABLE "new_Contracts" RENAME TO "Contracts";
CREATE UNIQUE INDEX "Contracts_address_key" ON "Contracts"("address");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
