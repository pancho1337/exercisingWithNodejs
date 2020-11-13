// //tradicional callbacks
// const preparaComida = callback => {
//     setTimeout(() => {
//         callback("Ten tu cemita")
//     }, 2000)
// }


// setTimeout(() => {
//     console.log("prende la estufa")
//     preparaComida(plato => {
//         console.log(plato)
//     })
// }, 2000)

// console.log("Termine de ordenar comida")

//Promisses
const preparaComida = () => {
    //1. crea una instancia del objecto constructor de una promesa asignando una funcion con parametros de resolver o rechazar
    const tuOrdenDeCemita = new Promise((siSePudo, nelCarnalito) => {
        setTimeout(() => {
            //3. quita la callback y regrasa con el siSePudo
            siSePudo("Ten tu cemita!!")
        }, 2000)
    })
    //2. regresa la promesa
    return tuOrdenDeCemita
}


setTimeout(() => {
    console.log("prende la estufa")
    // ponte la cb dentro del .then() o el mejor dicho "despues.." pa que no te panden al callback hell
    preparaComida()
        .then(plato => {
            console.log(plato)
            return preparaComida()
        })
        .then(plato => {
            console.log(plato)
            return preparaComida()
        })
        .then(plato => {
            console.log(plato)
        })
    // mira que chulada
}, 2000)

console.log("Termine de ordenar comida")