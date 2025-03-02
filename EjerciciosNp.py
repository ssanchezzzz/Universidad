"""
Resolver los siguientes ejercicios:

1. En la universidad se efectuó la elección del representante de los estudiantes ante el Consejo Superior. Se presentaron 30 candidatos y cada uno se identificó con un número del 1 al 30. Asumiendo que los 5000 estudiantes de la universidad votaron, elabore un programa donde imprima un listado de mayor a menor, según el número de votos obtenidos por cada candidato

2. Suponga que en la UIS hay 6500 estudiantes. Por cada uno de ellos tenemos un registro con el código, nombre y promedio acumulado. Hacer el programa que:

Imprima el código y el nombre de los estudiantes de la carrera X (debe leerse el código de la carrera a listar) que tengan promedio acumulado igual o mayor a 4 y decir cuántos fueron.
Imprima el código y el nombre de los estudiantes que ingresaron antes de 1990 y están condicionales.
"""

"Ejercicio #1"

import numpy as np

cantidadCandidatos = 30 # Guardamos la cantidad de postulados.
cantidadVotosTotales = 5000  # Guardamos el total de votos para tener en cuenta el total.

listadoPostulados = [] # Creamos una lista en la cual almacenaremos los resultados de cada uno de los postulados.

votosDistribuidos = np.random.multinomial(cantidadVotosTotales, np.ones(cantidadCandidatos)/cantidadCandidatos) # La función multinomial nos permite un mejor control sobre los datos y una probabalidad de resultado segun le indiquemos, con esto aseguramos que la suma total se mantenga, en este caso 5000, a diferencia de por ejemplo randint, que puede generar inconsistencias al exceder o reducir la cantidad de datos esperada.

# np.ones(parametro) esta funcion crea un vector rellenado de 1 con un tamaño segun la cantidad que le hayamos indicado por parametro esto lo dividimos por la cantidad de participantes para dar una misma probabilidad a todos cantidatos. 

"np.random.multinomial(Número total de votos que se deben repartir, probabilidad para cada candidato)"

for i in range(cantidadCandidatos):  # Cantidad de postulados.
    representante = [f"Postulado #{i+1}", votosDistribuidos[i]]  # Asignamos ID y cantidad de votos.
    listadoPostulados.append(representante) # Agregamos al vector contenedor.

listaOrdenada = sorted(listadoPostulados, key =lambda x: x[1], reverse = True) # La funcion sorted nos sirve para ordenar datos, pero en este caso los datos que contiene son vectores, no puede ordenar vectores asi como asi, entonces le sumistramos demas parametros para que sepa como debe comportarse

"""
iterable (Requerido) -> La secuencia para ordenar, lista, diccionario, tupla etc.
key	(Opcional) -> Una funcion que decide el orden. Por defecto es None
    lambda -> Palabra clave para definir la función anónima.
    argumentos -> Los valores que recibe la función.
    expresión -> El resultado que devuelve (sin return).
reverse	(Opcional) -> Un Boolean. False ordenara de forma ascendente, True ordenara de forma descendente. Por defecto es False
"""

for i in range (cantidadCandidatos): # Mostramos los resultados :D.
    print(listaOrdenada[i])

"Ejercicio #2"

uisCarreras = { # Creo un diccionario con algunas de las carreras presentes en la uis estas asociadas con un codigo. 
    11: "Ingeniería de Sistemas", 12: "Física", 13: "Química", 14: "Biología", 15: "Ingeniería Mecánica", 16: "Ingeniería Metalúrgica", 17: "Ingeniería Civil", 18: "Matemáticas", 19: "Ingeniería Eléctrica", 20: "Ingeniería Electrónica", 21: "Ingeniería Química", 22: "Filosofía", 23: "Trabajo Social", 24: "Medicina", 25: "Enfermería"
}

nombresEstudiantes = [ # Creo un diccionario para dar nombres aleatorios a los estudiantes. 
    "Fabian", "Victoria", "Juan", "Isabela", "Juan", "Valentina", "Andrés", "Camila", "Sebastián", "Mariana", "Felipe", "Laura", "Carlos", "Gabriela", "Tomás"
]

apellidosEstudiantes = [ # Creo un diccionario para dar apellidos aleatorios a los estudiantes.
    "Gómez", "Rodríguez", "Martínez", "Fernández", "López", "García", "Pérez", "Torres", "Ramírez", "Sánchez", "Castro", "Ríos", "Mendoza", "Morales", "Ortega"
]

cantidadEstudiantes = 10 # Indicamos la cantidad de estudiantes. 
listEstudiantes = [] # Se crea una lista vacia donde se almacenaran los estudiantes.
def codigoEstudiante ():
    codigoCarrera = np.random.randint(11, 25) # Indicamos de forma random a que carrera pertenece el estudiante. 
    añoIngreso = np.random.randint(0,99) # De igual forma con el año en que este ingreso
    if (añoIngreso < 10):  
        añoIngreso = f"0{añoIngreso}" # Si el año cuenta con un solo digito ejemplo 2 le agregue un 0 al inicio     
    numeroAleatorio = np.random.randint (10000, 99999) # Parte extra del codigo de estudiante
    codigo = f"{codigoCarrera}{añoIngreso}{numeroAleatorio}" #Juntamos todo 
    return codigo

def nombreEstudiante (): 
    nombre = np.random.choice(nombresEstudiantes) # Elegimos una opcion del diccionario que creamos anteriormente 
    apellido = np.random.choice(apellidosEstudiantes) # Elegimos una opcion del diccionario que creamos anteriormente 
    nombreCompleto = nombre + " " + apellido # Lo juntamos 
    return nombreCompleto

for i in range (cantidadEstudiantes):
    estudiante = {
        "Codigo": codigoEstudiante(), "Nombre": nombreEstudiante(), "Promedio": round(np.random.uniform(0,5),2) 
    } # Creamos el estudiante con sus respectivos datos
    listEstudiantes.append(estudiante) # Lo añadimos

estudiantesPromedio4 = [] 
estudiantesCondicionales = []

for estudiante in listEstudiantes:
    print (estudiante)
    if estudiante["Promedio"] >= 4: # Condicional para ver quienes tienen un promedio mayor o igual a 4
        estudiantesPromedio4.append(estudiante)
    añoIngreso = int(estudiante["Codigo"][2:4])
    if añoIngreso < 90 and añoIngreso > 25: # Condicional para ver quienes ingresaron antes del 1990
        if (estudiante["Promedio"] <= 3.0):
            estudiantesCondicionales.append(estudiante)

print (f"\nLa cantidad de estudiantes con un promedio igual o superior a 4 fueron: {len(estudiantesPromedio4)} y son los siguientes: \n" )
for estudiante in estudiantesPromedio4:
    print (estudiante)

print (f"\nLa cantidad de estudiantes condicionales y de un ingreso anterior a 1990 fueron: {len(estudiantesPromedio4)} y son los siguientes: \n" )
for estudiante in estudiantesCondicionales:
    print (estudiante)