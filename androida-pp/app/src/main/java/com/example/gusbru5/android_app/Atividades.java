package com.example.gusbru5.android_app;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


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
            textView.setText("onPreExecute");

        }

        @Override
        protected void onPostExecute(String s) {
            textView.setText("Text: " + s);
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

            }

            return questions;
        }
    }

    private String HttpGet() throws IOException, JSONException
    {
        URL url = new URL("http://177.220.13.141:3005/api/me/questoes");

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
            while ((line = br.readLine()) != null) {
                sb.append(line+"\n");
            }
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
}
