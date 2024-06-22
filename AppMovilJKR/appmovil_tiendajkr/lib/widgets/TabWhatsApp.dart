// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/widgets/Header.dart';
import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:appmovil_tiendajkr/widgets/CardMessage.dart';

class TabWhatsAppView extends StatelessWidget {
  const TabWhatsAppView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: GlobalColors.secundaryColorH, // Cambia esto al color que desees
        child: ListView(
          padding: const EdgeInsets.only(top: 0),
          physics: const BouncingScrollPhysics(),
          children: [
            const Stack(
              children: [
                Header(),
              ],
            ),
            const SizedBox(
                height: 80), // Ajusta la altura según tus necesidades
            Center(
                child: MiCardMessage(
              titulo: 'Eeeeyyyy !',
              icono: Icons.check_rounded,
              subtitulo:
                  'Te redireccionaremos a \n whatsapp para que chatees con \n uno de nuestros asesores.',
              colorBtn: GlobalColors.secondaryBtnColor,
              espBtn: 25,
              accionBtn: const ErrorMessage(),
            ))
          ],
        ),
      ),
    );
  }
}
