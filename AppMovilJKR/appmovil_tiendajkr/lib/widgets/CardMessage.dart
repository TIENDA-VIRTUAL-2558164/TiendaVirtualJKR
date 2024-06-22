// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MiCardMessage extends StatelessWidget {
  final String titulo;
  final IconData icono;
  final String subtitulo;
  final dynamic accionBtn;
  final Color colorBtn;
  final double espBtn;

  const MiCardMessage({
    super.key,
    required this.titulo,
    required this.icono,
    required this.subtitulo,
    required this.colorBtn,
    required this.espBtn,
    required this.accionBtn,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      margin: const EdgeInsets.all(15),
      elevation: 10,
      color: GlobalColors.secundaryColorH,
      child: Container(
        constraints: const BoxConstraints(
          maxWidth: 310, // Ancho máximo de la Card
          minHeight: 290, // Altura mínima de la Card
        ),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10.0), // Espaciado alrededor del icono
              child: Center(
                child: Icon(icono, size: 40), // Ícono más grande y centrado
              ),
            ),
                              const SizedBox(height: 14.0),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center, // Centrar elementos horizontalmente
                children: [
                  Center(
                    child: Text(
                      titulo,
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold), // Título ajustado
                    ),
                  ),
                  const SizedBox(height: 8.0),
                  Center(
                    child: Text(
                      subtitulo,
                      style: const TextStyle(fontSize: 16), // Texto ajustado
                      textAlign: TextAlign.center, // Asegurarse que el texto esté centrado
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: espBtn), // Espacio entre el contenido y el botón
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: SizedBox(
                width: double.infinity, // Botón toma todo el ancho disponible
                child: ElevatedButton(
                  onPressed: () {
                   Get.off(accionBtn) ;
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: colorBtn, // Color del botón ajustable
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    padding: const EdgeInsets.all(16.0),
                  ),
                  child: const Text(
                    'Continuar',
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
