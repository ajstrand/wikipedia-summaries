import React, { useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import { withStyles} from '@material-ui/core/styles';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

/** 
 * TODO: clean up styles for app
 * TODO: clean up jsx
*/


const styles = (theme) => ({
    cardStyles :{
        [theme.breakpoints.down('sm')]: {
            width:"90%",
        },
          [theme.breakpoints.up('md')]: {
            width:"50%",
        },
          [theme.breakpoints.up('lg')]: {
            width:"30%",
        },
        backgroundColor: 'palevioletred',
        color:'papayawhip'
    },
    input: {
        margin:'1em',
        color:'#ffffff',
        borderBottomColor:'#ffffff'
    },
      cssUnderline: {
        '&:after': {
          borderBottomColor: '#ffffff',
        },
      },
    button: {
        [theme.breakpoints.down('sm')]: {
            width:"70%",
        },
        color:'#ffffff',
        backgroundColor:'#00BCD4'
    }
  });

  const InstP = styled.p `
    width:37%;
    color:#ffffff;
    margin: 1em;
  `;

const App = styled.div `
    background-color:#607D8B;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
`;

function Summary(props) {
    const { classes } = props;
    const [summary, setResult] = useState(null);
    const [query, setQuery] = useState(null);

    const inst = `Get a summary on a particular topic by entering a search term in the in put field below. 
    You can press enter after typing in the input box or press the "Get Summary" button to see the results.`;

    const buttonText = `Get a summary from Wikipedia.`;

    const data = () => {
        var url = `/api/getSummary?data=${query}`;
        var temp = 'http://localhost:8080' + url;
        axios.get(temp)
            .then(res => {
                let data = null;
                if (res.data === "") {
                    data = `You may have entered a term that doesn't exist on Wikipedia. 
                    Please enter a valid search term or double check that what you entered was spelled correctly.`;
                }
                else {
                    data = res.data;
                }
                setResult(data);
            })
    }
    return (
        <App>
            <InstP>{inst}</InstP>
            <Button variant="contained" classes={{root:classes.button}} onClick={data}>{buttonText}</Button>
            <Input
            classes={{
                root:classes.input,
                underline: classes.cssUnderline,
              }}
    
        onKeyPress={(e) => {
                if (e.charCode === 13) {
                    data();
                }
            }} onChange={(e) => { setQuery(e.target.value) }}></Input>
            {summary !== null ? <Card classes={{root:classes.cardStyles}}>
                <CardContent>
                    {summary}
                </CardContent>
            </Card>: null}
            
        </App>
    )
}

export default withStyles(styles)(Summary);
