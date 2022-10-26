# code4sabae-js

- utilities in JavaScript for Deno / browsers
- you can use on js.sabae.cc also

## demo

```javascript
import { CSV } from "https://js.sabae.cc/CSV.js";

const urlorfile = "https://codeforkosen.github.io/kosen-opendata/data/kosen_campus.csv";
const json = await CSV.fetchJSON(urlorfile);
console.log(json);
```

