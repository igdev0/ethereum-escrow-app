/*
  Warnings:

  - You are about to drop the column `isMinted` on the `Contracts` table. All the data in the column will be lost.
  - Added the required column `value` to the `Contracts` table without a default value. This is not possible if the table is not empty.

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
    "value" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Contracts" ("address", "arbiter", "beneficiary", "created_at", "depositor", "id", "isApproved", "updated_at") SELECT "address", "arbiter", "beneficiary", "created_at", "depositor", "id", "isApproved", "updated_at" FROM "Contracts";
DROP TABLE "Contracts";
ALTER TABLE "new_Contracts" RENAME TO "Contracts";
CREATE UNIQUE INDEX "Contracts_address_key" ON "Contracts"("address");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
