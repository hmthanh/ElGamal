function gcd(a, b) {
  if (a < b) return gcd(b, a)
  else if (a % b === 0) return b
  else return gcd(b, a % b)
}

function gen_key(q) {
  let key = Math.floor(Math.random() * (Math.pow(10, 20) - q) + q)
  while (gcd(q, key) !== 1) {
    key = Math.floor(Math.random() * (Math.pow(10, 20) - q) + q)
  }
  return key
}

function power(a, b, c) {
  let x = 1
  let y = a

  while (b > 0) {
    if (b % 2 !== 0) {
      x = (x * y) % c
    }
    y = (y * y) % c
    b = Math.floor(b / 2)
  }

  return x % c
}

function encrypt(msg, q, h, g) {
  const en_msg = []
  const k = gen_key(q) // Private key for sender
  const s = power(h, k, q)
  const p = power(g, k, q)

  for (let i = 0; i < msg.length; i++) {
    en_msg.push(msg.charCodeAt(i))
  }

  console.log("g^k used : ", p)
  console.log("g^ak used : ", s)

  for (let i = 0; i < en_msg.length; i++) {
    en_msg[i] = s * en_msg[i]
  }

  return { en_msg, p }
}

function decrypt(en_msg, p, key, q) {
  const dr_msg = []
  const h = power(p, key, q)

  for (let i = 0; i < en_msg.length; i++) {
    dr_msg.push(String.fromCharCode(Math.floor(en_msg[i] / h)))
  }

  return dr_msg.join("")
}

function main() {
  const msg = "encryption"
  console.log("Original Message :", msg)

  const q = Math.floor(Math.random() * (Math.pow(10, 50) - Math.pow(10, 20)) + Math.pow(10, 20))
  const g = Math.floor(Math.random() * (q - 2) + 2)

  const key = gen_key(q) // Private key for receiver
  const h = power(g, key, q)

  console.log("g used : ", g)
  console.log("g^a used : ", h)

  const { en_msg, p } = encrypt(msg, q, h, g)
  const dr_msg = decrypt(en_msg, p, key, q)
  console.log("Decrypted Message :", dr_msg)
}

main()
