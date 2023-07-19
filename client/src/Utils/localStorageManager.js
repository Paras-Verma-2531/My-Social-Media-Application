const KEY_ACCESS_TOKE="access_token";
export function getItem(key)
{
    return localStorage.getItem(key);
}
export function setItem(key,value)
{
    localStorage.setItem(key,value);
}
export function removeItem(key)
{
    //delete the access token when user logouts
  localStorage.removeItem(key);
}