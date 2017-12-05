import stringLength from 'string-length';

export default function(tweet) {
  return stringLength(tweet) <= 140;
}
