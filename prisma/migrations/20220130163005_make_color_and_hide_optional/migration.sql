-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SensorInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "label" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "color" TEXT,
    "hide" BOOLEAN
);
INSERT INTO "new_SensorInfo" ("color", "datetime", "hide", "id", "label", "x", "y") SELECT "color", "datetime", "hide", "id", "label", "x", "y" FROM "SensorInfo";
DROP TABLE "SensorInfo";
ALTER TABLE "new_SensorInfo" RENAME TO "SensorInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
