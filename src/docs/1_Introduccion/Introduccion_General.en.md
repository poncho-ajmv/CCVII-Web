# General

This document describes the development of an educational operating system, implemented as part of the **CC7 - Operating Systems** course at **Universidad Galileo**, oriented towards embedded platforms such as the **BeagleBone Black**.

> 📅 **Last updated:** May 2025

---

The project implements a minimal operating system with multiprogramming support, running in a *bare-metal* environment, without a memory management unit (MMU). Its modular design allows for managing multiple user processes through Round-Robin scheduling, executing each one in regular time intervals called quantums. The default quantum value is 1 second, but it can be modified. The quantum defines the time between each DMTimer2 timer interrupt.

The system's kernel is responsible for initializing essential hardware (UART, timer, interrupt controller), managing processes, and performing context switching. Each user process has an independent stack and executes from a fixed memory address, defined via linker scripts, ensuring isolation and stability.

The implemented processes demonstrate the scheduling system by continuously printing alphanumeric characters over UART: one prints letters ('a' to 'z') and the other digits ('0' to '9'), producing an interleaved output that proves correct context switching.

---
