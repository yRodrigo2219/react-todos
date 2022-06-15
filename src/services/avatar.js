export function avatarSrc(username, flip = false) {
  const collection = "human";

  return `https://avatars.dicebear.com/api/${collection}/${username}.svg?flip=${flip}`;
}
