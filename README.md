# Sistema Conversor de Divisas en base a pesos chilenos

Proyecto estatico conversor de pesos chilenos a algunas divisas, basado en el valor diario aportado por:

```
mindicator.cl/api
```

## Acceso

```
https://trejosd.github.io/Conversor-Monedas-Chile/
```

## Descripción

La página muestra una aplicación para convertir pesos chilenos a algunas divisas:

- Retorna el valor en la divisa seleccionada segun los pesos chilenos ingresados.
- Muestra un grafico del comportamiento de la divisa seleccionada, de los ultimos 10 dias.
- Datos se obtienen del Api mindicator.cl

## Tecnologías Utilizadas

- HTML5
- CSS3
- Flexbox
- JS
- Endpoint Request

## Estructura del Proyecto

```text
.
├── index.html
├── README.md
└── assets
    ├── css
    │   └── styles.css
    └── script
        └── script.js
```

## Características

- Layout principal construido con Flexbox.
- Sección principal ingresamos el valor en pesos que deseamos obtener su valor en otra divisa "dolar, euro, dolar_intercambio".
- Grafica dinamica, con el comportamiento diario de la divisa seleccionada.

## Autor

Proyecto hecho por Diego Trejos para desafioLatam.
