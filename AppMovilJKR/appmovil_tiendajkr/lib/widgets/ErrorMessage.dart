// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/ui/views/home/Home.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:appmovil_tiendajkr/widgets/Header.dart';
import 'package:appmovil_tiendajkr/widgets/CardMessage.dart';

class ErrorMessage extends StatelessWidget {
  const ErrorMessage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: GlobalColors.secundaryColorH, // Cambia esto al color que desees
        child: ListView(
          padding: const EdgeInsets.only(top: 0),
          physics: const BouncingScrollPhysics(),
          children:  [
            const Stack(
              children: [
                Header(),
              ],
            ),
            const SizedBox(height: 60), // Ajusta la altura según tus necesidades
            Center(
                child: MiCardMessage(
              titulo: ' Upss !',
              icono: Icons.error_outline_outlined,
              subtitulo: 'Estamos trabajando en ello,\n por favor intenta despues. \n Lamentamos las molestias Ocacionadas',
              colorBtn: GlobalColors.dangerColor,
              espBtn: 5,
              accionBtn: const Home(),
            ))
          ],
        ),
      ),
    );
  }
}
