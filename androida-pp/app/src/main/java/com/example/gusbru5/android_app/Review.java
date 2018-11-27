package com.example.gusbru5.android_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

public class Review extends AppCompatActivity {

    private TextView questoesRespondidas;
    private Button btnConcluirResumo;
    private ArrayList<String> respostas;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_review);

        questoesRespondidas = findViewById(R.id.questoesRespondidas);
        btnConcluirResumo = findViewById(R.id.btnConcluirResumo);

        Intent intent = getIntent();
        respostas = intent.getStringArrayListExtra("respostas");

        questoesRespondidas.setText("Questoes:\n");
        for (int i = 0; i < respostas.size(); i++)
        {
            questoesRespondidas.append("Questao " + (i+1) + " = " + respostas.get(i) + "\n");
        }

        btnConcluirResumo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

    }
}
