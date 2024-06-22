import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:appmovil_tiendajkr/ui/views/home/Home.dart';
import 'package:appmovil_tiendajkr/utils/global.colors.dart';

class SplashView extends StatelessWidget {
  const SplashView({super.key});
  
  @override
  Widget build(BuildContext context) {
    Timer(const Duration(seconds: 3), () {
      // Reemplace la navegación utilizando Get.offAll() en lugar de Get.to()
      Get.offAll(() => const Home());
    });

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: RadialGradient(
            colors: [
              GlobalColors.primaryColorH,
              const Color(0x0F701F9E).withOpacity(0.8),
            ],
            radius: 0.85,
            center: const Alignment(0.0, 0.0),
          ),
        ),
        child: const Center(
          child: Text(
            'Descubre las \n tendecias en belleza que tenemos \n  para ti !!!!',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Color(0xFFFFFFFF), 
              fontSize: 30,
              fontStyle: FontStyle.italic, 
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
