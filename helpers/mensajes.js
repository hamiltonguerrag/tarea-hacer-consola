const colors = require('colors')

const mostrarMenu = () => {
  return new Promise((resolve) => {

    console.log(`${'1.'.blue} Crea una tarea`)
    console.log(`${'2.'.blue} Listar tareas`)
    console.log(`${'3.'.blue} Listar tareas completadas`)
    console.log(`${'4.'.blue} Listar tareas pendientes`)
    console.log(`${'5.'.blue} Completar tarea(s)`)
    console.log(`${'6.'.blue} Borrar tareas`)
    console.log(`${'0.'.blue} Salir`)

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question(`Seleccione una opción:`, (opt) => {
      readline.close()
      resolve(opt)
    })
  })
}

const pausa = () => {
    return new Promise = ((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
          })
        
          readline.question(`Presione ENTER para continuar`, (opt) => {
            readline.close()
            resolve()
          })
    })
}

module.exports = {
  mostrarMenu,
  pausa,
}
