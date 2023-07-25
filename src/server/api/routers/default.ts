import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });
const defaultSchema = z.object({
  title: z.string(),
  content: z.string(),
});
const defaultUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export const exampleRouter = createTRPCRouter({
  // HELLO WORLD
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // SCAN
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.default.findMany();
  }),

  // GET-ITEM
  getItem: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.prisma.default.findUnique({
      where: idSchema.parse(input),
    });
  }),

  //PUT-ITEM
  putItem: publicProcedure.input(defaultSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.default.create({
      data: defaultSchema.parse(input),
    });
  }),

  //UPDATE-ITEM
  updItem: publicProcedure
    .input(defaultUpdateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.default.update({
        where: {
          id: input.id.toString(),
        },
        data: defaultUpdateSchema.parse(input),
      });
    }),

  //DELETE-ITEM
  delItem: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.user.delete({
      where: idSchema.parse(input),
    });
  }),

  // TEMPLATE SECURED AUTH
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
