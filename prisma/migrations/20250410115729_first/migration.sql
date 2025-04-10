-- CreateTable
CREATE TABLE "Contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "arbiter" TEXT NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "depositor" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contracts_address_key" ON "Contracts"("address");
