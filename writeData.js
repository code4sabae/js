import { CSV } from "https://js.sabae.cc/CSV.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

export const writeData = async (fnbase, data) => {
  await Deno.writeTextFile(fnbase + ".csv", CSV.stringify(data));
  await Deno.writeTextFile(fnbase + ".json", JSON.stringify(data, null, 2));
  await Deno.writeTextFile(fnbase + ".cbor", CBOR.encode(data));
};
