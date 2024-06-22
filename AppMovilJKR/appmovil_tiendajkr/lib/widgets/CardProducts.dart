// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/models/Products.dart';
import 'package:appmovil_tiendajkr/widgets/ListProducts.dart';
import 'package:appmovil_tiendajkr/widgets/InfoProduct.dart';
import 'package:get/get.dart';

class CardProducts extends StatelessWidget {
  final Data products;

  const CardProducts(this.products, {super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => TabInfoProducts( products ,productId: products.id),
          ),
        );
      },
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                height: 135.0,
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0), // Borde redondeado
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.3), // Color de la sombra
                      blurRadius: 5, // Desenfoque de la sombra
                      offset: const Offset(0, 3), // Desplazamiento de la sombra
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(10.0), // Borde redondeado para la imagen
                  child: FutureBuilder<String>(
                    future: ListsProductsState.getImg(products.portada),
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
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Text(
                  products.titulo,
                  style: const TextStyle(fontSize: 18.0),
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          "\$${products.precio}",
                          style: const TextStyle(fontSize: 15.0),
                        ),
                        IconButton(
                          onPressed: () {
                                                          Get.to(const ErrorMessage() );
                          },
                          icon: const Icon(Icons.shopping_cart),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
