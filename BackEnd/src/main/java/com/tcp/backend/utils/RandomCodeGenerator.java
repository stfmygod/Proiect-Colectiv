package com.tcp.backend.utils;


public class RandomCodeGenerator {
    public static String codeGenerator() {
        int rnd = (int) Math.floor(Math.random() * 1000);

        return Integer.toString(rnd);
    }
}
