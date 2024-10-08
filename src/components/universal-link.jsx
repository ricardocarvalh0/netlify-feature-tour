import { useState } from "preact/hooks";

export default function UniversalLink() {
  const [numero, setNumero] = useState();
  const [mensagem, setMensagem] = useState();
  const [url, setUrl] = useState();

  const create = () => {
    if (!numero) {
      setUrl('Numero nao pode ser vazio')
      return
    }
    const text = mensagem ? `?text=${mensagem}` : '';
    const url = new URL(`https://wa.me/${numero}${text}`);
    const noCountry = !numero.startsWith('55')
    const hasPlus = numero.startsWith('+')
    const invalidLength = numero.length !== 13

    if (noCountry) {
      setUrl('Tem que ter o 55 na frente')
    } else if (hasPlus) {
      setUrl('Nao pode ter o + na frente')
    } else if (invalidLength) {
      setUrl('Numero ta sem o 55 ou sem o DDD ou sem 9 na frente')
    } else {
      setUrl(url.toString())
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 22 }}>Numero</div>

        <input style={{ height: '2rem' }} type="text" id="numero" name="numero" value={numero} onChange={(e) => {
          setNumero(e.target.value)
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 22 }}>Mensagem</div>
        <input style={{ height: '2rem' }} type="text" id="mensagem" name="mensagem" onChange={(e) => {
          setMensagem(e.target.value)

        }} />
      </div>
      <button onClick={create} className="button">
        Criar url
      </button>
      <div style={{ fontSize: 22, marginBottom: '1rem', color: 'blue' }}>{url}</div>
    </div>
  )
}