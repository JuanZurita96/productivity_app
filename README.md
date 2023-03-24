Aplicacion de productividad -- Autor: JuanJo Zurita

Aplicacion de productividad
Lista de tareas donde puedes crear, modificar y completar las tareas en un tiempo asignado
Redux - MaterialUI - Victory - Vite - TypeScript


Estructura del projecto - 
El projeto se creo usando ViteJS con el template para TypeScript, se modifico la estructura de las carpetas por:

src:
  Components: Representan la UI de la aplicacion para mostrar datos
  Containers: Son archivos que manejan la logica de obtencion de Datos y se envia a los componentes
  Hooks: Se almacenan custom Hooks que ayudan a realizar logica un poco mas complicada sobre una funcionalidad especifica
  Interfaces: Representan la composicion de los datos que se van a utilizar en toda la App
  State: Se establece la logica del estado en Redux - Store y Reducers
  Utils: Es un archivo de funciones que actuan como helpers para retornar cierta informacion util
 
 
 
 Lo que hace la App:
  Crear una tarea
  Editar una tarea
  Cambiar el estado de una tarea (En curso, pausada, pendiente)
  Completar la tarea
  Ver un historial de tareas completadas, asi como una grafica de desempeño
 
 
 Proceso que faltaron:
  Filtrado de tareas por tiempo
  Mantener el estado de la aplicacion con la lista de tareas ---- Por ende no se mantiene el temporizador al cerrar la App
  

Espero puedan tomar en cuenta el codigo.
