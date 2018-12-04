import React, { useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import { FormHelperText } from "@material-ui/core";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = {
    cardStyles :{
        width:"30%",
        backgroundColor:'#00BCD4'
    },
    button: {
        color:'#ffffff',
        backgroundColor:'#00BCD4'
    }
  };

const App = styled.div `
    background-color:#607D8B;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
`;

export default function Summary() {
    const [summary, setResult] = useState(null);
    const [query, setQuery] = useState(null);

    const data = () => {
        var url = `http://localhost:8080/getSummary?data=${query}`;
        axios.get(url)
            .then(res => {
                let data = null;
                if (res.data === "") {
                    data = "please enter a valid search term";
                }
                else {
                    data = res.data;
                }
                setResult(data);
            })
    }
    return (
        <App>
            <Button variant="contained" style={{...styles.button}} onClick={data}>get summary from wikipedia</Button>
            <Input style={{...styles.input}} onKeyPress={(e) => {
                if (e.charCode === 13) {
                    data();
                }
            }} onChange={(e) => { setQuery(e.target.value) }}></Input>
            <Card style={{...styles.cardStyles}}>
                <CardContent>
                    {summary}
                </CardContent>
            </Card>
        </App>
    )
}
