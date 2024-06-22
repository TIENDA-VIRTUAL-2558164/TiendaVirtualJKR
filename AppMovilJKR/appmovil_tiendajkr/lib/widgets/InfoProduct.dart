// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/widgets/ListProducts.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:appmovil_tiendajkr/models/Products.dart';
import 'package:get/get.dart';

class TabInfoProducts extends StatelessWidget {
  final Data product;
  final String productId;

  const TabInfoProducts(this.product, {super.key, required this.productId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        backgroundColor: GlobalColors.secundaryColorH,
        elevation: 0,
      ),
      body: Container(
        color: GlobalColors.secundaryColorH,
        child: ListView(
          padding: const EdgeInsets.only(top: 0),
          physics: const BouncingScrollPhysics(),
          children: [
            const SizedBox(height: 20),
            Center(
              child: ClipRRect(
                  borderRadius: BorderRadius.circular(10.0), // Borde redondeado para la imagen
                  child: FutureBuilder<String>(
                    future: ListsProductsState.getImg(product.portada),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const CircularProgressIndicator();
                      } else if (snapshot.hasError) {
                        return const Text('Error');
                      } else {
                        return Image.network(
                          snapshot.data!,
                          height: 180.0,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        );
                      }
                    },
                  ),
                ),
            ),
            const SizedBox(height: 20),
            Center(
              child: Text(
                product.titulo,
                style: const TextStyle(fontSize: 20, color: Colors.black),
              ),
            ),
            const SizedBox(height: 20),
            Center(
              child: Html(
                data: product.contenido, // Contenido HTML del producto
                style: {
                  "body": Style(
                    fontSize: FontSize(16.0),
                    color: Colors.black,
                  ),
                },
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Get.to(const ErrorMessage() );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: GlobalColors.primaryColor, // Ajusta el color del botón según necesites
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    padding: const EdgeInsets.all(16.0),
                  ),
                  child: const Text(
                    'Agregar al Carrito',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
