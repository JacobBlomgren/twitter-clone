export const hashtagRegex = /#[^\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>¿?@[\]^_`{|}~\s]+/;

export const hashtagRegexGlobal = new RegExp(hashtagRegex.source, 'g');
