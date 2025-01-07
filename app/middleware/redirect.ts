import type { Context } from '@nuxt/types';

const redirectMiddleware = ({ route, redirect }: Context) => {
  const validPaths = ['/','launches','/next-launch', '/favorites']; 
  const pathExists = validPaths.includes(route.path);

  if (!pathExists) {
    return redirect('/launches');
  }
};

export default redirectMiddleware;
