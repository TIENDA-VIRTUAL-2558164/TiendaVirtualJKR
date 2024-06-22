// To parse this JSON data, do
//
//     final products = productsFromJson(jsonString);

// ignore_for_file: file_names

import 'dart:convert';

Products productsFromJson(String str) => Products.fromJson(json.decode(str));

String productsToJson(Products data) => json.encode(data.toJson());

class Products {
    final Data data;

    Products({
        required this.data,
    });

    factory Products.fromJson(Map<String, dynamic> json) => Products(
        data: Data.fromJson(json["data"]),
    );

    Map<String, dynamic> toJson() => {
        "data": data.toJson(),
    };
}

class Data {
    final List<Galeria> galeria;
    final int nventas;
    final List<Variedade> variedades;
    final int npuntos;
    final String estado;
    final String id;
    final String titulo;
    final int stock;
    final int precio;
    final String descripcion;
    final String contenido;
    final String categoria;
    final String portada;
    final String slug;
    final DateTime createdAt;
    final int v;
    final String tituloVariedad;

    Data({
        required this.galeria,
        required this.nventas,
        required this.variedades,
        required this.npuntos,
        required this.estado,
        required this.id,
        required this.titulo,
        required this.stock,
        required this.precio,
        required this.descripcion,
        required this.contenido,
        required this.categoria,
        required this.portada,
        required this.slug,
        required this.createdAt,
        required this.v,
        required this.tituloVariedad,
    });

    factory Data.fromJson(Map<String, dynamic> json) => Data(
        galeria: List<Galeria>.from(json["galeria"].map((x) => Galeria.fromJson(x))),
        nventas: json["nventas"],
        variedades: List<Variedade>.from(json["variedades"].map((x) => Variedade.fromJson(x))),
        npuntos: json["npuntos"],
        estado: json["estado"],
        id: json["_id"],
        titulo: json["titulo"],
        stock: json["stock"],
        precio: json["precio"],
        descripcion: json["descripcion"],
        contenido: json["contenido"],
        categoria: json["categoria"],
        portada: json["portada"],
        slug: json["slug"],
        createdAt: DateTime.parse(json["createdAt"]),
        v: json["__v"],
        tituloVariedad: json["titulo_variedad"],
    );

    Map<String, dynamic> toJson() => {
        "galeria": List<dynamic>.from(galeria.map((x) => x.toJson())),
        "nventas": nventas,
        "variedades": List<dynamic>.from(variedades.map((x) => x.toJson())),
        "npuntos": npuntos,
        "estado": estado,
        "_id": id,
        "titulo": titulo,
        "stock": stock,
        "precio": precio,
        "descripcion": descripcion,
        "contenido": contenido,
        "categoria": categoria,
        "portada": portada,
        "slug": slug,
        "createdAt": createdAt.toIso8601String(),
        "__v": v,
        "titulo_variedad": tituloVariedad,
    };
}

class Galeria {
    final String imagen;
    final String id;

    Galeria({
        required this.imagen,
        required this.id,
    });

    factory Galeria.fromJson(Map<String, dynamic> json) => Galeria(
        imagen: json["imagen"],
        id: json["_id"],
    );

    Map<String, dynamic> toJson() => {
        "imagen": imagen,
        "_id": id,
    };
}

class Variedade {
    final String titulo;

    Variedade({
        required this.titulo,
    });

    factory Variedade.fromJson(Map<String, dynamic> json) => Variedade(
        titulo: json["titulo"],
    );

    Map<String, dynamic> toJson() => {
        "titulo": titulo,
    };
}
