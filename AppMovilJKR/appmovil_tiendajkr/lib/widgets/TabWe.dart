// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:appmovil_tiendajkr/widgets/Header.dart';
import 'package:appmovil_tiendajkr/widgets/CardMessage.dart';

class TabWeView extends StatelessWidget {
  const TabWeView({super.key});

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
              titulo: 'Querido Usuario !',
              icono: Icons.manage_accounts_sharp,
              subtitulo: 'Si desea conocer mas sobre\n nosotros, lo invitamos a que\nnos visites en nuestra pagina\n web:\n www.Aunnolatenemos.com.co',
              colorBtn: GlobalColors.secondaryBtnColor,
              espBtn: 5,
              accionBtn: const ErrorMessage(),
            ))
          ],
        ),
      ),
    );
  }
}
