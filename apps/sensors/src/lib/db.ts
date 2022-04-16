import prisma from '@prisma/client';

let db: prisma.PrismaClient;
export const getDb = () => {
    if (!db) {
        const { PrismaClient } = prisma;
        db = new PrismaClient();
    }

    return db;
};
