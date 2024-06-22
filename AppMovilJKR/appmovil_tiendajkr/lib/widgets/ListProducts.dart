// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/models/Products.dart';
import 'package:appmovil_tiendajkr/widgets/CardProducts.dart';
import 'package:dio/dio.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ListsProducts extends StatefulWidget {
  const ListsProducts({super.key});

  @override
  State<StatefulWidget> createState() => ListsProductsState();
}

class ListsProductsState extends State<ListsProducts> {
  List<Data>? products; // Cambiado de Datum? a List<Datum>?

  @override
  void initState() {
    super.initState();
    getProducts();
  }

  Future<void> getProducts() async {
    String request =
        'https://appjkr.vercel.app/api/listar_productos_tienda';
    final response = await Dio().get(request);
    setState(() {
      products = List<Data>.from((response.data["data"] as List<dynamic>)
          .map((x) => Data.fromJson(x))); // Parsea el JSON en una lista de Datum
    });
  }

  // ignore: non_constant_identifier_names
  static Future<String> getImg(String portada) async {
    String request =
        'https://appjkr.vercel.app/api/obtener_portada/$portada';
    return request; // Retorna la img
  }

  @override
  Widget build(BuildContext context) {
return Scaffold(
  backgroundColor: GlobalColors.secondaryColor,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.only(top: 36.0,left: 16.0),
            child: SvgPicture.asset(
              'assets/img/logo.svg',
              width: 200, // Ajusta el ancho de la imagen según sea necesario
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: products == null
                  ? const Center(child: CircularProgressIndicator())
                  : GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        childAspectRatio: 0.7,
                        crossAxisSpacing: 8.0,
                        mainAxisSpacing: 8.0,
                      ),
                      itemCount: products!.length,
                      itemBuilder: (BuildContext context, int index) {
                        return CardProducts(products![index]);
                      },
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
