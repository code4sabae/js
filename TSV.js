// https://www.iana.org/assignments/media-types/text/tab-separated-values

const TSV = {};

TSV.decode = (s) => s.trim().split("\n").map(line => line.split("\t"));
TSV.encode = (ar) => ar.map(a => a.join("\t")).join("\n");

export { TSV };
