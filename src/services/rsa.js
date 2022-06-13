import { JSEncrypt } from "jsencrypt";

export function encrypt(publicKey, msg) {
  const key = new JSEncrypt();
  key.setPublicKey(publicKey);

  return key.encrypt(msg);
}
