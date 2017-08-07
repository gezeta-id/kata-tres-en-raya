# Kata Tres en Raya

El objetivo general de esta kata es implementar un juego de tres en raya para dos jugadores.

Es un ejercicio de disñeo y arquitectura en general. Debemos prestar especial atención a cómo organizar el código y a las diferentes estructuras del mismo.

La kata se compone de dos partes. En la primera parte se implementará el "modelo" del juego en sí. En la segunda parte, el objetivo será crear una interfaz de usuario que utilice el modelo anterior.

Opcionalmente, se puede realizar una tercera parte en la que se implemente un _jugador autónomo_ que sea capaz de participar en un juego contra otro jugador.

## Branching model

**Atención**:

Antes de empezar a desarrollar tu solución, crea una rama dentro de `user-solutions/` con tu nombre de usuario o algún nombre identificativo. Por ejemplo, `user-solutions/cgomez` o `user-solutions/team-rocket`. Esto ayudará a mantener las soluciones propuestas ordenadas.

## Parte I: El juego

En esta primera parte del ejercicio el objetivo final es implementar _la mecánica del juego_ de tres en raya para dos jugadores. Es importante señalar que no debemos implementar nada más que el juego en sí. Por tanto, no debemos implementar ninguna interfaz, ni ningún tipo de jugador autónomo, ni nada más. Esto irá en las siguientes partes.

De hecho, a lo largo de todo el ejercicio se valorará como aspecto general, la habilidad para desarrollar cada una de las partes sin tener que volver sobre nuestros pasos a modificar las otras partes (o lo mínimo que esto sea posible).

### Valoración

Esta parte es _principalmente_ un ejercicio de diseño de aplicaciones. Como tal, se valorarán aspectos como limpieza, sencillez, flexibilidad, claridad y una buena estructuración de la aplicación. Además, se valorará la calidad de los tests.

### Recomendaciones para el API

El diseño del API queda más o menos abierto y cada uno puede implementarlo como mejor vea. Pero _se recomienda_ tratar de llegar a un interfaz _similar_ en sencillez a lo siguiente:

```javascript
let game = new Game(); // o = createGame() o algún mecanismo similar que permita crear más de un juego.
game.start(); // inicialización del juego.
console.log( game.status ); // { status: 'playing', winner: null, turn: 'X' }
game.play(x, y);
console.log( game.status ); // { status: 'playing', winner: null, turn: 'O' }
game.play(x, y);
console.log( game.status ); // { status: 'playing', winner: null, turn: 'X' }
//...
console.log( game.status ); // { status: 'tie', winner: null, turn: null }
// o
console.log( game.status ); // { status: 'win', winner: 'X', turn: null }
game.start(); // inicia otro juego
```

Es decir, necesitaremos poder: crear diferentes juegos, iniciarlos/reiniciarlos, hacer una jugada en una posición y consultar de algún modo el estado del juego. Naturalmente estas cosas las podemos implementar como mejor veamos. Podemos lanzar eventos, usar callbacks o lo que queramos.

### Tests

Una parte del ejercicio consiste en escribir una batería de tests que acompañen el modelo verificándolo. Cada uno es libre de crear los tests antes o después o de usar un estilo u otro, pero es necesario crear los tests; son una parte del ejercicio.

### Esqueleto inicial

Para poder centrarse mejor en el ejercicio de diseño, se proporciona un esqueleto básico con un proceso de build y linting, y un primer test (_"assert(true)"_) con Mocha.

Esto es una simple recomendación y se proporciona para mantener el foco en el ejercicio, pero si alguien prefiere utilizar otras herramientas, es libre de hacerlo. En cualquier caso no se considera parte del ejercicio ni se valorará.

### Uso de librerías adicionales

En esta primera parte se _recomienda_ encarecidamente evitar el uso de librerías externas. Esto es especialmente importante en los primeros intentos. El ejercicio se puede realizar con diferentes aproximaciones y en sucesivos intentos se puede considerar el uso de alguna librería específica, pero se recomienda tratar de limitar su uso.


## Parte II: La Interfaz de Usuario

En esta segunda parte el objetivo es crear un interfaz sencillo para jugar a tres en raya usando el modelo de la primera parte.

### Valoración

Esta parte se centra por completo en la creación de la interfaz.

_No_ es demasiado importante el aspecto visual gráfico de la aplicación, aunque _sí_ se valorará positivamente que la experiencia de usuario sea relativamente consistente y cómoda. Sí es importante que el HTML y CSS sean limpios y sencillos. Lo mismo es aplicable para el código JS, claro.

En cuanto al código JS se valorarán limpieza y orden, y una estructura que separe claramente las partes de manipulación del DOM y de gestión de eventos. Como aspecto extra, se valorará _negativamente_ que durante el desarrollo de la segunda parte sea necesario modificar el código de la primera parte.

### Esqueleto inicial

El esqueleto proporcionado en esta segunda parte presenta un HTML mínimo con un contenedor `<div id="tictactoe">` donde insertaremos nuestro HTML, y un proceso de build que compilará nuestro LESS a CSS y empaquetará el JS.

### Recomendaciones

No hay restricciones en cuanto al diseño gráfico, aunque se recomienda hacer algo sencillo y simple.

### Uso de librerías adicionales

Para esta segunda parte se permite, si se quiere, el uso de algunas librerías. Se consideran aceptables librerías simples para manipulación del DOM, jQuery, Zepto, $dom, domReady..., generación de HTML con plantillas, t.js, mustache... y alguna otra tarea similar. No se _recomienda_ el uso de frameworks como React, Angular, Vue, Backbone, etc.

Eso sí, como siempre, se valora positivamente evitar el uso de cualquier librería, especialmente en las primeras soluciones.

En cuanto a la parte de CSS/HTML, no hay restricciones, aunque es _preferible_ no introducir frameworks como Bootstrap, Foundation, etc. Sin embargo, al no ser un ejercicio de diseño gráfico o maquetación, no se valorará negativamente su uso.


## Parte III: Jugador Autónomo [Opcional]

Esta parte es opcional. Se trata de añadir un jugador autónomo que sea capaz de producir jugadas válidas. El objetivo sólo llega hasta ahí, pero, lógicamente, cada uno puede expandir esto para intentar implementar más o menos _"inteligencia"_ en el jugador.

### Valoración

Se valorará especialmente la facilidad de integración del jugador con el resto del proyecto. Además se valorará positivamente que el jugador autónomo tenga un mínimo de inteligencia.

El número máximo de juegos posibles es bastante bajo, y el número de jugadas posibles en un turno `t` es sólo de `(9-t)!`, lo que hace que el problema sea relativamente fácil de resolver por fuerza bruta. Sin embargo, se valorarán mejor soluciones más _avanzadas_.

### Recomendaciones

Es interesante dar opción a que se puedan crear varios jugadores.
