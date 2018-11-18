package com.example.gusbru5.android_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class SecondActivity extends AppCompatActivity {

    private String token;
    private String usuario;
    private TextView usernameTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        usernameTextView = findViewById(R.id.username);

        Intent intent = getIntent();

        usuario = intent.getStringExtra("usuario");
        token = intent.getStringExtra("token");

        usernameTextView.setText("Bem vindo " + usuario);
    }
}