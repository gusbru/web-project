package com.example.gusbru5.android_app;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;


public class Atividades extends AppCompatActivity {

    private Toolbar toolbar;
    private Button btnAtividade1,btnAtividade2, btnAtividade3, btnAtividade4;
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_atividades);

        Intent intent = getIntent();

        toolbar = findViewById(R.id.atividadesToolbar);
        toolbar.setTitle(intent.getStringExtra("Disciplina") + ": Atividades");
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        btnAtividade1 = findViewById(R.id.buttonAtividade1);
        btnAtividade2 = findViewById(R.id.buttonAtividade2);
        btnAtividade3 = findViewById(R.id.buttonAtividade3);
        btnAtividade4 = findViewById(R.id.buttonAtividade4);

        textView = findViewById(R.id.textView3);

        btnAtividade1.setEnabled(false);
        btnAtividade3.setEnabled(false);
        btnAtividade4.setEnabled(false);

        btnAtividade2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CheckAtividades checkAtividades = new CheckAtividades();
                checkAtividades.execute();
            }
        });


    }


    private class CheckAtividades extends AsyncTask<String, Void, String>
    {
        @Override
        protected void onPreExecute() {
            textView.setText("Buscando Questoes");

        }

        @Override
        protected void onPostExecute(String s) {
            JSONObject jsonObject;
            try
            {
                jsonObject = new JSONObject(s);
                JSONArray questions = jsonObject.getJSONArray("questions");
                if (questions.length() == 0)
                {
                    btnAtividade2.setEnabled(false);
                    Toast.makeText(getApplicationContext(), "No questions :(", Toast.LENGTH_LONG).show();
                }
                else
                {
                    textView.setText("we have: " + questions.length() + " questions");
                    goToQuestions(questions, 0);
                }
            }
            catch (JSONException e)
            {
                textView.setText("Text: erro convertendo JSON");
                Log.e("JSON", e.getMessage());
            }

        }

        @Override
        protected String doInBackground(String... strings) {
            String questions = "";
            try
            {
                questions = HttpGet();
            }
            catch (Exception e)
            {
                Log.e("QUESTION", e.getMessage());
            }
            Log.v("QUESTION", questions);

            return questions;
        }
    }

    private String HttpGet() throws IOException
    {
        SharedPreferences sharedPreferences = this.getSharedPreferences(getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        String ip = sharedPreferences.getString("ip", "");
        String port = sharedPreferences.getString("port", "");
        URL url = new URL("http://" + ip + ":" + port + "/api/questoes");

        // 1. create http connection
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
//        connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        connection.setRequestProperty("Content-length", "0");
        connection.setRequestProperty("x-auth-token", retrieveToken());
        connection.setConnectTimeout(5000);
//        connection.setReadTimeout(5000);
        connection.connect();
        int status = connection.getResponseCode();

        if (status == 200)
        {
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;

            line = "{ \"questions\": ";
            sb.append(line);

            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }

            sb.append("}");

            br.close();

            return sb.toString();
        }
        else
        {
            return "";
        }

    }

    private String retrieveToken()
    {
        SharedPreferences sharedPref = this.getSharedPreferences(getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        return sharedPref.getString("token", "");
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    private void goToQuestions(JSONArray questions, int questionNumber)
    {
        Bundle bundle = new Bundle();
        bundle.putInt("questaoId", questionNumber);
        bundle.putString("questoes", questions.toString());
        ArrayList<String> respostas = new ArrayList<>(questions.length());
        bundle.putStringArrayList("respostas", respostas);
        bundle.putInt("score", 0);
        Intent intent = new Intent(this, Question.class);
        intent.putExtras(bundle);
        startActivity(intent);
        finish();
    }
}
