package com.example.gusbru5.android_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Question extends AppCompatActivity {

    private TextView txtTitle, txtQuestao;
    private ProgressBar progressBar;
    private RadioGroup radioAlternativas;
    private RadioButton alternativaA, alternativaB, alternativaC, alternativaD;
    private Button btnNext;
    private int currentQuestion, score;
    private JSONArray questoes;
    private ArrayList<String> respostas, corretas;
    private JSONObject questao;


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
        btnNext = findViewById(R.id.btnNext);

        currentQuestion = intent.getIntExtra("questaoId", 0);
        respostas = intent.getStringArrayListExtra("respostas");
        corretas = intent.getStringArrayListExtra("corretas");
        score = intent.getIntExtra("score", 0);

        try
        {
            questoes = new JSONArray(intent.getStringExtra("questoes"));
            progressBar.setMax(questoes.length());
            progressBar.setProgress(currentQuestion+1);
            txtTitle.setText("Questao " + String.valueOf(currentQuestion+1) + " de " + String.valueOf(questoes.length()));
            questao = (JSONObject) questoes.get(currentQuestion);
            txtQuestao.setText(questao.getString("enunciado"));
            alternativaA.setText(questao.getString("A"));
            alternativaB.setText(questao.getString("B"));
            alternativaC.setText(questao.getString("C"));
            alternativaD.setText(questao.getString("D"));

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
            questoes = new JSONArray();
        }


        btnNext.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int alternativa = radioAlternativas.getCheckedRadioButtonId();
                String resposta = idToLetter(alternativa);
                String correta;
                if (resposta.isEmpty())
                {
                    Toast.makeText(getApplicationContext(),"Selecione uma Resposta",Toast.LENGTH_LONG).show();
                }
                else
                {

                    try
                    {
                        correta = questao.getString("resposta_correta");
                        respostas.add(currentQuestion, resposta);
                        corretas.add(currentQuestion, correta);

                        if (resposta.equals(correta))
                            score++;
                    }
                    catch (JSONException e)
                    {
                        Log.e("JSON", e.getMessage());
                    }



                    if (currentQuestion+1 == questoes.length())
                    {
                        // go to review activity
                        goToReview();
                        finish();
                    }
                    else
                    {
                        // go to next question
                        goToNextQuestion();
                        finish();
                    }
                }


            }
        });


    }


    private String idToLetter(int id)
    {
        if (id == alternativaA.getId())
            return "A";
        else if (id == alternativaB.getId())
            return "B";
        else if (id == alternativaC.getId())
            return "C";
        else if (id == alternativaD.getId())
            return "D";
        else
            return "";

    }

    private void goToNextQuestion()
    {
        Bundle bundle = new Bundle();
        bundle.putInt("questaoId", currentQuestion+1);
        bundle.putString("questoes", questoes.toString());
        bundle.putStringArrayList("respostas", respostas);
        bundle.putStringArrayList("corretas", corretas);
        bundle.putInt("score", score);
        Intent intent = new Intent(this, Question.class);
        intent.putExtras(bundle);
        startActivity(intent);
        finish();
    }

    private void goToReview()
    {
        Bundle bundle = new Bundle();
        bundle.putStringArrayList("respostas", respostas);
        bundle.putStringArrayList("corretas", corretas);
        bundle.putInt("score", score);
        bundle.putInt("numberOfQuestions", questoes.length());
        Intent intent = new Intent(this, Review.class);
        intent.putExtras(bundle);
        startActivity(intent);
        finish();
    }
}
