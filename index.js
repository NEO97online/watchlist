function $(selector) {
  return document.querySelector(selector)
}

const db = firebase.firestore()

$("#submit").addEventListener('click', () => {
  const input = $("#input").value
  db.collection('entries').add({ 
    title: input,
    created_at: new Date()
  })
  $("#input").value = ""
})

db.collection('entries').orderBy("created_at", "asc").onSnapshot(querySnapshot => {
  const list = $("#list")
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
  querySnapshot.forEach(doc => {
    const title = doc.data().title
    const el = document.createElement("div")
    el.classList.add("entry")
    el.innerHTML = "• " + formatMovieTitle(title)
    list.appendChild(el)
  })
})

function capitalizeFirst(str) {
  return str.toLowerCase().replace(/^\w/, c => c.toUpperCase())
}

function formatMovieTitle(title) {
  const words = title.split(' ')
  return words.map((word, i) => {
    const lower = word.toLowerCase()
    if (i > 0 && ['and', 'the', 'of', 'an', 'a', 'is', 'for', 'but', 'on', 'at', 'to', 'from', 'by'].includes(lower)) {
      return lower
    } else {
      return capitalizeFirst(lower)
    }
  }).join(' ')
}