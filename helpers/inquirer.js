const inquirer = require('inquirer')
const colors = require('colors')

const inquirerMenu = async () => {
  console.clear()

  console.log('======================='.blue)
  console.log(' Seleccione una opción'.cyan)
  console.log('======================='.blue)

  const preguntas = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Que deseas hacer?',
      choices: [
        {
          value: 1,
          name: `${'1.'.grey} Crear tarea`,
        },
        {
          value: 2,
          name: `${'2.'.grey} Listar tareas`,
        },
        {
          value: 3,
          name: `${'3.'.grey} Listar tareas completadas`,
        },
        {
          value: 4,
          name: `${'4.'.grey} Listar tareas pendientes`,
        },
        {
          value: 5,
          name: `${'5.'.grey} Completar tarea(s)`,
        },
        {
          value: 6,
          name: `${'6.'.grey} Borrar tareas`,
        },
        {
          value: 7,
          name: `${'7.'.grey} Salir`,
        },
      ],
    },
  ]

  const { opcion } = await inquirer.prompt(preguntas)
  return opcion
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.blue} para continuar`,
    },
  ]

  console.log('\n')
  await inquirer.prompt(question)
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      valide(value) {
        if (value.length === 0) {
          return 'Por favor ingrese una opción'
        }
        return true
      },
    },
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.blue
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    }
  })

  choices.unshift({
    values: '0',
    name: '0.'.green + 'cancelar',
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const mortarListadoCheckList = async (tarea = []) => {
  const choices = tarea.map((tarea, i) => {
    const idx = `${i + 1}.`.blue
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    }
  })
  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'selecciones',
      choices,
    },
  ]

  const { ids } = await inquirer.prompt(preguntas)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mortarListadoCheckList,
}
