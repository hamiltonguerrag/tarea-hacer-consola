const colors = require('colors')
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarLeerArchivo')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mortarListadoCheckList,
} = require('./helpers/inquirer')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  const tareasDB = leerDB()
  if (tareasDB) {
    tareas.cargarTareasFromArra(tareasDB)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const desc = await leerInput('Descripcion:')
        tareas.crearTarea(desc)
        break
      case 2:
        tareas.listadoCompleto()
        break
      case 3:
        tareas.ListarPendientesCompletadas(true)
        break
      case 4:
        tareas.ListarPendientesCompletadas(false)
        break
      case 5:
        const ids = await mortarListadoCheckList(tareas.getListadoArra)
        tareas.toggleCompletadas(ids)
        break
      case 6:
        const id = await listadoTareasBorrar(tareas.getListadoArra)
        if (id !== 0) {
          const resp = await confirmar('¿esta seguro?')
          if (resp) {
            tareas.borrarTarea(id)
            console.log('tarea borrada')
          }
          break
        }
    }

    guardarDB(tareas.getListadoArra)
    if (opt !== '7') await pausa()
  } while (opt !== '0')
}
main()
