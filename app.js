import { supabase } from './supabaseClient.js'

// Recupera o usuário logado. Redireciona para login se não estiver autenticado.
async function getUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    if (!user) window.location.href = 'login.html'
    return user
  } catch (error) {
    console.error('Erro ao obter usuário:', error)
    window.location.href = 'login.html'
  }
}

// Elementos do DOM
const lista = document.getElementById('lista')
const input = document.getElementById('item')

// Carrega a lista de compras do Supabase
async function carregarLista() {
  try {
    const { data, error } = await supabase.from('lista_compras').select('*').order('created_at', { ascending: false })
    
    if (error) throw error

    // Limpa a lista e renderiza os itens
    lista.innerHTML = ''
    
    data.forEach((item) => {
      const li = document.createElement('li')
      li.innerHTML = `
        ${item.item} 
        <button 
          onclick="removerItem('${item.id}')" 
          style="border: none; background-color: transparent; cursor: pointer;"
          aria-label="Remover item"
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      `
      lista.appendChild(li)
    })
  } catch (error) {
    console.error('Erro ao carregar lista:', error)
    alert('Erro ao carregar lista de compras')
  }
}

// Adiciona novo item à lista de compras
window.adicionarItem = async function () {
  try {
    if (!input.value.trim()) {
      return alert('Por favor, digite um item')
    }

    const user = await getUser()
    if (!user) return

    const { error } = await supabase.from('lista_compras').insert({
      item: input.value.trim(),
      adicionada_por: user.id
    })

    if (error) throw error

    input.value = ''
    await carregarLista()
  } catch (error) {
    console.error('Erro ao adicionar item:', error)
    alert('Erro ao adicionar item: ' + error.message)
  }
}

// Remove item da lista pelo ID
window.removerItem = async function (id) {
  try {
    if (!confirm('Tem certeza que deseja remover este item?')) return
    
    const { error } = await supabase.from('lista_compras').delete().eq('id', id)
    if (error) throw error
    
    await carregarLista()
  } catch (error) {
    console.error('Erro ao remover item:', error)
    alert('Erro ao remover item: ' + error.message)
  }
}

// Realiza logout do usuário
window.logout = async function () {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    window.location.href = 'login.html'
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    alert('Erro ao fazer logout')
  }
}

// Inicializa: verifica se o usuário está logado e carrega a lista
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await getUser()
    await carregarLista()
    
    // Adiciona evento de tecla para adicionar com Enter
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        adicionarItem()
      }
    })
  } catch (error) {
    console.error('Erro na inicialização:', error)
  }
})