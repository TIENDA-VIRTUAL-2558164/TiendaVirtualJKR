import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:appmovil_tiendajkr/ui/views/splash/splash_view.dart';


void main(){
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      builder: (context, child) {
        return SafeArea(
          child: child!,
        );
      },
      home: const SplashView(),
    );
  }
  
}