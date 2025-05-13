#!/bin/bash

# Ruta base donde se creará la documentación
BASE_DIR="/home/toto/poncho/CODE/CCVII-Web/src/docs"

# Crear directorio principal
mkdir -p "$BASE_DIR"

# Función para crear archivos en una sección
create_section() {
    section_dir="$BASE_DIR/$1"
    mkdir -p "$section_dir"
    shift
    for file in "$@"; do
        touch "$section_dir/$file"
    done
}

# Crear estructura completa
create_section "1_Introduccion" \
    "1.1_Proposito.md" \
    "1.2_Objetivos_Diseno.md" \
    "1.3_Plataforma_Implementacion.md"

create_section "2_Arquitectura_General" \
    "2.1_Capas_Sistema.md" \
    "2.2_Flujo_Ejecucion.md" \
    "2.3_Componentes_Principales.md"

create_section "3_Inicializacion_Hardware" \
    "3.1_UART0_Config.md" \
    "3.2_DMTimer2.md" \
    "3.3_INTC.md" \
    "3.4_Tabla_Vectores_Interrupcion.md"

create_section "4_Gestion_Memoria" \
    "4.1_Mapa_Memoria.md" \
    "4.2_Asignacion_Regiones.md" \
    "4.3_Limpieza_BSS.md"

create_section "5_Procesos_Usuario" \
    "5.1_Diseno_Procesos.md" \
    "5.2_Logica_Ejecucion.md" \
    "5.3_Puntos_Entrada.md"

create_section "6_Planificacion_Procesos" \
    "6.1_RoundRobin.md" \
    "6.2_Gestion_Temporizador.md" \
    "6.3_PCB.md"

create_section "7_Manejo_Interrupciones" \
    "7.1_Handler_TimerIRQ.md" \
    "7.2_Guardado_Registros.md" \
    "7.3_Deshabilitacion_Interrupciones.md"

create_section "8_Bibliotecas_Sistema" \
    "8.1_IO.md" \
    "8.2_String.md" \
    "8.3_Abstracciones.md"

create_section "9_Enlazado_Compilacion" \
    "9.1_Script_Construccion.md" \
    "9.2_Linker_Config.md" \
    "9.3_Carga_Memoria.md"

create_section "10_Pruebas_Depuracion" \
    "10.1_Salida_Intercalada.md" \
    "10.2_Estabilidad.md" \
    "10.3_Herramientas_Depuracion.md"

create_section "11_Consideraciones_Avanzadas" \
    "11.1_Escalabilidad.md" \
    "11.2_Manejo_Errores.md" \
    "11.3_Optimizaciones.md"

create_section "12_Referencias" \
    "12.1_Manual_AM335x.md" \
    "12.2_Especificaciones_BBB.md" \
    "12.3_Recursos_Externos.md"

# Crear archivo README.md
touch "$BASE_DIR/README.md"

echo "Estructura de documentación creada en: $BASE_DIR"