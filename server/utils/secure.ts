import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export async function encryptText(params: string): Promise<string> {
  const encrypted = await bcrypt.hash(params, 10);
  return encrypted;
}
export async function compareText(text: string, hash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(text, hash);
  return isMatch;
}

export async function createSessionToken(data: object) {
  try {
    let token = await jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '30m'
    });
    return token;

  } catch (error) {
    throw new Error(error)
  }
}

export async function createRefreshToken(data: object) {
  try {
    let token = await jwt.sign(data, process.env.REF_TOKEN_KEY);
    return token;

  } catch (error) {
    throw new Error(error)
  }
}
