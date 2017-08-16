# Kata Tres en Raya

El objetivo general de esta kata es implementar un juego de tres en raya para dos jugadores.

## Sobre esta solución

Esta es una solución con algunas particularidades, principalmente en la segunda parte. El modelo del juego es bastante estándar, y el jugador autónomo planteado es bastante sencillo. Pero la interfaz pretende emular de forma bastante aproximada la interfaz del WOPR en la película Juegos de Guerra.

Esto presenta, principalmente, dos aspectos. Por un lado, es obviamente una interfaz basada exclusivamente en una salida y entrada de texto. Se reciben comandos como cadenas de texto y se produce una representación textual del tablero en un string.

Por otro lado, esto sólo implementa la interfaz del juego, pero no otros intereses como la selección del número de jugadores (para el juego siempre hay dos jugadores, no sabe nada más) u otros comandos ficticios de la película que se implementarán por separado en otro proyecto y no tienen excesivo interés aquí.

#### Detalles técnicos generales

El modelado del juego se basa en la proyección del _Tres en Raya_ sobre el juego del _Quince_, presentado por Martin Gardner que leí hace años en uno de sus libros (Creo que era _Aha! Insight_).

Por otra parte, he querido mantener dos ideas generales: Usar la sintaxis clásica de JavaScript (ES5), y primar cierta inmutabilidad sobre los contenedores del modelo. Pero sobre todo, he querido que sea un código relativamente sencillo de entender.

No se utiliza ninguna librería adicional para ninguna de las partes del proyecto.

## Parte I: El juego

El modelo del juego se implementa en 3 entidades: `Cell`, `Board` y `Game`.

`Cell` es un mero contenedor inmutable que representa una casilla. `Board`, como comentaba antes, implementa el tablero de juego como una proyección del juego del _Quince_. Así, el tablero internamente se guarda en un array lineal y cada `Cell` va marcado con un _peso_ siguiendo uno de los clásicos _tableros mágicos 3x3_ para la comprobación de jugadas ganadoras.

`Game` contiene la lógica del juego y hay un par de funciones adicionales para crear combinaciones de elementos y para transformar el array lineal en una matriz.

## Parte II: La Interfaz de Usuario

La interfaz es puramente textual. Está pensada para recibir comandos de texto y producir similarmente una salida de texto que se puede volcar directamente sobre consola o sobre un elemento `<pre>` en una página HTML.


## Parte III: Jugador Autónomo [Opcional]

[En un próximo commit]
