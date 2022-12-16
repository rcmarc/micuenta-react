# MiCuenta

MiCuenta es un sitio web para la administración de las cuentas de usuario de la Universidad de Cienfuegos, el cual tiene como fuente primaria de datos al Directorio Activo de la entidad.

Mediante este sitio web se les va a permitir a los usuarios tener control de su información personal almacenada y establecer medidas de seguridad para la protección de su cuenta.

## Arquitectura

Este repositorio utiliza una arquitectura de Monorepo:

 * **apps/web**: Sitio web con [Next.js](https://nextjs.org)
 * **packages/ldap**: Biblioteca de [Node](https://nodejs.org) para comunicarse con el Directorio Activo

## Variables de Entorno

Para que la aplicación funcione correctamente necesita las siguientes variables de entorno:
* **LDAP_HOST**: La URL del servidor del Directorio Activo
* **LDAP_BIND_DN**: El objeto en el servidor del Directorio Activo con los permisos suficientes para leer y modificar información.
* **LDAP_BIND_PASSWORD**: La contraseña del objeto anterior.
* **LDAP_SEARCH_BASE**: El lugar donde empieza la búsqueda dentro del árbol jerárquico del Directorio Activo.
* **LDAP_CERT_PATH** (Opcional): Camino al archivo que contiene el certificado para encriptar la conexión con el Directorio Activo.
* **LDAP_KEY_PATH** (Opcional): Camino al archivo que contiene la llave privada que corresponde al certificado anterior.
* **LDAP_REJECT_UNAUTHORIZED**: Indica si el servidor debe o no rechazar certificados inválidos, **1** indica que si, **0** que no.
* **SECRET_KEY**: cadena de texto que se utiliza para codificar tokens, firmar/cifrar cookies y generar claves criptográficas.
* **PORT** (Opcional): Puerto donde va a escuchar el servidor, por defecto es 3000.
* **NODE_ENV** (Opcional): El ambiente en cual se va a ejecutar la aplicación, opciones validas son: "development", "production". Por defecto se asume "development".