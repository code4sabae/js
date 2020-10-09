import { fix0 } from "./fix0.js";
import { toHalf } from "./toHalf.js";

const parseMonth = function (s) {
  s = toHalf(s);
  s = s.replace(/⽉/g, "月"); // 令和2年7⽉2⽇ へんな漢字
  {
    const num = s.match(/平成(\d+)年(\d+)月/)
    if (num) {
      const y = parseInt(num[1])
      const m = parseInt(num[2])
      return (y + 1988) + '-' + fix0(m, 2) + '-';
    }
  }
  {
    const num = s.match(/令和元年(\d+)月/)
    if (num) {
      const y = 1;
      const m = parseInt(num[1])
      return (y + 2018) + '-' + fix0(m, 2) + '-';
    }
  }
  {
    const num = s.match(/令和(\d+)年(\d+)月/)
    if (num) {
      const y = parseInt(num[1])
      const m = parseInt(num[2])
      return (y + 2018) + '-' + fix0(m, 2) + '-';
    }
  }
  {
    const num = s.match(/(2\d+)年(\d+)月/)
    if (num) {
      const y = parseInt(num[1])
      const m = parseInt(num[2])
      return y + '-' + fix0(m, 2) + '-';
    }
  }
  {
    const num = s.match(/(20\d+)\/(\d+)/)
    if (num) {
      const y = parseInt(num[1])
      const m = parseInt(num[2])
      return y + '-' + fix0(m, 2) + '-';
    }
  }
  console.log(s, "can't parse date!!");
  return '--';
};

export { parseMonth };
