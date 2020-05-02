const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se puedo guarda', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


    //console.log(listadoPorHacer);
}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porhacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porhacer);
    guardarDB();


    return porhacer;
}

const borrar = (descripcion) => {

    /*
    let nuevolistado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
    if(listadoPorHacer.length === nuevolistado.length){
        return false
    }else{
        listadoPorHacer = nuevolistado;
        return true;
    }*/

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}