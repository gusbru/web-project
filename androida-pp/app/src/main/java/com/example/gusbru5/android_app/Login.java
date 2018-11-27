package com.example.gusbru5.android_app;

import android.app.Activity;
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
import android.widget.Toast;


import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class Login extends AppCompatActivity {

    // UI References
    private Button btnLogin;
    private TextView txtEmail;
    private TextView txtPassword;
    private String urlAuth = "http://192.168.0.35:3005/api/auth";
    private String token;
    private String user;
    private String password;
    private View progressBar;
    private View mainPanel;
    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        txtEmail = findViewById(R.id.editTextEmail);
        txtPassword = findViewById(R.id.editTextPassword);
        btnLogin = findViewById(R.id.buttonEntrar);
        progressBar = findViewById(R.id.loadingPanel);
        mainPanel = findViewById(R.id.mainPanel);
        toolbar = findViewById(R.id.my_toolbar);

        setSupportActionBar(toolbar);

        txtEmail.requestFocus();


        // button listener
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });

    }

    public void login()
    {


        // Reset errors
        txtEmail.setError(null);
        txtPassword.setError(null);

        if (txtEmail.getText().toString().isEmpty())
        {
            Toast.makeText(getApplicationContext(), "Insira o seu Email/Password", Toast.LENGTH_LONG).show();
            txtEmail.setError("Insira o seu Email");
            txtPassword.setText("");
            txtEmail.requestFocus();
            return;
        }

        if (txtPassword.getText().toString().isEmpty())
        {
            txtPassword.setError("Insira a senha");
            txtPassword.requestFocus();
            return;
        }


        // tentar autenticar
        SendJsonData sendJsonData = new SendJsonData();
        sendJsonData.execute(urlAuth);


    }

    private class SendJsonData extends AsyncTask<String, Void, String>
    {

        @Override
        protected void onPreExecute() {
            Log.v("bla", "do before launch async");
            token = "";
            user = txtEmail.getText().toString();
            password = txtPassword.getText().toString();

            mainPanel.setVisibility(View.INVISIBLE);
            progressBar.setVisibility(View.VISIBLE);

            // apagar o conteudo de txtPassword na tela
            txtPassword.setText("");

        }

        @Override
        protected String doInBackground(String... urls) {
            Log.v("bla", "doing in background...");
            try
            {
                token = HttpPost(urls[0], user, password);
            }
            catch (Exception e)
            {
                Log.e("Login", e.getMessage());
            }

            return token;
        }

        @Override
        protected void onPostExecute(String s) {
            Log.v("bla", "do after async finished");
            Log.v("bla", s);
            if (!s.equals("Email ou senha inválido.") && !s.isEmpty())
                goToSecondActivity();
            else
            {
                progressBar.setVisibility(View.INVISIBLE);
                mainPanel.setVisibility(View.VISIBLE);
                Toast.makeText(getApplicationContext(), "Error", Toast.LENGTH_LONG).show();
            }

        }
    }

    private String HttpPost(String myUrl, String user, String password) throws IOException, JSONException
    {

        URL url = new URL(myUrl);


        // 1. create the HttpURLConnection
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        connection.setConnectTimeout(5000);

        // 2. build JSON object
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("login", user);
        jsonObject.accumulate("senha", password);

        // 3. add JSON content to POST request body
        OutputStream os = connection.getOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
        writer.write(jsonObject.toString());
        writer.flush();
        writer.close();
        os.close();

        // 4. make POST request to the given URL and save the token
        InputStream is = connection.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is));
        StringBuilder stringBuilder = new StringBuilder();
        String output;
        connection.connect();

        while ((output = bufferedReader.readLine()) != null)
            stringBuilder.append(output);

        Log.v("bla", stringBuilder.toString());

        bufferedReader.close();
        is.close();

//        return connection.getResponseMessage() + "";

        // 5. return the authentication msg. Token if successfully or msg error
        return stringBuilder.toString();

    }

    private void goToSecondActivity()
    {
        writeToken();

        Bundle bundle = new Bundle();
        bundle.putString("usuario", user);
        bundle.putString("token", token);

        Intent intent = new Intent(this, SecondActivity.class);
        intent.putExtras(bundle);

        startActivity(intent);
        finish();
    }

    private void writeToken()
    {
        // write shared preferences
        SharedPreferences sharedPref = this.getSharedPreferences(getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("token", token);
        editor.apply();
    }

}
