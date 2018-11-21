package com.example.gusbru5.android_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class SecondActivity extends AppCompatActivity {

    private String token;
    private String usuario;
    private TextView usernameTextView;
    private Toolbar toolbar;
    private Button btnDisciplina1, btnDisciplina2, btnDisciplina3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        usernameTextView = findViewById(R.id.username);

        Intent intent = getIntent();

        usuario = intent.getStringExtra("usuario");
        token = intent.getStringExtra("token");

        usernameTextView.setText("Aluno: " + usuario.toUpperCase());

        toolbar = findViewById(R.id.mainToolbar);
        toolbar.setTitle("Disciplinas");
        setSupportActionBar(toolbar);

        btnDisciplina1 = findViewById(R.id.buttonDisciplina1);
        btnDisciplina2 = findViewById(R.id.buttonDisciplina2);
        btnDisciplina3 = findViewById(R.id.buttonDisciplina3);

        btnDisciplina2.setEnabled(false);
        btnDisciplina3.setEnabled(false);
        btnDisciplina1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoAtividades("Disciplina 1");
            }
        });

    }


    private void gotoAtividades(String disciplinaName)
    {
        Bundle bundle = new Bundle();
        bundle.putString("Disciplina", disciplinaName);
        Intent intent = new Intent(this, Atividades.class);
        intent.putExtras(bundle);
        startActivity(intent);
    }


}
