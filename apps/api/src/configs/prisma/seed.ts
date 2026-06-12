import { env } from "@configs/env/env.js";
import { prisma } from "@index";
import argon2 from "argon2";

export const seedPrisma = async () => {
  const hash = await argon2.hash(env.ADMIN_PASSWORD);
  await prisma.giga_user.upsert({
    where: {
      email: env.ADMIN_EMAIL
    },
    update: {},
    create: {
      name: env.ADMIN_USERNAME,
      password: {
        create: {
          hash: hash
        }
      },
      email: env.ADMIN_EMAIL
    }
  });
};