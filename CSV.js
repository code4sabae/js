const CSV = {};

CSV.decodeCSV = function (s) {
  const res = []
  let st = 0
  let line = []
  let sb = null
  if (!s.endsWith('\n')) { s += '\n' }
  const len = s.length
  for (let i = 0; i < len; i++) {
    const c = s.charAt(i)
    if (c === '\r') { continue }
    if (st === 0) {
      if (c === '\n') {
        if (line.length > 0) { line.push('') }
        res.push(line)
        line = []
      } else if (c == ',') {
        line.push('')
      } else if (c == '"') {
        sb = ''
        st = 2
      } else {
        sb = c
        st = 1
      }
    } else if (st === 1) {
      if (c === '\n') {
        line.push(sb)
        res.push(line)
        line = []
        st = 0
        sb = null
      } else if (c === ',') {
        line.push(sb)
        sb = null
        st = 0
      } else {
        sb += c
      }
    } else if (st === 2) {
      if (c === '"') {
        st = 3
      } else {
        sb += c
      }
    } else if (st === 3) {
      if (c === '"') {
        sb += c
        st = 2
      } else if (c === ',') {
        line.push(sb)
        sb = null
        st = 0
      } else if (c === '\n') {
        line.push(sb)
        res.push(line)
        line = []
        st = 0
        sb = null
      }
    }
  }
  if (sb != null) { line.push(sb) }
  if (line.length > 0) { res.push(line) }
  return res
}
CSV.encodeCSV = function(csvar) {
  let s = []
  for (let i = 0; i < csvar.length; i++) {
    let s2 = []
    const line = csvar[i]
    for (let j = 0; j < line.length; j++) {
      const v = line[j]
      if (v == undefined || v.length == 0) {
        s2.push("")
      } else if (typeof v == 'number') {
        s2.push(v)
      } else if (v.indexOf('"') >= 0) {
        s2.push('"' + v.replace(/\"/g, '""') + '"')
      } else if (v.indexOf(',') >= 0 || v.indexOf('\n') >= 0) {
        s2.push('"' + v + '"')
      } else {
        s2.push(v)
      }
    }
    s.push(s2.join(','))
  }
  return s.join('\n')
}
CSV.csv2json = function (csv, removeblacket) {
  const res = []
  const head = csv[0]
  if (removeblacket) {
    for (let i = 0; i < head.length; i++) {
      const h = head[i]
      const n = h.indexOf('(')
      const m = h.indexOf('（')
      let l = -1
      if (n === -1) {
        l = m
      } else if (m === -1) {
        l = n
      } else {
        l = Math.min(n, m)
      }
      head[i] = (l > 0 ? h.substring(0, l) : h).trim()
    }
  }
  for (let i = 1; i < csv.length; i++) {
    const d = {}
    for (let j = 0; j < head.length; j++) {
      d[head[j]] = csv[i][j]
    }
    res.push(d)
  }
  return res
}
CSV.json2csv = function(json) {
  if (!Array.isArray(json)) {
    throw 'is not array! at json2csv'
  }
  const head = []
  for (const d of json) {
    for (const name in d) {
      if (head.indexOf(name) == -1) {
        head.push(name)
      }
    }
  }
  const res = [ head ]
  for (const d of json) {
    const line = []
    for (let i = 0; i < head.length; i++) {
      const v = d[head[i]]
      if (v == undefined) {
        line.push('')
      } else {
        line.push(v)
      }
    }
    res.push(line)
  }
  return res
}
CSV.addBOM = function (s) {
  return '\ufeff' + s
}
CSV.removeBOM = function (s) {
  if (s.charAt(0) === '\ufeff') { return s.substring(1) }
  return s
}
export { CSV };
