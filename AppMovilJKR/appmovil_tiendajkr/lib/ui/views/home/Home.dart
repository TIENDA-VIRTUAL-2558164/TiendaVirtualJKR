// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/widgets/TabPage.dart';

class Home extends StatelessWidget{
  const Home({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: TabPage(),
    );
  }

  
}