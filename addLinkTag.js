export const regexpURL = /(https?:\/\/((\[([a-f0-9:]+:+)+([a-f0-9]+)?\])|([-.a-zA-Z0-9]+))(:[0-9]+)?[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g;
export const addLinkTag = (text) => text.replaceAll(regexpURL, '<a href="$1">$1</a>');
