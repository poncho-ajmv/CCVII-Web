# General

Este sitio documenta el desarrollo de un sistema operativo educativo, realizado como parte del curso **CC7 - Sistemas Operativos de la Universidad Galileo**.

El desarrollo está orientado a ejecutarse en plataformas embebidas, específicamente en la **BeagleBone Black**.

> 📅 **Última actualización:** mayo de 2025

---

Este proyecto presenta el diseño e implementación de un sistema operativo mínimo con capacidades de multiprogramación para la plataforma BeagleBone Black, bajo un enfoque *bare-metal*, ni el uso de una unidad de gestión de memoria (MMU). El objetivo principal es demostrar los fundamentos prácticos de la planificación de procesos, gestión de interrupciones y aislamiento de contexto, a través de una arquitectura modular compuesta por un núcleo operativo básico (OS) y dos procesos de usuario concurrentes.

El núcleo del sistema operativo está encargado de inicializar los dispositivos esenciales del sistema —incluyendo la UART para entrada/salida serial, el temporizador DMTimer2 del SoC AM335x para la generación de interrupciones periódicas, y el controlador de interrupciones INTC para habilitar la atención a eventos—, además de implementar un planificador Round-Robin no preventivo que alterna entre procesos activos cada cierto intervalo de tiempo configurado (1 segundo, en esta implementación). La planificación se basa en interrupciones de hardware que permiten realizar el cambio de contexto, garantizando así una forma básica de multitarea cooperativa sin la intervención directa de los procesos.

Cada proceso de usuario está diseñado para ejecutar una tarea sencilla pero representativa: el primero imprime en bucle las letras minúsculas del alfabeto (‘a’ a ‘z’), mientras que el segundo imprime dígitos numéricos (‘0’ a ‘9’), ambos haciendo uso de una biblioteca de funciones de impresión basada en UART. Estos procesos están almacenados en direcciones de memoria fijas, definidas mediante un script de enlace (linker.ld), y cuentan con sus propias pilas independientes, evitando colisiones y garantizando integridad durante los cambios de contexto.
