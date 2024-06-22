// ignore_for_file: file_names

import 'package:flutter/material.dart';
import '../utils/global.colors.dart';

class TextFieldCustom extends StatelessWidget {
  final TextInputType type;
  final IconData icon;
  final Color appcolor = GlobalColors.secondaryBtnColor;
  final bool pass;
  final String label;
  final String hint;
  final double radius = 50;

  TextFieldCustom({
    super.key,
    this.pass = false,
    required this.type,
    required this.icon,
    required this.hint,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      keyboardType: type,
      obscureText: pass,
      decoration: InputDecoration(
        prefixIcon: Icon(
          icon,
          color: GlobalColors.mediumColorH,
        ),
        labelText: label,
        hintText: hint,
        filled: true,
        fillColor: GlobalColors.lightColor,
        border: OutlineInputBorder(
            borderSide: BorderSide(color: GlobalColors.lightColorH),
            borderRadius: BorderRadius.all(Radius.circular(radius))),
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: GlobalColors.mediumcolor),
            borderRadius: BorderRadius.all(Radius.circular(radius))),
      ),
    );
  }
}
