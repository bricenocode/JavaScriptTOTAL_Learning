class DevJobsAvatar extends HTMLElement {
  constructor() {
    super(); // llamar al constructor de HTMLElement

    //Abrimos el shadowDOM para mi componente.
    this.attachShadow({ mode: 'open' })
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`
  }

  render() {
    const service = this.getAttribute('service') ?? 'github'
    const username = this.getAttribute('username') ?? 'midudev'
    const size = this.getAttribute('size') ?? '40'

    const url = this.createUrl(service, username)

    // Técnica shadowDom, esto se usa para crear un "DOM Paralelo".
    // Nos permite que los estilos de afuera no afecten a mi componente.
    this.shadowRoot.innerHTML = `
    <style>
      img {
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
      }
    </style>

      <img 
        src="${url}" 
        alt="Avatar de ${username}" 
        class="avatar"
      />
    `
  }

  // Es un método del ciclo de vida de los web components en JavaScript.
  // Cuando el componente se añada al DOM, entonces llamaremos a render()
  connectedCallback() {
    this.render()
  }
}

customElements.define('devjobs-avatar', DevJobsAvatar)