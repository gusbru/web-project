import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import request from 'superagent';

class NewQuestion extends React.Component {

    state = {
        selectedOption: "",
        enunciado: ""
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    }

    handleEnunciadoChange = (event) => {
        this.setState({
            enunciado: event.target.value
        });
    }

    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        request
            .post('http://localhost:3005/api/questoes')
            .set({
                "x-auth-token" :localStorage.getItem("token"),
                'Content-Type':'application/json', 
                Accept: '*/*'
            })
            .send({ 
                "enunciado": this.state.enunciado,
	            "resposta_correta": this.state.selectedOption,
	            "alternativas" : ["A", "B", "C", "D"]
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        console.log('You have selected:', this.state.selectedOption, this.state.enunciado, localStorage.getItem("token"));
    }

    render() {
        return(
            <div style={{width: "100%"}}>
                <p>Nova Questao</p>
                <form onSubmit={this.handleFormSubmit} style={{width: "100%", textAlign: "left"}}>
                    <label htmlFor="questaoTitulo">Enunciado</label>
                    <input id="questaoTitulo" name="questaoTitulo" type="text" onChange={this.handleEnunciadoChange} style={{width: "100%"}} />
                    <br/>
                    <label htmlFor="alternativaA">Alternativa A</label>
                    <input id="alternativaA" name="alternativaA" type="text" style={{width: "100%"}}/>
                    <br/>
                    <label htmlFor="alternativaB">Alternativa B</label>
                    <input id="alternativaB" name="alternativaB" type="text" style={{width: "100%"}}/>
                    <br/>
                    <label htmlFor="alternativaC">Alternativa C</label>
                    <input id="alternativaC" name="alternativaC" type="text" style={{width: "100%"}}/>
                    <br/>
                    <label htmlFor="alternativaD">Alternativa D</label>
                    <input id="alternativaD" name="alternativaD" type="text" style={{width: "100%"}}/>
                    <br/>
                    <p>Alternativa Correta</p>
                    <br/>
                    <label htmlFor="A">A</label>
                    <input id="A" name="A" type="radio" value={"A"} onChange={this.handleOptionChange} checked={this.state.selectedOption === 'A'} style={{margin: "10px"}} />
                    <br/>
                    <label htmlFor="B">B</label>
                    <input id="B" name="B" type="radio" value={"B"} onChange={this.handleOptionChange} checked={this.state.selectedOption === 'B'} style={{margin: "10px"}} />
                    <br/>
                    <label htmlFor="C">C</label>
                    <input id="C" name="C" type="radio" value={"C"} onChange={this.handleOptionChange} checked={this.state.selectedOption === 'C'} style={{margin: "10px"}} />
                    <br/>
                    <label htmlFor="D">D</label>
                    <input id="D" name="D" type="radio" value={"D"} onChange={this.handleOptionChange} checked={this.state.selectedOption === 'D'} style={{margin: "10px"}} />
                    <br/>
                    <input id="submitNovaQuestao" name="submitNovaQuestao" type="submit" value="Adicionar" style={{backgroundColor: "grey", color:"white", fontSize:"20px", marginTop:"40px", width:"50%"}} />
                </form>
            </div>
        );
    }
}

export default withRouter(NewQuestion);