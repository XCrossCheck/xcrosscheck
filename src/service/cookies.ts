// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name:string) {
  // const nRep = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
  const nRep = name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1');
  const matches = 
    (new RegExp( `(?:^|; )${ nRep }=([^;]*)`)).exec(document.cookie);
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie( name:string, value:string) {
  document.cookie = `${name}=${value}; max-age=3600; secure`;   
}

export function delCookie(name:string) {
  document.cookie = `${name}=""; max-age=-1; secure`;  
}
