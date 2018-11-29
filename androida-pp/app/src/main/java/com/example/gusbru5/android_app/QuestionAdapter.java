package com.example.gusbru5.android_app;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class QuestionAdapter extends RecyclerView.Adapter<QuestionAdapter.QuestionViewHolder> {

    private ArrayList<String> questions;
    private ArrayList<String> correctAnswers;

    public QuestionAdapter(ArrayList<String> questions, ArrayList<String> correctAnswers) {
        this.questions = questions;
        this.correctAnswers = correctAnswers;
    }

    @NonNull
    @Override
    public QuestionViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        Context context = viewGroup.getContext();
        int layoutIdForListItem = R.layout.question_item;
        LayoutInflater inflater = LayoutInflater.from(context);
        boolean shouldAttachToParentImmediately = false;

        View view = inflater.inflate(layoutIdForListItem, viewGroup, shouldAttachToParentImmediately);

        return new QuestionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull QuestionViewHolder questionViewHolder, int i) {
        String resposta = questions.get(i);
        String correta = correctAnswers.get(i);
        if (resposta.equals(correta))
        {
            questionViewHolder.correctImage.setVisibility(View.VISIBLE);
            questionViewHolder.warningImage.setVisibility(View.GONE);
            questionViewHolder.listItemQuestion.setText(resposta + ": Parabens, correto!");
        }
        else
        {
            questionViewHolder.correctImage.setVisibility(View.GONE);
            questionViewHolder.warningImage.setVisibility(View.VISIBLE);
            questionViewHolder.listItemQuestion.setText(resposta + ": Quase... Deveria ser " + correta);
        }
    }

    @Override
    public int getItemCount() {
        return questions.size();
    }

    // View Holder
    class QuestionViewHolder extends RecyclerView.ViewHolder {
        public TextView listItemQuestion;
        public ImageView correctImage, warningImage;

        public QuestionViewHolder(View itemView)
        {
            super(itemView);

            listItemQuestion = itemView.findViewById(R.id.questionItem);
            correctImage = itemView.findViewById(R.id.imageViewCorrect);
            warningImage = itemView.findViewById(R.id.imageViewWarning);
        }

    }
}
