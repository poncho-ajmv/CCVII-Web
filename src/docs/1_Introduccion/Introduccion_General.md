# General

Este documento describe el desarrollo de un sistema operativo educativo, implementado como parte del curso **CC7 - Sistemas Operativos** de la **Universidad Galileo**, orientado a plataformas embebidas como la **BeagleBone Black**.


> 📅 **Última actualización:** mayo de 2025

---
El proyecto implementa un sistema operativo mínimo con soporte de multiprogramación, ejecutado en un entorno *bare-metal*, sin unidad de gestión de memoria (MMU). Su diseño modular permite gestionar múltiples procesos de usuario mediante planificación Round-Robin, ejecutando cada uno en intervalos regulares de tiempo (1 segundo), definidos por interrupciones del temporizador DMTimer2.

El núcleo del sistema se encarga de la inicialización de hardware esencial (UART, temporizador, controlador de interrupciones), la gestión de procesos y el cambio de contexto. Cada proceso de usuario cuenta con una pila independiente y se ejecuta desde una dirección de memoria fija, definida mediante scripts de enlace, asegurando aislamiento y estabilidad.

Los procesos implementados demuestran el sistema de planificación al imprimir continuamente caracteres alfanuméricos por UART: uno imprime letras ('a' a 'z') y el otro dígitos ('0' a '9'), produciendo una salida intercalada que evidencia el cambio de contexto correcto.

---
