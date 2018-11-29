package com.example.gusbru5.android_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

public class Review extends AppCompatActivity {

//    private TextView questoesRespondidas;
    private TextView textViewScore;
    private Button btnConcluirResumo;
    private ArrayList<String> respostas, corretas;
    private int score, numberOfQuestions;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_review);

//        questoesRespondidas = findViewById(R.id.questoesRespondidas);
        textViewScore = findViewById(R.id.textViewScore);
        btnConcluirResumo = findViewById(R.id.btnConcluirResumo);
        mRecyclerView = findViewById(R.id.questoesRespondidas);

        Intent intent = getIntent();
        respostas = intent.getStringArrayListExtra("respostas");
        corretas = intent.getStringArrayListExtra("corretas");

        score = intent.getIntExtra("score", 0);
        numberOfQuestions = intent.getIntExtra("numberOfQuestions", 0);

//        questoesRespondidas.setText("Questoes:\n");
//        for (int i = 0; i < respostas.size(); i++)
//        {
//            questoesRespondidas.append("Questao " + (i+1) + " = " + respostas.get(i) + "\n");
//        }
        mRecyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(this);
        mAdapter = new QuestionAdapter(respostas, corretas);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mRecyclerView.setAdapter(mAdapter);




        if (numberOfQuestions != 0)
        {
            textViewScore.setText("Voce acertou " + score + " de " + numberOfQuestions + "\n");
            textViewScore.append("Sua nota e: " + Float.valueOf(score)/Float.valueOf(numberOfQuestions)*10);
        }

        btnConcluirResumo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoAtividades();
            }
        });

    }

    private void gotoAtividades()
    {
//        Intent intent = new Intent(this, SecondActivity.class);
//        startActivity(intent);
        finish();
    }
}
