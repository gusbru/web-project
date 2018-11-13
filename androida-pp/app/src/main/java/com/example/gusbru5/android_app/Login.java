package com.example.gusbru5.android_app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Login extends AppCompatActivity {

    // UI References
    private Button btnLogin;
    private TextView email;
    private TextView password;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        email = findViewById(R.id.editTextEmail);
        password = findViewById(R.id.editTextPassword);
        btnLogin = (Button) findViewById(R.id.buttonEntrar);

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
        email.setError(null);
        password.setError(null);

        if (email.getText().toString().isEmpty())
        {
            Toast.makeText(getApplicationContext(), "Insira o seu Email/Password", Toast.LENGTH_LONG).show();
            email.setError("Insira o seu Email");
            password.setText("");
            email.requestFocus();
            return;
        }

        if (password.getText().toString().isEmpty())
        {
            password.setError("Insira a senha");
            password.requestFocus();
            return;
        }

        if (!isEmailValid(email.getText().toString()))
        {
            Toast.makeText(getApplicationContext(), "Use um email válido", Toast.LENGTH_LONG).show();
            email.setError("Email inválido");
            email.requestFocus();
            return;
        }


        // tentar autenticar
        // apagar o conteudo de password na tela
        password.setText("");


    }

    private boolean isEmailValid(String email)
    {
        String regExpn =
                "^(([\\w-]+\\.)+[\\w-]+|([a-zA-Z]{1}|[\\w-]{2,}))@"
                        +"((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?"
                        +"[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\."
                        +"([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?"
                        +"[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|"
                        +"([a-zA-Z]+[\\w-]+\\.)+[a-zA-Z]{2,4})$";

        CharSequence inputStr = email;

        Pattern pattern = Pattern.compile(regExpn,Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);

        if(matcher.matches())
            return true;
        else
            return false;
    }

}
