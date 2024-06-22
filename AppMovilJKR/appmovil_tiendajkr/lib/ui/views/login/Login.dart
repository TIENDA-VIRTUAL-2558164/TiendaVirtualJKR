// ignore_for_file: file_names

import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/widgets/Logo.dart';
import 'package:appmovil_tiendajkr/widgets/Header.dart';
import 'package:appmovil_tiendajkr/widgets/TextFieldCustom.dart';
import 'package:appmovil_tiendajkr/utils/global.colors.dart';
import 'package:get/get.dart';

class LoginView extends StatelessWidget {
  const LoginView({super.key});

  static String id = 'login_view';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: GlobalColors.secundaryColorH, // Cambia esto al color que desees
        child: ListView(
          padding: const EdgeInsets.only(top: 0),
          physics: const BouncingScrollPhysics(),
          children: const [
            Stack(
              children: [
                Header(),
                LogoHeader(Icons.login_outlined),
              ],
            ),
            Title(),
            SizedBox(
              height: 40,
            ),
            EmailAndPassword(),
            ForgotPassword(),
            SizedBox(
              height: 40,
            ),
            ButtonSinIn(),
          ],
        ),
      ),
    );
  }
}

//clase title (); linea 24

class Title extends StatelessWidget {
  const Title({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15),
      child: Row(
        children: [
          const Text(
            'INGRESAR',
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
          ),
          const Text(
            '/',
            style: TextStyle(fontSize: 25, color: Colors.grey),
          ),
          TextButton(
            onPressed: () {
              Navigator.pushNamed(context, 'register');
            },
            child: const Text(
              'REGISTRARSE',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.grey,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

//clase EmailAndPassword(); linea 28

class EmailAndPassword extends StatelessWidget {
  const EmailAndPassword({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          TextFieldCustom(
              type: TextInputType.emailAddress,
              icon: Icons.email_outlined,
              label: 'Correo',
              hint: 'Ingrese su correo Electronico'),
          const SizedBox(
            height: 40,
          ),
          TextFieldCustom(
            type: TextInputType.visiblePassword,
            icon: Icons.password_outlined,
            label: 'Contraseña',
            hint: 'Contraseña',
            pass: true,
          ),
        ],
      ),
    );
  }
}

//clase ForgotPassword() linea 29

class ForgotPassword extends StatelessWidget {
  const ForgotPassword({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Get.to(const ErrorMessage());
      },
      child: Container(
        padding: const EdgeInsets.only(right: 25, top: 25),
        alignment: Alignment.centerRight,
        child: const Text('Olvido su contraseña'),
      ),
    );
  }
}

// clase ButtonSinIn(); linea 57

class ButtonSinIn extends StatelessWidget {
  const ButtonSinIn({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(70),
      decoration: BoxDecoration(
        color: GlobalColors.secundaryColorH,
        borderRadius:
            const BorderRadius.all(Radius.circular(25)), // Redondeamos menos
        border: Border.all(color: GlobalColors.secundaryBtnColorH, width: 1.5),
      ),
      child: TextButton(
        onPressed: () {
          Get.to(const ErrorMessage());
        },
        child: const Padding(
          padding: EdgeInsets.symmetric(
              horizontal: 20, vertical: 10), // Menos espacio interno
          child: Text(
            'Ingresar',
            style: TextStyle(
              height: 1.0, // Menos altura de línea
              fontSize: 14, // Tamaño de fuente más pequeño
              fontWeight: FontWeight.bold,
              color: Color(0xFF018786),
            ),
          ),
        ),
      ),
    );
  }
}
