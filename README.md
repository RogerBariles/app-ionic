 # IONIC APP - ANGULAR
 # AUTH: Roger Bariles Rojas
 ----------------------------

 Versiones:
- ionic 5.5.2
- ionic cli 6.12.3
- Angular 11.2.0
- npm 6.14.6

# LEVANTAR PROYECTO
clonar repositorio:
    - git clone 

tener instalado ionic, de lo contrario correr:
    - npm install -g @ionic/cli

descargar dependencias:
    - npm i

levantar proyecto:
    - ionic serve


# ESTRUCTURA DEL PROYECYO

 Directorio:
    app/
    |
    |-- components/     los componentes principales de la funcionalidad de la aplicacion
            |
            |- list-data/
            |- login/
    |
    |
    |- models/    las estructuras que corresponde a dos datos del back
    |
    |- services/  aqui se encontrara los servicios que realizan las peticiones Http y un interceptor

