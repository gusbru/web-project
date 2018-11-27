package com.example.gusbru5.android_app;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class Settings extends AppCompatActivity {

    private EditText editTextIP, editTextPorta;
    private String ip, port;
    private SharedPreferences sharedPref;
    private SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        Toolbar toolbar = findViewById(R.id.settingsToolbar);
        setSupportActionBar(toolbar);
        ActionBar actionBar = this.getSupportActionBar();

        if (actionBar != null)
            actionBar.setDisplayHomeAsUpEnabled(true);

        editTextIP = findViewById(R.id.txtIP);
        editTextPorta = findViewById(R.id.txtPorta);

        sharedPref = this.getSharedPreferences(getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        ip = sharedPref.getString("ip", "");
        port = sharedPref.getString("port", "");

        editTextIP.setText(ip);
        editTextPorta.setText(port);

        editTextIP.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                ip = editTextIP.getText().toString();
            }

            @Override
            public void afterTextChanged(Editable s) {
                editor = sharedPref.edit();
                editor.putString("ip", ip);
                editor.apply();
            }
        });

        editTextPorta.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                port = editTextPorta.getText().toString();
            }

            @Override
            public void afterTextChanged(Editable s) {
                editor = sharedPref.edit();
                editor.putString("port", port);
                editor.apply();
            }
        });

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.homeAsUp)
            NavUtils.navigateUpFromSameTask(this);

        return super.onOptionsItemSelected(item);
    }
}
