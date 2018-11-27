package com.example.gusbru5.android_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Question extends AppCompatActivity {

    private TextView txtTitle, txtQuestao;
    private ProgressBar progressBar;
    private RadioGroup radioAlternativas;
    private RadioButton alternativaA, alternativaB, alternativaC, alternativaD, alternativaE;
    private Button btnNext;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        Intent intent = getIntent();
        txtTitle = findViewById(R.id.txtTitle);
        txtQuestao = findViewById(R.id.txtQuestao);
        progressBar =  findViewById(R.id.progressBar);
        radioAlternativas = findViewById(R.id.radioAlternativas);
        alternativaA = findViewById(R.id.alternativaA);
        alternativaB = findViewById(R.id.alternativaB);
        alternativaC = findViewById(R.id.alternativaC);
        alternativaD = findViewById(R.id.alternativaD);
        alternativaE = findViewById(R.id.alternativaE);
        btnNext = findViewById(R.id.btnNext);

        int currentQuestion = intent.getIntExtra("questaoId", 0);

        JSONArray questoes;
        try
        {
            questoes = new JSONArray(intent.getStringExtra("questoes"));
            progressBar.setMax(questoes.length());
            progressBar.setProgress(currentQuestion+1);
            txtTitle.setText("Questao " + String.valueOf(currentQuestion+1) + " de " + String.valueOf(questoes.length()));
            JSONObject questao = (JSONObject) questoes.get(currentQuestion);
            txtQuestao.setText(questao.getString("enunciado"));
            alternativaA.setText("1");
            alternativaB.setText("2");
            alternativaC.setText("3");
            alternativaD.setText("4");
            alternativaE.setText("5");

            if (currentQuestion+1 == questoes.length())
            {
                btnNext.setText("Finalizar");
            }
            else
            {
                btnNext.setText("Proxima");
            }
        }
        catch (JSONException e)
        {

        }




    }
}
