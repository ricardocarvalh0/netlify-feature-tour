export default async (req, context) => {
  const msg = new URL(req.url).searchParams.get('msg');
  const numero = context.params.numero;
  const text = msg ? `?text=${msg}` : '';
  const url = new URL(`https://wa.me/${numero}${text}`);
  const noCountry = !numero.startsWith('55')
  const hasPlus = numero.startsWith('+')
  const invalidLength = numero.length !== 13

  if (noCountry) {
    return new Response('Tem que ter o 55 na frente')
  }
  if (hasPlus) {
    return new Response('Nao pode ter o + na frente')
  }
  if (invalidLength) {
    return new Response('Numero ta sem o 55 ou sem o DDD ou sem 9 na frente')
  }
  return new Response(url.toString())
}

export const config = {
  path: '/url/:numero',
}