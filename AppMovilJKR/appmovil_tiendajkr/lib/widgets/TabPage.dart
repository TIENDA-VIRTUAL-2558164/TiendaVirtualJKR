// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:appmovil_tiendajkr/widgets/TabWe.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/ui/views/login/Login.dart';
import 'package:appmovil_tiendajkr/ui/views/login/SignUp.dart';
import 'package:appmovil_tiendajkr/widgets/ListProducts.dart';
import 'package:appmovil_tiendajkr/widgets/TabWhatsApp.dart';
import 'package:get/get.dart';

class TabPage extends StatefulWidget {
  const TabPage({super.key});

  @override
  State<StatefulWidget> createState() => TabPageState();
}

class TabPageState extends State<TabPage> {
  int _currentIndex = 0;

  final List<Widget> _tabs = [
    Container(
      color: GlobalColors.secundaryColorH,
      child: const ListsProducts(), // Mostrar ListsProducts en el tab del home
    ),
    const NestedNavigator(),
    Container(color: GlobalColors.secundaryColorH, child: const TabWeView()),
    Container(
        color: GlobalColors.secundaryColorH, child: const TabWhatsAppView()),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _tabs[_currentIndex],
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        color: GlobalColors.primaryColorH,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(
              onPressed: () {
                setState(() {
                  _currentIndex = 0;
                });
              },
              icon: const Icon(CupertinoIcons.house_fill),
              tooltip: 'home',
              color: Colors.white,
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  _currentIndex = 1;
                });
              },
              icon: const Icon(CupertinoIcons.person),
              tooltip: 'perfil',
              color: Colors.white,
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  _currentIndex = 2;
                });
              },
              icon: const Icon(CupertinoIcons.chat_bubble_text_fill),
              tooltip: 'nosotros',
              color: Colors.white,
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  _currentIndex = 3;
                });
              },
              icon: const Icon(Icons.wechat_rounded),
              tooltip: 'whatsapp',
              color: Colors.white,
            ),
          ],
        ),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 18),
        child: FloatingActionButton(
          onPressed: () {
                    Get.to(const ErrorMessage() );
          },
          tooltip: 'Agregar al carrito',
          backgroundColor: GlobalColors.primaryColorH,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(28),
          ),
          child: const Icon(
            Icons.add_shopping_cart,
            color: Colors.white,
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}

class NestedNavigator extends StatelessWidget {
  const NestedNavigator({super.key});

  @override
  Widget build(BuildContext context) {
    return Navigator(
      onGenerateRoute: (RouteSettings settings) {
        WidgetBuilder builder;
        switch (settings.name) {
          case '/':
            builder = (BuildContext context) => const LoginView();
            break;
          case 'register':
            builder = (BuildContext context) => const SignUp();
            break;
          default:
            throw Exception('Invalid route: ${settings.name}');
        }
        return MaterialPageRoute(builder: builder, settings: settings);
      },
    );
  }
}
