import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


export const authRouter = createTRPCRouter({
  getOrganizationsList: protectedProcedure.query(async ({ ctx }) => {
    const { organizations } = ctx.session.user;
    return organizations;
  }),
});