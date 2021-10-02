import jwt from 'jsonwebtoken';

export const { APP_SECRET } = process.env;

function getTokenPayload(token: string) {
  return jwt.verify(token, process.env.APP_SECRET!);
}

export function getUserId(req?: any, authToken?: any) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new Error('No token found');
      }
      const payload = getTokenPayload(token);
      if (typeof payload === 'string') {
        return payload;
      }
      return payload.userId;
    }
  } else if (authToken) {
    const payload = getTokenPayload(authToken);
    if (typeof payload === 'string') {
      return payload;
    }
    return payload.userId;
  }

  throw new Error('Not authenticated');
}

export default {
  APP_SECRET,
  getUserId,
};
