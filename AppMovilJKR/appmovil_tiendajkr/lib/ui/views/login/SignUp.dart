// ignore_for_file: file_names
import 'package:appmovil_tiendajkr/widgets/ErrorMessage.dart';
import 'package:flutter/material.dart';
import 'package:appmovil_tiendajkr/ui/views/login/Login.dart';
import 'package:appmovil_tiendajkr/widgets/Header.dart';
import 'package:appmovil_tiendajkr/widgets/Logo.dart';
import 'package:get/get.dart';

import '../../../../../utils/global.colors.dart';
import '../../../../../widgets/TextFieldCustom.dart';

class SignUp extends StatelessWidget {
  const SignUp({super.key});

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
              children: [Header(), LogoHeader(Icons.person_2_sharp)],
            ),
            Title(),
            TextField(),
            ButtonSingUp(),
          ],
        ),
      ),
    );
  }
}


class Title extends StatelessWidget {
  const Title({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Row(
        children: [
          TextButton(
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const LoginView()));
              },
              child: const Text(
                'INGRESAR',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey),
              )),
          const Text(
            '/',
            style: TextStyle(fontSize: 25, color: Colors.grey),
          ),
          TextButton(
              onPressed: () {},
              child: Text(
                'REGISTRARSE',
                style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                    color: GlobalColors.darkColorH),
              ))
        ],
      ),
    );
  }
}

class TextField extends StatelessWidget {
  const TextField({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        children: [
          TextFieldCustom(
              type: TextInputType.text,
              icon: Icons.person_outlined,
              hint: 'Nombres y Apellidos',
              label: 'Usuario'),
          const SizedBox(
            height: 20,
          ),
          TextFieldCustom(
              type: TextInputType.emailAddress,
              icon: Icons.email_outlined,
              hint: 'Correo Electronico',
              label: 'Correo'),
          const SizedBox(
            height: 20,
          ),
          TextFieldCustom(
              type: TextInputType.phone,
              icon: Icons.phone_outlined,
              hint: 'Numero celular',
              label: 'Celular'),
          const SizedBox(
            height: 20,
          ),
          TextFieldCustom(
              type: TextInputType.visiblePassword,
              icon: Icons.password_outlined,
              hint: 'Ingrese su Contraseña',
              label: 'Contraseña'),
          const SizedBox(
            height: 20,
          ),
        ],
      ),
    );
  }
}

class ButtonSingUp extends StatelessWidget {
  const ButtonSingUp({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(70),
      decoration: BoxDecoration(
        color: GlobalColors.secundaryColorH,
        borderRadius: const BorderRadius.all(Radius.circular(25)), // Redondeamos menos
        border: Border.all(color: GlobalColors.secundaryBtnColorH, width: 1.5),
      ),
      child: TextButton(
        onPressed: () {
                    Get.to(const ErrorMessage() );
        },
        child: const Padding(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10), // Menos espacio interno
          child: Text(
            'Registrar',
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
