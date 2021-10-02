import { AuthChecker } from 'type-graphql';
import { Context } from '../context/context';

export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  if (roles.includes('USER')) {
    if (context.userId) {
      const user = await context.prisma.user.findUnique({
        where: {
          id:
        context.userId as string,
        },
      });
      return !!(user);
    }
  }

  return false;
};

export default { authChecker };
