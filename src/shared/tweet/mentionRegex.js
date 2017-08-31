export const mentionRegex = /@[a-zA-z0-9]{3,15}/;

export const mentionRegexGlobal = new RegExp(mentionRegex.source, 'g');
