// ignore_for_file: file_names

import 'package:flutter/material.dart';

import 'package:appmovil_tiendajkr/utils/global.colors.dart';


class Header extends StatelessWidget {
  const Header({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 190,
      width: double.infinity,
      child: CustomPaint(
        painter: HederLoginPainter()
      ),
    );
  }
  
}

class HederLoginPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();
    paint.color = GlobalColors.primaryColorH;
    paint.style = PaintingStyle.fill;

    const double borderRadius = 35.0; // Define el radio de las esquinas

    final path = Path();
    path.lineTo(0, size.height - borderRadius + 70); // Empezar desde el borde izquierdo inferior
    path.quadraticBezierTo(0, size.height, borderRadius, size.height); // Esquina inferior izquierda
    path.lineTo(size.width - borderRadius , size.height); // Línea inferior horizontal
    path.quadraticBezierTo(size.width, size.height, size.width, size.height - borderRadius +70); // Esquina inferior derecha
    path.lineTo(size.width, 0); // Línea vertical derecha
    path.lineTo(0, 0); // Volver al punto inicial para cerrar el rectángulo

    path.close(); // Cierra el camino

    canvas.drawPath(path, paint);
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate){
    return true;
  }
}